import React, { useEffect, useState } from 'react'

import API from '../services/api'
import Search from '../components/search'
import md5 from 'js-md5'

import config from '../config.json'

import './styles.scss'

function Heroes() {
	const [heroes, setHeroes] = useState([])
	const defaultDesc =
		'Nenhuma descrição para esse herói. (Que tal cadastrar uma?)'
	useEffect(() => {
		const timestamp = Number(new Date())
		const hash = md5.create()
		hash.update(timestamp + config.PRIVATE_KEY + config.PUBLIC_KEY)
		try {
			async function requestApi() {
				const res = await API.get(
					`/characters?ts=${timestamp}&orderBy=name&limit=12&apikey=${
						config.PUBLIC_KEY
					}&hash=${hash.hex()}`
				)
				setHeroes(res.data.data.results)
			}
			requestApi()
		} catch (error) {
			console.log('error', error)
		}
	}, [])

	console.log(heroes)
	return (
		<main>
			<div className='container'>
				<h1>Character</h1>
				<Search />
				<div className='items'>
					{heroes.map(hero => {
						return (
							<div key={hero.id} className='item-border'>
								<div className='item'>
									<img
										src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
										alt={hero.name}
									/>
									<h2>{hero.name}</h2>
									<span>{hero.events.items[0]?.name || 'Indefinido'}</span>
									<hr className='line-name' />
									<p className='des'>
										{hero.description && hero.description.length > 60
											? `${hero.description.substring(0, 60)}...`
											: hero.description || defaultDesc}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</main>
	)
}

export default Heroes
