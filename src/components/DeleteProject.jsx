import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useWeb3 } from "../services/useWeb3";
import { useGlobalState, setGlobalState } from "../store";
import BeatLoader from "react-spinners/BeatLoader";

const DeleteProject = ({ project }) => {
	const [deleteModal] = useGlobalState("deleteModal");
	const [txStatus] = useGlobalState("txStatus");
	const navigate = useNavigate();
	const { deleteProject } = useWeb3();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		await deleteProject(project?.id);
		toast.success("Project Deleted, will reflect if User doesn't Reject");
		setGlobalState("deleteModal", "scale-0");
		setLoading(false);
		navigate("/");
	};

	return (
		<div
			className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${deleteModal}`}
		>
			<div
				className="bg-green-200 shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
			>
				<div className="flex flex-col">
					<div className="flex justify-between items-center">
						<p className="font-semibold">{project?.title}</p>
						<button
							onClick={() => setGlobalState("deleteModal", "scale-0")}
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

					<div className="flex flex-col justify-center items-center rounded-xl mt-5">
						<p>Are you sure?</p>
						<small className="text-red-400">This is irreversible!</small>
					</div>

					<button
						className="inline-block px-6 py-2.5 bg-red-600
            text-white font-medium text-md leading-tight
            rounded-full shadow-md hover:bg-red-700 mt-5"
						onClick={handleSubmit}
					>
						{loading ? (
							<BeatLoader
								color={"rgb(187,247,208)"}
								loading={loading}
								size={13}
								speedMultiplier={2}
							/>
						) : (
							<p>Delete Project</p>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteProject;
