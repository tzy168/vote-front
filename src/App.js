import{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import VoteDetail from './voteDetail.js';
import './App.css';

function App() {
  const [walletAddress, setWallet] = useState("");
  useEffect(() => {
    getWalletAddress();
    addWalletListener();
},[]);

async function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
      } else {
        setWallet("");
      }
    });
  } else {
    alert("Please install MetaMask");
  }
}
const getWalletAddress = async () =>{
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWallet(accounts[0]);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  }
};

return (
  <div id="container">
    <Router>
      <Navbar onConnectWallet={getWalletAddress} address={walletAddress} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voteDetail/:id" element={<VoteDetail />} />
      </Routes>
    </Router>
  </div> 
);
}

export default App;