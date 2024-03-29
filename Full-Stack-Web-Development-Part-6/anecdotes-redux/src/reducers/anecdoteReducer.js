import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    voteAction: (state, action) => {
      const id = action.payload;
      const anecdoteToVote = state.find(anecdote => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const selectAnecdotesSortedByVotes = (state) => {
  return [...state.anecdotes.slice().sort((a, b) => b.votes - a.votes)];
};

export const { voteAction, createAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdotes = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const updateVote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const anecdoteToVote = anecdotes.find((anecdote) => anecdote.id === id);
    const updatedVotes = anecdoteToVote.votes + 1; 
    await anecdoteService.updateVote(id, updatedVotes, anecdoteToVote.content); 
    dispatch(voteAction(id)); 
  };
};

