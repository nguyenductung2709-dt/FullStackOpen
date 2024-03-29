import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    const filterWord = event.target.value;
    dispatch(filterChange(filterWord)); 
  };

return (
<p>
filter{' '}
<input name="filterWords" onChange={handleFilterChange} />
</p>
)
}

export default Filter