import React, { useState, useEffect } from "react";
import { setGlobalState, useGlobalState } from "../store";
import { CgAddR } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { GiTwoCoins } from "react-icons/gi";

const Hero = () => {
	const [stats] = useGlobalState("stats");

	return (
		<div className="text-center bg-green1 text-white py-[7rem] px-6">
			<h1
				className=" flex flex-col gap-1 text-5xl md:text-6xl xl:text-7xl font-bold
    tracking-tight mb-5"
			>
				<span className="capitalize leading-tight">
					Empowering Crowdfunding on Scroll
				</span>
				<span className="text-green-600 py-[0.5rem]"></span>
			</h1>
			<div className="flex justify-center items-center w-[100%]">
				<p className="text-white text-lg md:text-xl xl:text-2xl max-[700px]:w-[80%] w-[60%] text-center mb-4">
					At Scroll Genesis, we are revolutionizing the crowdfunding landscape by
					harnessing the power of the Scroll ZKP protocol. Our platform offers a new
					and innovative way for projects, creators, and entrepreneurs to raise
					funds while providing a secure and decentralized environment for
					backers.
				</p>
			</div>
			<div
				className="justify-center items-center space-x-2 inline-block px-6 py-2.5 bg-green-200
        text-green1 font-large text-md leading-tight uppercase
        rounded-full shadow-md"
				onClick={() => setGlobalState("createModal", "scale-100")}
			>
				<button
					type="button"
					className="inline-block px-6 py-2.5 bg-green-200
        text-green1 font-large text-md leading-tight uppercase
        rounded-full shadow-md hover:bg-green-300"
				>
					Add Project
				</button>
				<CgAddR className="inline text-lg" />
			</div>

			<div className=" flex justify-center items-center w-[100%]">
				<div className="flex justify-center items-center mt-10 font-['Montserrat Alternates'] w-[80%] ">
					<div
						className="flex flex-col justify-center items-center
            h-20 border shadow-md w-full gap-1 bg-green-200 rounded-l-[12px]"
					>
						<MdDashboard className="inline text-[1.5rem] text-green-600" />
						<span className="text-lg max-[770px]:text-sm font-bold leading-5 text-red1">
							{stats?.totalProjects || 0} Projects
						</span>
					</div>
					<div
						className="flex flex-col justify-center items-center
            h-[5.5rem] w-full gap-1 bg-green-600 rounded-md shadow-xl shadow-green-500/50"
					>
						<HiUserGroup className="inline text-[1.5rem] text-green-200" />
						<span className="text-lg max-[770px]:text-sm font-bold leading-5 text-white">
							{stats?.totalBacking || 0} Backings
						</span>
					</div>
					<div
						className="flex flex-col justify-center items-center
            h-20 border shadow-md w-full gap-1 bg-green-200 rounded-r-[12px]"
					>
						<GiTwoCoins className="inline text-[1.5rem] text-green-600" />
						<span
							className="text-lg max-[770px]:text-sm font-bold text-green-900
            leading-5"
						>
							{stats?.totalDonations || 0} ETH Donated
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
