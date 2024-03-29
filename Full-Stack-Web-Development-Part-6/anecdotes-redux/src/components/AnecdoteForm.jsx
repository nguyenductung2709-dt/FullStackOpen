import { createAnecdotes } from "../reducers/anecdoteReducer"; 
import { setNotification} from "../reducers/notificationReducer"; 
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async(event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdotes(content))
    dispatch(setNotification(`you created anecdote ${content}`, 1000)) 
  }

  return(
  <> 
  <h2>create new</h2>
  <form onSubmit = {addAnecdote}>
    <div><input name = "anecdote"/></div>
    <button type = "submit">create</button>
  </form>
  </>
)
}

export default AnecdoteForm