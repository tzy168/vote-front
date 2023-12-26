import { ethers } from "ethers"
import ABI from "./voteContract.json"

// const wallet = ethers.Wallet.
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
//const provider = new ethers.BrowserProvider(window.ethereum);
const provider = new ethers.JsonRpcProvider("http://localhost:8545")
const signer = await provider.getSigner()
const contract = new ethers.Contract(contractAddress, ABI, signer)

export async function createCandidate(id, name, description) {
	const response = await contract.createCandidate(id, name, description)
	await response.wait(1)
}

export async function createVote(id, name, description, endTime) {
	const response = await contract.createVote(id, name, description, endTime)
	await response.wait(1)
}

export async function addCandidateToVote(voteId, candidateId) {
	const response = await contract.addCandidateToVote(voteId, candidateId)
	await response.wait(1)
}

export async function removeVote(voteId) {
	const response = await contract.removeVote(voteId)
	await response.wait(1)
}

//
export async function vote(_id, _candidateId) {
	const tx = await contract.vote(_id, _candidateId)
	await tx.wait()
}

export async function Sign_up() {
	const tx = await contract.Sign_up()
	await tx.wait()
}

export async function getVoteCount() {
	const data = await contract.getVoteCount()
	return data
}

export async function getVote(_id) {
	const data = await contract.getVote(_id)
	return data
}

export async function cancelVote(voteId) {
	const response = await contract.cancelVote(voteId)
	await response.wait(1)
}

export async function getCandidate(candidateId) {
	const candidate = await contract.getCandidate(candidateId)
	return candidate
}

export async function getAllCandidatesOfVote(voteId) {
	const allCandidate = await contract.getAllCandidatesOfVote(voteId)
	return allCandidate
}

export async function getVoteResult(voteId) {
	const voteResult = await contract.getVoteResult(voteId)
	return voteResult
}

export async function getMyInfo() {
	const myInfo = await contract.getMyInfo()
	return myInfo
}
