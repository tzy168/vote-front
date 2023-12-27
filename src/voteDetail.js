import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getVote, addCandidateToVote, fvote } from "./VoteContract.js"
function VoteDetail() {
	const [vote, setVote] = useState(null)
	const [candidateId, setCandidateId] = useState(0)
	const { id } = useParams()
	//console.log(id)
	useEffect(() => {
		async function fetchVoteDetail() {
			const data = await getVote(parseInt(id)) // Assume getVoteDetail is a function to fetch vote detail
			console.log(data.candidates) // Assume getVoteDetail is a function to fetch vote detail
			setVote(data)
		}
		fetchVoteDetail()
	}, [id])
	if (!vote) {
		return <div>Loading...</div>
	}
	const handleAddCandidate = async () => {
		try {
			await addCandidateToVote(parseInt(id), candidateId)
			alert("Add candidate successfully")
		} catch (err) {
			alert("Add candidate failed")
		}
	}

	const handleVote = async (cdId) => {
		try {
			console.log("cdId:", typeof cdId)
			const voteid = parseInt(id)
			console.log("voteid:", typeof voteid)
			await fvote(voteid, cdId)
			alert("Vote successfully")
		} catch (err) {
			console.error(err.message)
			alert(err.message)
		}
	}
	return (
		<div className="vote-detail-container">
			<h2>{vote.id}</h2>
			<p>{vote.description}</p>
			<p>
				Start Time: {new Date(Number(vote.startTime) * 1000).toLocaleString()}
			</p>
			<p>End Time: {new Date(Number(vote.endTime) * 1000).toLocaleString()}</p>
			<p>Total: {vote.total}</p>
			<h3>Candidates:</h3>
			{vote.candidates.map((candidate, index) => (
				<div key={index} className="vote-detail-item">
					<p>{candidate.name}</p>
					<p>{candidate.description}</p>
					<p>{candidate._total}</p>
					<button onClick={() => handleVote(Number(candidate.id))}>Vote</button>
				</div>
			))}
			<input
				type="text"
				placeholder="candidateId"
				onChange={(e) => setCandidateId(e.target.value)}
			></input>
			<button onClick={handleAddCandidate}>Add Candidate</button>
		</div>
	)
}

export default VoteDetail
