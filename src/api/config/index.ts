import axios from 'axios'
import Config from 'react-native-config'

export const NubbleApi = axios.create({
	baseURL: Config.API_URL,
	headers: {
		'Content-Type': 'application/json',
		//TODO: CRIAR INTERCEPTOR PARA TOKEN AUTH
		Authorization:
			'Bearer MQ.qOIN11XE6EKqaNwDqQi_ZFeuNYddbf5R7JLK_QLW820aLnXzoYO4HzjR62QP',
	},
})
