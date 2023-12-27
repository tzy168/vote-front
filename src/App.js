import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar.js"
import Home from "./Home.js"
import VoteDetail from "./voteDetail.js"
import CREATE_VOTE from "./createVote.js"
import CREATE_CANDIDATE from "./createCandidate.js"
import { isRegistered, Sign_up } from "./VoteContract.js"
import MY_INFO from "./myinfo.js"
import "./App.css"

function App() {
	const [walletAddress, setWallet] = useState("")
	useEffect(() => {
		getWalletAddress()
		addWalletListener()
	}, [])

	async function addWalletListener() {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", (accounts) => {
				if (accounts.length > 0) {
					setWallet(accounts[0])
				} else {
					setWallet("")
				}
			})
		} else {
			alert("Please install MetaMask")
		}
		if (await isRegistered()) {
		} else {
			console.log("Sign_up")
			await Sign_up()
		}
	}
	const getWalletAddress = async () => {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				})
				setWallet(accounts[0])
			} catch (error) {
				console.error("Error connecting to wallet:", error)
			}
		}
	}

	return (
		<div id="container">
			<Router>
				<Navbar
					connectWallet={getWalletAddress}
					walletAddress={walletAddress}
				/>
				<Routes>
					<Route path="/" address={walletAddress} element={<Home />} />
					<Route path="/myinfo" element={<MY_INFO />} />
					<Route path="/voteDetail/:id" element={<VoteDetail />} />
					<Route path="/creatVote" element={<CREATE_VOTE />} />
					<Route path="/createCandidate" element={<CREATE_CANDIDATE />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
