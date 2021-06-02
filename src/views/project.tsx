import {
	Button,
	Modal,
	Form,
	Input,
	Tree,
	Dropdown,
	Menu,
} from 'ant-design-vue'
import { defineComponent, ref, UnwrapRef, reactive, toRaw } from 'vue'
import * as json from './project-json'

interface FormState {
	name: string
	desc: string
}

const treeData = [
	{
		title: '0-0',
		key: '0-0',
		children: [
			{
				title: '0-0-0',
				key: '0-0-0',
				children: [
					{ title: '0-0-0-0', key: '0-0-0-0' },
					{ title: '0-0-0-1', key: '0-0-0-1' },
					{ title: '0-0-0-2', key: '0-0-0-2' },
				],
			},
			{
				title: '0-0-1',
				key: '0-0-1',
				children: [
					{ title: '0-0-1-0', key: '0-0-1-0' },
					{ title: '0-0-1-1', key: '0-0-1-1' },
					{ title: '0-0-1-2', key: '0-0-1-2' },
				],
			},
		],
	},
]

export default defineComponent({
	setup () {
		const visible = ref<boolean>(false)
		const showCreateForm = () => {
			visible.value = true
		}
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
		const setDesc = (e: InputEvent) => {
			formState.desc = (e.target as HTMLInputElement).value
		}
		const setName = (e: InputEvent) => {
			formState.name = (e.target as HTMLInputElement).value
		}

		const onContextMenuClick = (treeKey: string, menuKey: string) => {
			console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`)
		}
		const expandedKeys = ref<string[]>(['0-0-0', '0-0-1'])

		return () => (
			<>
				<Button type='primary' onClick={showCreateForm}>
					创建项目
				</Button>
				<Modal
					visible={visible.value}
					title='创建项目'
					okText='创建'
					cancelText='取消'
					onCancel={hideCreateForm}
					onOk={onSubmit}
				>
					<Form model={formState} label-col={labelCol} wrapper-col={wrapperCol}>
						<Form.Item label='名称'>
							<Input value={formState.name} onInput={setName} />
						</Form.Item>
						<Form.Item label='描述'>
							<Input.TextArea value={formState.desc} onInput={setDesc} />
						</Form.Item>
					</Form>
				</Modal>

				<Tree tree-data={treeData} expandedKeys={expandedKeys.value}>
					{{
						title: (props: any) => {
							const title = props.title
							const treeKey = props.key
							return (
								<Dropdown trigger={['contextmenu']}>
									<span>{title}</span>
									{{
										overlay: () => {
											console.log(1)
											return (
												<Menu
													onClick={({ key: menuKey }: any) =>
														onContextMenuClick(treeKey, menuKey)
													}
												>
													<Menu.Item key={'1'}>1st menu item</Menu.Item>
													<Menu.Item key={'2'}>2nd menu item</Menu.Item>
													<Menu.Item key={'3'}>3rd menu item</Menu.Item>
												</Menu>
											)
										},
									}}
								</Dropdown>
							)
						},
					}}
				</Tree>
			</>
		)
	},
})
