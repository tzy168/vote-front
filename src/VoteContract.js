import {ethers} from 'ethers';
import ABI from './voteContract.json';

// const wallet = ethers.Wallet.
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const provider = new ethers.BrowserProvider(window.ethereum);
const contract = new ethers.Contract(contractAddress, ABI, provider.getSigner());

//
export async function vote(_id,_candidateId) {
    const tx = await contract.vote(_id,_candidateId);
    await tx.wait();
}
 
export async function Sign_up() {
    const tx = await contract.Sign_up();
    await tx.wait();
}

export async function getVoteCounter(){
    const data = await contract.getVoteCount();
    return data;
}
