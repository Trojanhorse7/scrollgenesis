import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useWeb3 } from "../services/useWeb3";
import { useGlobalState, setGlobalState } from "../store";
import { getAccount } from "@wagmi/core";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const BackProject = ({ project }) => {
	const [backModal] = useGlobalState("backModal");
	const [amount, setAmount] = useState("");
	const { backProject } = useWeb3();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		const userAccount = getAccount();
		if (userAccount.isDisconnected) {
			toast.info("Connect your Wallet");
			navigate("/");
		} else {
			e.preventDefault();
			if (!amount) return;

			setLoading(true);
			await backProject(project?.id, amount);
			setLoading(false);

			toast.success("Project backed, will reflect if User doesn't Reject");
			setGlobalState("backModal", "scale-0");
		}
	};

	return (
		<div
			className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${backModal}`}
		>
			<div
				className="bg-green-200 shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
			>
				<form onSubmit={handleSubmit} className="flex flex-col">
					<div className="flex justify-between items-center">
						<p className="font-semibold">{project?.title}</p>
						<button
							onClick={() => setGlobalState("backModal", "scale-0")}
							type="button"
							className="border-0 bg-transparent focus:outline-none"
						>
							<FaTimes />
						</button>
					</div>

					<div className="flex justify-center items-center mt-5">
						<div className="rounded-xl overflow-hidden h-20 w-20">
							<img
								src={
									project?.imageURL ||
									"https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg"
								}
								alt={project?.title}
								className="h-full w-full object-cover cursor-pointer"
							/>
						</div>
					</div>

					<div
						className="flex justify-between items-center
          bg-white rounded-xl mt-5"
					>
						<input
							className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
							type="number"
							step={0.01}
							min={0.01}
							name="amount"
							placeholder="Amount (ETH)"
							onChange={(e) => setAmount(e.target.value)}
							value={amount}
							required
						/>
					</div>

					<button
						type="submit"
						className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-md leading-tight
            rounded-full shadow-md hover:bg-green-700 mt-5"
					>
						{loading ? (
							<BeatLoader
								color={"rgb(187,247,208)"}
								loading={loading}
								size={13}
								speedMultiplier={2}
							/>
						) : (
							<p>Back Project</p>
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default BackProject;
