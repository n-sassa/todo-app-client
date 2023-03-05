import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import useStore from "../store"
import { EditedTask, Task } from "../types/types"
import { supabase } from "../utils/supabase"

export const useMutateTask = () => {
	const queryClient = useQueryClient()
	const reset = useStore((state) => state.resetEditedTask)

	const createTaskMutation = useMutation(
		async (task: Omit<Task, "id" | "created_at">) => {
			const res = await axios.post("http://localhost:3000/todos", task)
			return res
		},
		{
			onSuccess: (res) => {
				const previousTodos = queryClient.getQueryData<Task[]>(["todos"])
				if (previousTodos) {
					queryClient.setQueryData(["todos"], [...previousTodos, res.data])
				}
				reset()
			},
			onError: (err: any) => {
				alert(err.message)
				reset()
			},
		}
	)
	const updateTaskMutation = useMutation(
		async (task: EditedTask) => {
			const res = await axios.put("http://localhost:3000/todos", task)
			return res
		},
		{
			onSuccess: (res, variables) => {
				const previousTodos = queryClient.getQueryData<Task[]>(["todos"])
				if (previousTodos) {
					queryClient.setQueryData(
						["todos"],
						previousTodos.map((task) =>
							task.id === variables.id ? res.data : task
						)
					)
				}
				reset()
			},
			onError: (err: any) => {
				alert(err.message)
				reset()
			},
		}
	)
	const deleteTaskMutation = useMutation(
		async (id: number | null) => {
			const res = await axios.delete(`http://localhost:3000/todos/${id}`)
			return res
		},
		{
			onSuccess: (_, variables) => {
				const previousTodos = queryClient.getQueryData<Task[]>(["todos"])
				if (previousTodos) {
					queryClient.setQueryData(
						["todos"],
						previousTodos.filter((task) => task.id !== variables)
					)
				}
				reset()
			},
			onError: (err: any) => {
				alert(err.message)
				reset()
			},
		}
	)
	return { deleteTaskMutation, createTaskMutation, updateTaskMutation }
}
