import { useSelector, useDispatch } from 'react-redux';
import { selectAnecdotesSortedByVotes, updateVote } from '../reducers/anecdoteReducer'; 
import { setNotification } from "../reducers/notificationReducer"; 


const AnecdoteList = () => {
    const anecdotes = useSelector(selectAnecdotesSortedByVotes);
    const filter = useSelector(state => state.filter);
  
    let filterWord = '';
  
    if (Array.isArray(filter) && filter.length > 0) {
      const filterWords = filter.filter(Boolean); 
      filterWord = filterWords[filterWords.length - 1].toLowerCase();
    }
  
    const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content && anecdote.content.toLowerCase().includes(filterWord)
    );
    
    const dispatch = useDispatch();
  
    const vote = id => {
      const votedAnecdote = filteredAnecdotes.find(anecdote => anecdote.id === id);
      if (votedAnecdote) {
        dispatch(updateVote(id));
        dispatch(setNotification(`You voted: "${votedAnecdote.content}"`, 1000)); 
      }
    };
  
    return (
      <div>
        {filteredAnecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default AnecdoteList;
  
