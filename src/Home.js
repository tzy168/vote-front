import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./App.css"
import { getVoteCount, getVote } from "./VoteContract.js"

function VoteList() {
	const [votes, setVotes] = useState([])
	// 获取投票项目的数据
	//   const navigate = useNavigate();
	//   const handleCardClick = (tokenId) => {
	//     navigate(`/voteDetail/${tokenId}`);
	//   };
	useEffect(() => {
		async function fetchVote() {
			const voteCount = await getVoteCount()
			let voteList = []
			//console.log(typeof voteList)
			for (let i = 0; i < voteCount; i++) {
				const data = await getVote(i.toString())
				voteList.push(data)
			}

			setVotes(voteList)
		}
		fetchVote()
	}, [])

	if (!votes) {
		console.log(votes)
		return <div>Loading...</div>
	}

	return (
		<div>
			<h2>VoteList</h2>
			{votes.map((vote, index) => (
				<Link to={`/voteDetail/${vote.id}`} className="link-no-underline">
					<div key={index} className="vote-item">
						<p>{votes.id}</p>
						<p>{vote.description}</p>
						<p>
							Start Time:{" "}
							{new Date(Number(vote.startTime) * 1000).toLocaleString()}
						</p>
						<p>
							End Time: {new Date(Number(vote.endTime) * 1000).toLocaleString()}
						</p>
						<p>Total: {vote.total}</p>
					</div>
				</Link>
			))}
		</div>
	)
}

export default VoteList
