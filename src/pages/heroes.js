import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import API from '../services/api'
import md5 from 'js-md5'

import config from '../config.json'

import Search from '../components/search'
import Sort from '../components/sort'
import Pagination from '../components/pagination'

import './styles.scss'

function Heroes() {
	const [heroes, setHeroes] = useState([])
	const [changed, setChanged] = useState(false)
	const [page, setPage] = useState(0)
	const [searchTerm, setSearchTerm] = useState(null)

	const total = '35'
	useEffect(() => {
		const timestamp = Number(new Date())
		const hash = md5.create()
		hash.update(timestamp + config.PRIVATE_KEY + config.PUBLIC_KEY)
		try {
			async function requestApi() {
				const res = await API.get(
					`/characters?ts=${timestamp}&orderBy=-modified&offset=${page}&limit=12&apikey=${
						config.PUBLIC_KEY
					}&hash=${hash.hex()}`
				)
				setHeroes(res.data.data.results)
			}
			requestApi()
		} catch (error) {
			console.log('error', error)
		}
	}, [changed, page])

	heroes.sort((a, b) =>
		a.name > b.name ? (!changed ? 1 : -1) : !changed ? -1 : 1
	)

	const resultHeroes = heroes.filter(item => {
		return Object.keys(item).some(
			key => item[key].toString().toLowerCase().search(searchTerm) !== -1
		)
	})

	const heroesFilter = !searchTerm ? heroes : resultHeroes

	return (
		<main>
			<div className='container'>
				<h1>Character</h1>
				<div className='components-search'>
					<Search setSearchTerm={setSearchTerm} />
					<Sort changed={changed} setChanged={setChanged} />
				</div>
				<div className='items'>
					{heroesFilter.map(hero => {
						return (
							<Link to={`hero/${hero.id}`}>
								<div key={hero.id} className='item-border'>
									<div className='item'>
										<img
											src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
											alt={hero.name}
										/>
										<h2>{hero.name}</h2>
										<span>{hero.events.items[0]?.name}</span>
										<hr className='line-name' />
										<p className='des'>
											{hero.description.length > 60
												? `${hero.description.substring(0, 60)}...`
												: hero.description}
										</p>
									</div>
								</div>
							</Link>
						)
					})}
				</div>
				<Pagination page={page} setPage={setPage} total={total} />
			</div>
		</main>
	)
}

export default Heroes
