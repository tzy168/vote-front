import { useState } from "react"
import { Link } from "react-router-dom"
import "./App.css"
import { createVote ,showAllCandidates} from "./VoteContract.js"

function CREATE_VOTE() {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [endTime, setEndtime] = useState(0)

	const handleCreatVote = async () => {
		try {
			await createVote(name, description, endTime)
			alert("Create vote successfully")
		} catch (err) {
			alert("Create vote failed")
		}
	}
	return (
		<div className="App-creatVote">
			<header className="App-header">
				<h1>Create Vote</h1>
				<br />
				<br />
				<input
					type="text"
					placeholder="name"
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<br />
				<input
					type="text"
					placeholder="description"
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br />
				<br />
				<input
					type="text"
					placeholder="endTime"
					onChange={(e) => setEndtime(e.target.value)}
				/>
				<br />
				<br />
				<button onClick={handleCreatVote}>Create Vote</button>
				<Link to="/">
					<button>Back</button>
				</Link>
			</header>
		</div>
	)
}

export default CREATE_VOTE
