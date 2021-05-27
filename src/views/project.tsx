import { Button, Modal, Form, Input } from 'ant-design-vue'
import { defineComponent, ref, UnwrapRef, reactive, toRaw } from 'vue'
interface FormState {
	name: string
	desc: string
}

export default defineComponent({
	setup() {
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
							<Input value={formState.name} onInput={setName} />
						</Form.Item>
						<Form.Item label="描述">
							<Input.TextArea value={formState.desc} onInput={setDesc} />
						</Form.Item>
					</Form>
				</Modal>
			</>
		)
	},
})
