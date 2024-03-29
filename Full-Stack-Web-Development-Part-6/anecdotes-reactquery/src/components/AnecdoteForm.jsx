import { createAnecdote } from '../requests'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotification } from '../NotificationContext';


const AnecdoteForm = () => {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      showNotification('too short anecdote, must have length 5 or more');
    }
  });
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 });
    showNotification(`anecdote ${content} is created`)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
