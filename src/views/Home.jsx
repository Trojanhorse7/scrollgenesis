import { useEffect, useState } from "react";
import AddButton from "../components/AddButton";
import CreateProject from "../components/CreateProject";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import { useWeb3 } from "../services/useWeb3";
import Faqs from "../components/Faqs/Faqs";

const Home = () => {
	const { loadProjects } = useWeb3();

	useEffect(async () => {
		await loadProjects();
	}, []);

	return (
		<>
			<Hero />
			<Projects />
			<CreateProject />
			<AddButton />
			<Faqs />
			<div className="flex justify-center items-center p-5 h-[3.5rem] bg-green-200 mt-2 shadow-lg py-[0.8rem] w-[100%]">
				<p>Scroll Genesis 2024</p>
			</div>
		</>
	);
};

export default Home;
