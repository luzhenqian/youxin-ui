export const render = (data: any) => {
	console.log(typeof data)
	if (typeof data === 'string') {
		try {
			data = JSON.parse(data)
		} catch (e) {
			return <div></div>
		}
	}
	if (typeof data !== 'object' && !Array.isArray(data)) {
		return <div></div>
	}
	const els = []
	for (let key of Object.keys(data)) {
		const children = []
		if (typeof data[key] === 'object' || Array.isArray(data[key])) {
			children.push(render(data[key]))
		}
		els.push(
			<div class='json-tree-node'>
				<div class='json-tree-node'>
					<span>{key}:</span>{' '}
					<span class={getClass(data[key])}>{data[key]}</span>
				</div>
				<div class='json-tree-children'>{children}</div>
			</div>
		)
	}
	return els
}

const getClass = (value: any) => {
	switch (typeof value) {
		case 'boolean':
			return 'boolean'
		case 'string':
			return 'string'
		case 'number':
			return 'number'
	}
}
