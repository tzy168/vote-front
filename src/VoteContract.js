import { ethers } from "ethers"
import ABI from "./voteContract.json"

// const wallet = ethers.Wallet.
const contractAddress = "0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc"

const provider = new ethers.JsonRpcProvider("http://localhost:8545")
//const provider = new ethers.BrowserProvider(window.ethereum)
let signer = await provider.getSigner()
console.log(signer)
let contract = new ethers.Contract(contractAddress, ABI, signer)

export async function createCandidate(name, description) {
	const response = await contract.createCandidate(name, description)
	await response.wait(1)
}

export async function createVote(name, description, endTime) {
	const response = await contract.createVote(name, description, endTime)
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
export async function fvote(_id, _candidateId) {
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

export async function isRegistered() {
	const isRegistered = await contract.isRregiser()
	return isRegistered
}
