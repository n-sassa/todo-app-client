import { DocumentTextIcon, StatusOnlineIcon } from "@heroicons/react/solid"
import { NextPage } from "next"
import React from "react"
import { Layout } from "../components/Layout"
import { TaskForm } from "../components/TaskForm"
import { TaskList } from "../components/TaskList"

const Dashboard: NextPage = () => {
	return (
		<Layout title='Dashborad'>
			<div className='grid grid-cols-1 gap-40'>
				<div>
					<div className='my-3 flex justify-center'>
						<DocumentTextIcon className='h-8 w-8 text-blue-500' />
					</div>
					<TaskForm />
					<TaskList />
				</div>
			</div>
		</Layout>
	)
}

export default Dashboard
