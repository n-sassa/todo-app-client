import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Task } from "../types/types"

export const useQueryTasks = () => {
	const getTasks = async () => {
		const res = await axios.get("http://localhost:3000/todos")
		return res.data
	}
	return useQuery<Task[], Error>({
		queryKey: ["todos"],
		queryFn: getTasks,
		staleTime: Infinity,
	})
}
