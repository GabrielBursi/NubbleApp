import { PageAPI } from '@/types/api'
import { PageApp } from '@/types/shared'

import { ToMetaPagination } from './ToMetaPagination'

export const ToPageModel = <ApiType = unknown, ModelType = unknown>(
	page: PageAPI<ApiType>,
	adapterToModel: (api: ApiType) => ModelType
): PageApp<ModelType> => {
	return {
		meta: ToMetaPagination(page.meta),
		data: page.data.map(adapterToModel),
	}
}
