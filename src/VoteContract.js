import {ethers} from 'ethers';
import ABI from './voteContract.json';

// const wallet = ethers.Wallet.
const contractAddress = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788'
//const provider = new ethers.BrowserProvider(window.ethereum);
const provider = new ethers.JsonRpcProvider('http://localhost:8545');
const signer = await provider.getSigner();
const contract = new ethers.Contract(contractAddress, ABI, signer);

//
export async function vote(_id,_candidateId) {
    const tx = await contract.vote(_id,_candidateId);
    await tx.wait();
}
 
export async function Sign_up() {
    const tx = await contract.Sign_up();
    await tx.wait();
}

export async function getVoteCount(){
    const data =await contract.getVoteCount();
    return data;
}

export async function getVote(_id){
    const data = await contract.getVote(_id);
    return data;
}

