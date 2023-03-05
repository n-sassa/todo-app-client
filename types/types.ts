export type Task = {
	id: number | null
	created_at: string
	title: string
	user_id: number | null
}

export type EditedTask = Omit<Task, "created_at">

export type ModalType = "info" | "success" | "warn" | "error"
export type ModalArgs = { title: string; message: string; modalType: ModalType }
