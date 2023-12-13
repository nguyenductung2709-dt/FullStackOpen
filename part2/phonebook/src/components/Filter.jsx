import React from 'react';

const Filter = ({ newText, handleNewText}) => {
return (
<div>filter shown with <input
value = {newText}
onChange = {handleNewText}
/> </div>
)
}

export default Filter