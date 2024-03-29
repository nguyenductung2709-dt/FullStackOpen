import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'
import Select from 'react-select';

const BirthYear = ({ authors }) => {
    const authorOptions = authors.map((author) => ({ value: author.name, label: author.name }));

    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [year, setYear] = useState('');
    const [editAuthor] = useMutation(EDIT_AUTHOR);

    const submit = (event) => {
        event.preventDefault();
        if (selectedAuthor) {
            editAuthor({ variables: { name: selectedAuthor.value, setBornTo: Number(year) } });
            setSelectedAuthor(null);
            setYear('');
        }
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <Select
                    value={selectedAuthor}
                    onChange={setSelectedAuthor}
                    options={authorOptions}
                />
                <div>
                    born <input
                        value={year}
                        onChange={({ target }) => setYear(target.value)}
                    />
                </div>
                <button type='submit'>change number</button>
            </form>
        </div>
    );
}

export default BirthYear;
