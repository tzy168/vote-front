// import {link} from 'react-router-dom';
import { Link } from "react-router-dom"
import "./App.css"
const Navbar = ({ walletAddress = "", connectWallet }) => {
	return (
		<nav className="navbar">
			<div className="Navbar-brand">VOTE BY ETHERS</div>
			<Link to="/" className="router">
				Home
			</Link>
			<Link to="/myinfo" className="router">
				My Info
			</Link>
			<Link to="/creatVote" className="router">
				Create Vote
			</Link>
			<Link to="/createCandidate" className="router">
				Create Candidate
			</Link>
			<div className="navber-menu">
				<button className="connect-wallet-button" onClick={connectWallet}>
					{walletAddress.length > 0 ? (
						"Connected: " +
						String(walletAddress).substring(0, 6) +
						"..." +
						String(walletAddress).substring(38)
					) : (
						<span>Connect Wallet</span>
					)}
				</button>
			</div>
		</nav>
	)
}

export default Navbar
