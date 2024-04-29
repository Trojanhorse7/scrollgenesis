import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import Project from "./views/Project";
import { ToastContainer } from "react-toastify";
import { Web3ContextProvider } from "./services/useWeb3";
import {RainbowKitProvider, connectorsForWallets, darkTheme} from "@rainbow-me/rainbowkit";
import { metaMaskWallet, walletConnectWallet  } from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const ScrollChain = {
	id: 534351,
	name: "Scroll Sepolia",
	network: "Scroll Sepolia",
	nativeCurrency: {
		decimals: 18,
		name: "ETH",
		symbol: "ETH",
	},
	rpcUrls: {
		default:
			"https://sepolia-rpc.scroll.io/",
	},
	blockExplorers: {
		default: { name: "ScrollScan", url: "https://sepolia.scrollscan.com" },
	},
	iconUrls: [
		"https://images.prismic.io/koinly-marketing/16d1deb7-e71f-48a5-9ee7-83eb0f7038e4_Gnosis+Chain+Logo.png",
	],
};

const { chains, provider } = configureChains(
	[ScrollChain],
	[
		jsonRpcProvider({
			rpc: (chain) => ({ http: chain.rpcUrls.default }),
		}),
	],
	[publicProvider()]
);

const connectors = connectorsForWallets([
	{
		groupName: "Recommended",
		wallets: [
			metaMaskWallet({ chains, shimDisconnect: true }),
			walletConnectWallet({ chains, shimDisconnect: true }),
		],
	},
]);

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const App = () => {

	return (
		<Web3ContextProvider>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider
					chains={chains}
					theme={darkTheme({
						accentColor: "#2E443B",
					})}
				>
					<div className="min-h-screen relative bg-green1">
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/projects/:id" element={<Project />} />
						</Routes>
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="dark"
						/>
					</div>
				</RainbowKitProvider>
			</WagmiConfig>
		</Web3ContextProvider>
	);
};

export default App;
