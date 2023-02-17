import create from "zustand"
import { ModalArgs, EditedNotice, EditedTask, ModalType } from "./types/types"

type State = {
	editedTask: EditedTask
	editedNotice: EditedNotice
	updateEditedTask: (payload: EditedTask) => void
	updateEditedNotice: (payload: EditedNotice) => void
	resetEditedTask: () => void
	resetEditedNotice: () => void
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
	editedTask: { id: "", title: "" },
	editedNotice: { id: "", content: "" },
	updateEditedTask: (payload) =>
		set({
			editedTask: {
				id: payload.id,
				title: payload.title,
			},
		}),
	resetEditedTask: () => set({ editedTask: { id: "", title: "" } }),
	updateEditedNotice: (payload) =>
		set({
			editedNotice: {
				id: payload.id,
				content: payload.content,
			},
		}),
	resetEditedNotice: () => set({ editedNotice: { id: "", content: "" } }),
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
