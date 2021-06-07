import { TreeDataItem } from 'ant-design-vue/lib/tree/Tree'

export function ToTree(schema: Schema): TreeDataItem {
	const treeData: TreeDataItem[] = []
	for (const project of schema.projects) {
		const services: TreeDataItem[] = []
		for (const service of project.services) {
			const apis: TreeDataItem[] = []
			for (const api of service.apis) {
				apis.push({ title: api.api, key: api.api, type: 'api', ...api })
			}
			services.push({
				title: service.name,
				key: service.name,
				children: apis,
				type: 'service',
				...service,
			})
		}
		treeData.push({
			title: project.name,
			key: project.name,
			children: services,
			type: 'project',
			...services,
		})
	}
	return treeData
}
