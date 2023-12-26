import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import Web3 from 'web3';
import { getVoteCount, getVote } from './VoteContract.js';


function VoteList() {
  const [votes, setVotes] = useState([]);
  // 获取投票项目的数据
//   const navigate = useNavigate();
//   const handleCardClick = (tokenId) => {
//     navigate(`/voteDetail/${tokenId}`);
//   };

  useEffect(() => {
    
    async function fetchVote() {
        const voteCount=await getVoteCount();
        console.log(voteCount)
        for (let i = 0; i < voteCount; i++) {
        const data = await getVote(i.toString());
        console.log("data:",data) // Assume getVoteDetail is a function to fetch vote detail
        setVotes(data);
        }
    }
    fetchVote();
}, []);

if (!votes) {
    console.log(votes)
    return <div>Loading...</div>;
}

  return (
    <div>
        <div key={votes.id}>
          <Link to={`/voteDetail/${votes.id}`}>
            <h2>{votes.name},{votes.id}</h2>
            <p>{votes.description}</p>
          </Link>
        </div>
    </div>
  );
}

export default VoteList;