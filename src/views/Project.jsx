import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackProject from "../components/BackProject";
import DeleteProject from "../components/DeleteProject";
import ProjectBackers from "../components/ProjectBackers";
import ProjectDetails from "../components/ProjectDetails";
import UpdateProject from "../components/UpdateProject";
import { useWeb3 } from "../services/useWeb3";
import { useGlobalState } from "../store";
import Footer from "../components/Footer";
import RiseLoader from "react-spinners/RiseLoader";
import { getAccount } from "@wagmi/core";
import { toast } from "react-toastify";

const Project = () => {
	const { id } = useParams();
	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(false);
	const [connectedAccount, setConnectedAccount] = useState(getAccount());
	const [project] = useGlobalState("project");
	const [backers] = useGlobalState("backers");
	const navigate = useNavigate();

	useEffect(() => {
		if (!id) {
			navigate("/");
		}
	}, []);

	const { getBackers, loadProject, loadProjects } = useWeb3();

	function getRandomNumberBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	const duration = getRandomNumberBetween(4, 7);

	useEffect(async () => {
		if (connectedAccount.isConnected) {
			setLoading(true);
			await loadProjects();
			await loadProject(id);
			await getBackers(id);

			let timer1 = setTimeout(() => {
				setLoading(false);
			}, `${duration}00`);

			setLoaded(true);

			return () => {
				clearTimeout(timer1);
			};
		} else if (connectedAccount.isDisconnected) {
			toast.info("Connect your Wallet");
			navigate("/");
		}
	}, [connectedAccount.isDisconnected]);

	return loading ? (
		<div className="flex w-[100vw] h-[100vh] justify-center items-center">
			<RiseLoader
				color={"rgb(187,247,208)"}
				loading={loading}
				size={40}
				speedMultiplier={2}
			/>
		</div>
	) : loaded ? (
		<div>
			<ProjectDetails project={project} connected={connectedAccount} />
			<UpdateProject project={project} />
			<DeleteProject project={project} />
			<BackProject project={project} />
			<ProjectBackers backers={backers} />
			<Footer />
		</div>
	) : null;
};

export default Project;
