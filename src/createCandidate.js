import { useState } from "react"
import { Link } from "react-router-dom"
import "./App.css"
import { createCandidate } from "./VoteContract.js"

const CREATE_CANDIDATE = () => {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")

	const handleCreatCandidate = async () => {
		await createCandidate(name, description)
	}
	return (
		<div className="App">
			<header className="App-header">
				<h1>Create Candidate</h1>
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
				<button onClick={handleCreatCandidate}>Create Candidate</button>
				<Link to="/">
					<button>Back</button>
				</Link>
			</header>
		</div>
	)
}

export default CREATE_CANDIDATE
