import React from 'react'

const Search = ({ setSearchTerm }) => {
	return (
		<div className='search-box'>
			<form>
				<input
					type='text'
					placeholder='Characters'
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</form>
		</div>
	)
}

export default Search
