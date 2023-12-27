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
			const voteCount_1 = Number(voteCount)
			let voteList = []
			//console.log(typeof voteList)
			for (let i = 0; i < voteCount_1; i++) {
				const data = await getVote(i.toString())
				
				console.log(data.total)
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
	function getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
		  color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	  }
	return (
		<div>
			<h2>VoteList</h2>
			{votes.map((vote) => (
				<Link to={`/voteDetail/${vote.id}`} className="link-no-underline">
					<div key={vote.id} className="vote-item" style={{ backgroundColor: getRandomColor() }}>
						<p>{votes.id}</p>
						<p>{vote.description}</p>
						<p>
							Start Time:{" "}
							{new Date(Number(vote.startTime) * 1000).toLocaleString()}
						</p>
						<p>
							End Time: {new Date(Number(vote.endTime) * 1000).toLocaleString()}
						</p>
						<p>Total: {Number(vote.total)}</p>
					</div>
				</Link>
			))}
		</div>
	)
}

export default VoteList
