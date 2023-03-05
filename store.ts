import create from "zustand"
import { ModalArgs, EditedTask, ModalType } from "./types/types"

type State = {
	editedTask: EditedTask
	updateEditedTask: (payload: EditedTask) => void
	resetEditedTask: () => void
	isAuthenticated: boolean
	updateAuthenticated: (payload: boolean) => void
	isOpenModal: boolean
	setIsOpenModal: (payload: boolean) => void
	modalArgs: Omit<ModalArgs, "modalType">
	setModalMessage: (payload: Omit<ModalArgs, "modalType">) => void
	modalType: ModalType
	setModalType: (payload: ModalType) => void
	showError: (payload: ModalArgs) => void
}
const useStore = create<State>((set) => ({
	editedTask: { id: null, title: "", user_id: null },
	editedNotice: { id: "", content: "" },
	updateEditedTask: (payload) =>
		set({
			editedTask: {
				id: payload.id,
				title: payload.title,
				user_id: payload.user_id,
			},
		}),
	resetEditedTask: () =>
		set({ editedTask: { id: null, title: "", user_id: null } }),
	isAuthenticated: false,
	updateAuthenticated: (payload) => set({ isAuthenticated: payload }),
	isOpenModal: false,
	setIsOpenModal: (payload) => {
		set({ isOpenModal: payload })
	},
	modalArgs: { title: "", message: "" },
	setModalMessage: (payload) => {
		set({ modalArgs: { title: payload.title, message: payload.message } })
	},
	modalType: "info",
	setModalType: (payload) => set({ modalType: payload }),
	showError: (payload) => {
		set({ modalArgs: { title: payload.title, message: payload.message } }),
			set({ modalType: payload.modalType }),
			set({ isOpenModal: true })
	},
}))
export default useStore
