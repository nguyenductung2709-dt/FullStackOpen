import { useState } from 'react'
import { useMutation, useSubscription, useApolloClient } from '@apollo/client';
import { ALL_BOOKS, ADD_BOOK, BOOK_ADDED } from '../queries' 


export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const client = useApolloClient(); 

  const [createBook] = useMutation(ADD_BOOK, {
    update: (cache, { data: { createBook } }) => {
      const { allBooks } = cache.readQuery({ query: ALL_BOOKS });
  
      cache.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: [...allBooks, createBook],
        },
      });
    },
  });

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const data = subscriptionData.data;
      const addedBook = data.bookAdded;
      if (data && data.bookAdded) {
        window.alert(`Book added: ${addedBook.title}`)
      }
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  });

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    createBook({ variables: { title, author, published: Number(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook