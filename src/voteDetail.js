import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getVote, addCandidateToVote, fvote ,removeVote,cancelVote} from "./VoteContract.js"
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

	const handleremoveVote = async () => {
		try {
			await removeVote(vote.id)
			alert("Cancel vote successfully")
		} catch (err) {
			alert("Cancel vote failed")
		}
	}
	const handleCancelVote = async () => {
		try {
			await cancelVote(vote.id)
			alert("Cancel vote successfully")
		} catch (err) {
			alert("Cancel vote failed")
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
			<p>Total: {Number(vote.total)}</p>
			<button className="vote-cancel-button" onClick={handleremoveVote}>删除</button>
			<h3>Candidates:</h3>
			{vote.candidates.map((candidate, index) => (
				<div key={index} className="vote-detail-item">
					<p>id: {Number(candidate.id)}</p>
					<p>name:{candidate.name}</p>
					<p>description:{candidate.description}</p>
					<p>candidate_total: {Number(candidate._total)}</p>
					<div>
					<button onClick={() => handleVote(Number(candidate.id))}>Vote</button>
					<button className="cancel-button" onClick={handleCancelVote}>CancelVote</button>
					</div>
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
