import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import fullLogo from "../assets/FULLLOGO.png";

const Header = () => {
	return (
		<header
			className="flex justify-center items-center
        p-5 h-[5rem] bg-green-200 shadow-lg fixed top-0 left-0 right-0 py-[0.8rem] w-[100%]"
		>
			<div className="w-[80%] max-[700px]:w-[100%] flex justify-between items-center">
				<Link
					to="/"
					className="flex justify-start items-center text-xl text-black space-x-1"
				>
					<img src={fullLogo} alt="Logo" className="h-[3rem]" />
				</Link>

				<div className="flex space-x-2 justify-center">
					<ConnectButton />
				</div>
			</div>
		</header>
	);
};

export default Header;
