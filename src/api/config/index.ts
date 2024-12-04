import axios from 'axios'
import Config from 'react-native-config'

export const NubbleApi = axios.create({
	baseURL: Config.API_URL,
	headers: {
		'Content-Type': 'application/json',
		//TODO: CRIAR INTERCEPTOR PARA TOKEN AUTH
		Authorization:
			'Bearer MQ.g8In0qWZm508P7er42bw0v0kUJhnhSHrgHO45f1p9XWfEsGf4MoRE6bPL2My',
	},
})
