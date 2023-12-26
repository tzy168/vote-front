import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVote } from './VoteContract.js';
function VoteDetail() {
    const [vote, setVote] = useState(null);
    const { id } = useParams();
    //console.log(id)
    useEffect(() => {
        async function fetchVoteDetail() {
            const data = await getVote(id);
            console.log(data) // Assume getVoteDetail is a function to fetch vote detail
            setVote(data);
        }
        fetchVoteDetail();
    }, [id]);
    if (!vote) {
        return <div>Loading...</div>;
    }

  return (
    <div>
      <h2>{vote.name}</h2>
      <p>{vote.description}</p>
      <p>Start Time: {new Date(Number(vote.startTime) * 1000).toLocaleString()}</p>
      <p>End Time: {new Date(Number(vote.endTime) * 1000).toLocaleString()}</p>
      <p>Total: {vote.total}</p>
      <h3>Candidates:</h3>
      {vote.candidates.map((candidate, index) => (
        <div key={index}>
          <p>{candidate.name}</p>
          <p>{candidate.voteCount}</p>
        </div>
      ))}
    </div>
  );
}

export default VoteDetail;