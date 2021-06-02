import { Plugin, App } from 'vue'
import { render } from './render'
import './style.css'

interface Props {
	data: any
}
const JSONTree: Plugin = (props: Props) => {
	console.log(1)
	return <div class='json-tree-container'>{render(props.data)}</div>
}

JSONTree.install = (app: App) => {
	app.component('json-tree', JSONTree)
}

export default JSONTree
