import axios from 'axios'
import Config from 'react-native-config'

export const MyAPI = axios.create({
	baseURL: Config.API_URL,
	headers: { 'Content-Type': 'application/json' },
})
