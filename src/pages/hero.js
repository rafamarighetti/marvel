import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import md5 from 'js-md5'
import config from '../config.json'
import API from '../services/api'

function Hero() {
	const { id } = useParams()
	const [hero, setHero] = useState([])
	useEffect(() => {
		const timestamp = Number(new Date())
		const hash = md5.create()
		hash.update(timestamp + config.PRIVATE_KEY + config.PUBLIC_KEY)
		try {
			async function requestApi() {
				const res = await API.get(
					`/characters/${id}?ts=${timestamp}&apikey=${
						config.PUBLIC_KEY
					}&hash=${hash.hex()}`
				)
				setHero(res.data.data.results[0])
			}
			requestApi()
		} catch (error) {
			console.log('error', error)
		}
	}, [id])
	console.log(hero)
	return (
		<main>
			<div className='container'>
				<h1>{hero.name}</h1>
				<div className='hero'>
					<img
						src={`${hero?.thumbnail?.path}.${hero.thumbnail?.extension}`}
						alt={hero.name}
					/>
					<div className='info-hero'>
						<h2>{hero?.events?.items[0]?.name}</h2>
						<p className='description'>{hero.description}</p>
						<div className='return'>
							<Link className='voltar' to='/'>
								Voltar a lista de Heróis
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Hero
