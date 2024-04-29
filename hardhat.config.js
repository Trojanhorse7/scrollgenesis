require('@nomiclabs/hardhat-waffle')
require('dotenv').config()
require("@nomicfoundation/hardhat-verify");

module.exports = {
	solidity: {
		version: "0.8.11",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	paths: {
		sources: "./src/contracts",
		artifacts: "./src/abis",
	},
	mocha: {
		timeout: 40000,
	},
	defaultNetwork: "scrollSepolia",
	networks: {
		hardhat: {},
		scrollSepolia: {
			url: "https://sepolia-rpc.scroll.io/",
			accounts: [process.env.DEPLOYER_KEY],
			saveDeployments: true,
		},
	},
	etherscan: {
		apiKey: {
			scrollSepolia: "4UD11KIFRDZQ36ASXCII6V8Q7NHAYWRZCS",
		},
		customChains: [
			{
				network: 'scrollSepolia',
				chainId: 534351,
				urls: {
					apiURL: 'https://api-sepolia.scrollscan.com/api',
					browserURL: 'https://sepolia.scrollscan.com/',
				},
			},
		],
	},
};