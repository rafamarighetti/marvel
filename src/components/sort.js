import React from 'react'
import FILTER from '../assets/icons/filter.svg'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'

const Sort = ({ changed, setChanged }) => {
	return (
		<div className='filter' onClick={() => setChanged(!changed)}>
			<img src={FILTER} alt='Filter' />
			<span>{!changed ? 'A-Z' : 'Z-A'}</span>
			{!changed ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
		</div>
	)
}

export default Sort
