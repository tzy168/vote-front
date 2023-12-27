import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./App.css"
import { createCandidate, showAllCandidates } from "./VoteContract.js"

function CREATE_CANDIDATE() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [candidates, setCandidates] = useState([])

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidates = await showAllCandidates()
      setCandidates(candidates)
    }

    fetchCandidates()
  }, [])

  const handleCreatCandidate = async () => {
	try{
    await createCandidate(name, description)
	alert("Create candidate successfully")
	}catch(err){
		alert("Create candidate failed")
  }
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
    <div className="App-candidate">
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
	  <h2 className="title">Already exist： </h2>
<div className="candidates-list" >
  {candidates.map((candidate) => (
    <div className="candidate" key={candidate.id} style={{ backgroundColor: getRandomColor() }}>
      <p className="candidate-info">id: &nbsp;&nbsp;&nbsp;{Number(candidate.id)}</p>
	  <p className="candidate-info">name:&nbsp;&nbsp;{candidate.name}</p>
    </div>
  ))}
</div>
    </div>
  )
}

export default CREATE_CANDIDATE