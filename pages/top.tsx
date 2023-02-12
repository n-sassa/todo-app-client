import {
	DocumentTextIcon,
	StatusOnlineIcon,
} from "@heroicons/react/solid"
import { NextPage } from "next"
import React from "react"
import { Layout } from "../components/Layout"
import NoticeForm from "../components/NoticeForm"
import { NoticeList } from "../components/NoticeList"
import { TaskForm } from "../components/TaskForm"
import { TaskList } from "../components/TaskList"

const Dashboard: NextPage = () => {
	return (
		<Layout title='Dashborad'>
			<div className='grid grid-cols-2 gap-40'>
				<div>
					<div className='my-3 flex justify-center'>
						<DocumentTextIcon className='h-8 w-8 text-blue-500' />
					</div>
					<TaskForm />
					<TaskList />
				</div>
				<div>
					<div className='my-3 flex justify-center'>
						<StatusOnlineIcon className='h-8 w-8 text-blue-500' />
					</div>
					<NoticeForm />
					<NoticeList />
				</div>
			</div>
		</Layout>
	)
}

export default Dashboard
