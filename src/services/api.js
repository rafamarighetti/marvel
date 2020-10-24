import axios from 'axios'

const API = axios.create({
	baseURL: 'https://gateway.marvel.com/v1/public/'
})

export default API
