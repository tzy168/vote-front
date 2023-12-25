const ethers = require("ethers")
const fs = require("fs")

const getContract = async () => {
	let provider = new ethers.BrowserProvider(window.ethereum)
	const singer = await provider.getSigner()
	const abi = JSON.parse(fs.readFileSync("abis/vote.json"))
	const contract = new ethers.Contract(
		"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
		abi,
		singer
	)
	return contract
}

exports.creatVote = async (voteId, name, description, endTime) => {
	const contract = await getContract()
	await contract.createVote(voteId, name, description, endTime)
}

exports.vote = async (voteId, candidateId) => {
	const contract = await getContract()
	const transactionResponse = await contract.vote(voteId, candidateId)
	await transactionResponse.wait(1)
}
exports.cancelVote = async (voteId) => {}

exports.addCandidateToVote = async (voteId, candidateId) => {
	const contract = await getContract()
	await contract.addCandidateToVote(voteId, candidateId)
}
exports.removeVote = async (voteId) => {}

exports.getCandidate = async (candidateId) => {}

exports.getAllCandidatesOfVote = async (voteId) => {}
