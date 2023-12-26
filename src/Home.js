import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
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
      const voteCount = await getVoteCount();
      console.log(voteCount)
      let voteList = [];
      for (let i = 0; i < voteCount; i++) {
          const data = await getVote(i.toString());
          console.log("data:",data) // Assume getVoteDetail is a function to fetch vote detail
          voteList.push(data);
      }
      setVotes(voteList);
  }
  fetchVote();
}, []);

if (!votes) {
  console.log(votes)
  return <div>Loading...</div>;
}

return (
  <div>
      {votes.map((vote, index) => (
          <div className='votelist' key={index}>
              <Link to={`/voteDetail/${vote.id}`}>
                  <h2>{vote.name},{vote.id}</h2>
                  <p>{vote.description}</p>
              </Link>
          </div>
      ))}
  </div>
);
}

export default VoteList;