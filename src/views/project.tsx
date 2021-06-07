import {
	Button,
	Modal,
	Form,
	Input,
	Tree,
	Dropdown,
	Menu,
} from 'ant-design-vue'
import {
	defineComponent,
	ref,
	UnwrapRef,
	reactive,
	toRaw,
	onMounted,
} from 'vue'
import { TreeDataItem } from 'ant-design-vue/lib/tree/Tree'
import { ToTree } from './json-to-tree'
import * as json from './project-json'

interface FormState {
	name: string
	desc: string
}

export default defineComponent({
	setup() {
		const visible = ref<boolean>(false)
		const treeData = ref<TreeDataItem>([])
		const showCreateForm = () => {
			visible.value = true
		}
		onMounted(() => {
			treeData.value = ToTree(json.default)
		})
		const hideCreateForm = () => {
			visible.value = false
		}
		const formState: UnwrapRef<FormState> = reactive({
			name: '',
			desc: '',
		})
		const labelCol = { span: 4 },
			wrapperCol = { span: 14 }
		const onSubmit = () => {
			// console.log('submit!',test.value)
			console.log('submit!', formState, toRaw(formState))
		}
		const onContextMenuClick = (treeKey: string, menuKey: string) => {
			console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`)
		}
		const expandedKeys = ref<string[]>([])

		return () => (
			<>
				<Button type="primary" onClick={showCreateForm}>
					创建项目
				</Button>
				<Modal
					visible={visible.value}
					title="创建项目"
					okText="创建"
					cancelText="取消"
					onCancel={hideCreateForm}
					onOk={onSubmit}
				>
					<Form model={formState} label-col={labelCol} wrapper-col={wrapperCol}>
						<Form.Item label="名称">
							<Input v-model={[formState.name, 'value']} />
						</Form.Item>
						<Form.Item label="描述">
							<Input v-model={[formState.desc, 'value']} />
						</Form.Item>
					</Form>
				</Modal>

				<Tree
					tree-data={treeData.value}
					v-model={[expandedKeys.value, ['expandedKeys']]}
				>
					{{
						title: (props: any) => (
							<Dropdown trigger={['contextmenu']}>
								{{
									default: () => <span>{props.title}</span>,
									overlay: () => (
										<Menu
											onClick={({ key: menuKey }: any) =>
												onContextMenuClick(props.key, menuKey)
											}
										>
											<Menu.Item key={'rename'}>重命名</Menu.Item>
											<Menu.Item key={'delete'}>删除</Menu.Item>
											{props.type === 'project' ? (
												<Menu.Item key={'add'}>新增服务</Menu.Item>
											) : null}
											{props.type === 'service' ? (
												<Menu.Item key={'add'}>新增 API</Menu.Item>
											) : null}
										</Menu>
									),
								}}
							</Dropdown>
						),
					}}
				</Tree>
			</>
		)
	},
})
