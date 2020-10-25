import React, { useState } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

const Pagination = ({ page, setPage, total }) => {
	const [pageNum, setPageNum] = useState(1)

	const next = () => {
		if (pageNum < 35) {
			setPage(page + 12)
			setPageNum(pageNum + 1)
		}
	}

	const prev = () => {
		if (pageNum > 1) {
			setPage(page - 12)
			setPageNum(pageNum - 1)
		}
	}
	return (
		<div className='pagination-box'>
			<span
				className={`left ${pageNum === 1 && 'disabled'}`}
				onClick={() => prev()}>
				<MdNavigateBefore />
			</span>
			<p>
				<span className='selected'>{pageNum}</span> de {total}
			</p>
			<span
				className={`right ${pageNum === 35 && 'disabled'}`}
				onClick={() => next()}>
				<MdNavigateNext />
			</span>
		</div>
	)
}

export default Pagination
