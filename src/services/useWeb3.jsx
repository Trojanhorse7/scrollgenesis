import React, { createContext, useContext } from "react";
import abi from "../abis/src/contracts/scrollgenesis.sol/ScrollGenesis.json";
import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";
import { getAccount, fetchSigner, getContract, getProvider } from "@wagmi/core";

const Web3Context = createContext({});

export const Web3ContextProvider = ({ children }) => {
	//Getting the Connected Address and saving in State
	const account = getAccount();
	const connectedAddress = account.address;
	setGlobalState("connectedAccount", connectedAddress?.toLowerCase());
	const contractAddress = "0xA8C1bD140c79d2691F81De4288dEB6f96df035D9";
	const contractAbi = abi.abi;

	const getEthereumContractProvider = async () => {
		const provider = getProvider();

		const contract = getContract({
			address: contractAddress,
			abi: contractAbi,
			signerOrProvider: provider,
		});

		setGlobalState("contract", contract);

		return contract;
	};
	const getEthereumContract = async () => {
		const signer = await fetchSigner();;

		const contract = getContract({
			address: contractAddress,
			abi: contractAbi,
			signerOrProvider: signer,
		});

		setGlobalState("contract", contract);

		return contract;
	};

	const createProject = async ({
		title,
		description,
		imageURL,
		cost,
		expiresAt,
	}) => {
		try {
			const contract = await getEthereumContract();
			setGlobalState("contract", contract);
			cost = ethers.utils.parseEther(cost);

			const tx = await contract.createProject(
				title,
				description,
				imageURL,
				cost,
				expiresAt
			);
			await tx.wait().then(async () => {
				await loadProjects();
			});
		} catch (error) {
			reportError(error);
		}
	};

	const updateProject = async ({
		id,
		title,
		description,
		imageURL,
		expiresAt,
	}) => {
		try {
			const contract = await getEthereumContract();
			tx = await contract.updateProject(
				id,
				title,
				description,
				imageURL,
				expiresAt
			);
			await tx.wait();
			await loadProject(id);
		} catch (error) {
			reportError(error);
		}
	};

	const deleteProject = async (id) => {
		try {
			const contract = await getEthereumContract();
			await contract.deleteProject(id);
		} catch (error) {
			reportError(error);
		}
	};

	const structuredBackers = (backers) =>
		backers
			.map((backer) => ({
				owner: backer.owner.toLowerCase(),
				refunded: backer.refunded,
				timestamp: new Date(backer.timestamp.toNumber() * 1000).toJSON(),
				contribution: parseInt(backer.contribution._hex) / 10 ** 18,
			}))
			.reverse();

	const structuredProjects = (projects) =>
		projects
			.map((project) => ({
				id: project.id.toNumber(),
				owner: project.owner.toLowerCase(),
				title: project.title,
				description: project.description,
				timestamp: new Date(project.timestamp.toNumber()).getTime(),
				expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
				date: toDate(project.expiresAt.toNumber() * 1000),
				imageURL: project.imageURL,
				raised: parseInt(project.raised._hex) / 10 ** 18,
				cost: parseInt(project.cost._hex) / 10 ** 18,
				backers: project.backers.toNumber(),
				status: project.status,
			}))
			.reverse();

	const loadProjects = async () => {
		try {
			const contract = await getEthereumContractProvider();
			const projects = await contract.getProjects();
			const stats = await contract.stats();

			setGlobalState("stats", structureStats(stats));
			setGlobalState("projects", structuredProjects(projects));
		} catch (error) {
			reportError(error);
		}
	};

	const loadProject = async (id) => {
		try {
			const contract = await getEthereumContractProvider();
			const project = await contract.getProject(id);

			setGlobalState("project", structuredProjects([project])[0]);
		} catch (error) {
			alert(JSON.stringify(error.message));
			reportError(error);
		}
	};

	const backProject = async (id, amount) => {
		try {
			const connectedAccount = getGlobalState("connectedAccount");
			const contract = await getEthereumContract();
			amount = ethers.utils.parseEther(amount);

			tx = await contract.backProject(id, {
				from: connectedAccount,
				value: amount._hex,
			});

			await tx.wait();
			await getBackers(id);
		} catch (error) {
			reportError(error);
		}
	};

	const getBackers = async (id) => {
		try {
			const contract = await getEthereumContract();
			let backers = await contract.getBackers(id);

			setGlobalState("backers", structuredBackers(backers));
		} catch (error) {
			reportError(error);
		}
	};

	const payoutProject = async (id) => {
		try {
			const connectedAccount = getGlobalState("connectedAccount");
			const contract = await getEthereumContract();

			tx = await contract.payOutProject(id, {
				from: connectedAccount,
			});

			await tx.wait();
			await getBackers(id);
		} catch (error) {
			reportError(error);
		}
	};

	const toDate = (timestamp) => {
		const date = new Date(timestamp);
		const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
		const mm =
			date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
		const yyyy = date.getFullYear();
		return `${yyyy}-${mm}-${dd}`;
	};

	const structureStats = (stats) => ({
		totalProjects: stats.totalProjects.toNumber(),
		totalBacking: stats.totalBacking.toNumber(),
		totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
	});

	const reportError = (error) => {
		console.log(error);
	};

	return (
		<Web3Context.Provider
			value={{
				getEthereumContract,
				createProject,
				updateProject,
				deleteProject,
				loadProjects,
				loadProject,
				backProject,
				getBackers,
				payoutProject,
				structuredBackers,
				structuredProjects,
			}}
		>
			{children}
		</Web3Context.Provider>
	);
};

export const useWeb3 = () => {
	const context = useContext(Web3Context);
	if (context == undefined) {
		throw new Error("useWeb3 must be used within Web3ContextProvider");
	}
	return context;
};
