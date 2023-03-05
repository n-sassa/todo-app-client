import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import useStore from "../store"
import { ModalArgs } from "../types/types"

export const useMutateAuth = () => {
	// テストユーザをデフォルトとする
	const [name, setName] = useState("test_user_1")
	const [password, setPassword] = useState("password")
	const { updateAuthenticated, showError } = useStore()

	const reset = () => {
		setName("")
		setPassword("")
	}

	const loginMutation = useMutation(
		async () => {
			const res = await axios.post(
				"http://localhost:3000/login",
				{
					name,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			updateAuthenticated(true)
		},
		{
			onError: (err: any) => {
				const modalArgs: ModalArgs = {
					title: "エラー",
					message: err?.response?.data || "不明なエラーです",
					modalType: "error",
				}
				showError(modalArgs)
				reset()
			},
		}
	)
	const registerMutation = useMutation(
		async () => {
			const res = await axios.post(
				"http://localhost:3000/user",
				{ name, password },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
		},
		{
			onError: (err: any) => {
				const modalArgs: ModalArgs = {
					title: "エラー",
					message: err?.response?.data || "不明なエラーです",
					modalType: "error",
				}
				reset()
			},
		}
	)
	return {
		name,
		setName,
		password,
		setPassword,
		loginMutation,
		registerMutation,
	}
}
