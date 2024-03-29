import { ALL_AUTHORS } from "../queries"
import { useQuery } from '@apollo/client'
import BirthYear from './BirthYear'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }

  const authors = result.data ? result.data.allAuthors : [];

  return (
    <>
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <BirthYear authors = {authors}/>
    </>
  )
}

export default Authors
