import axios from 'axios'
import Config from 'react-native-config'
export * from './endPoints'

export const NubbleApi = axios.create({
	baseURL: Config.API_URL,
	headers: {
		'Content-Type': 'application/json',
		//TODO: CRIAR INTERCEPTOR PARA TOKEN AUTH
		Authorization:
			'Bearer MQ.5-OlrETTlOoc-WpsyK0WmakAThJqlv6W5puXdjQLGa_L-P1ba1t9T8dlDCC5',
	},
})
