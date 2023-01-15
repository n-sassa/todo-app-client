import { NextPage, GetStaticProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Layout } from "../components/Layout"
import { supabase } from "../utils/supabase"
import { Task, Notice } from "../types/types"

export const getStaticProps: GetStaticProps = async () => {
	console.log("getStaticProps/ssg invoked")
	const { data: tasks } = await supabase
		.from("todos")
		.select("*")
		.order("created_at", { ascending: true })
	const { data: notices } = await supabase
		.from("notices")
		.select("*")
		.order("created_at", { ascending: true })
	return { props: { tasks, notices } }
}

type StaticProps = {
	tasks: Task[]
	notices: Notice[]
}

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
	const router = useRouter()
	return (
		<Layout title='SSG'>
			<p className='mb-3 text-blue-500'>SSG</p>
			<ul className='mb-3'>
				{tasks.map((task) => {
					return (
						<li key={task.id}>
							<p className='text-lg font-extrabold'>{task.title}</p>
						</li>
					)
				})}
			</ul>
			<ul className='mb-3'>
				{notices.map((notice) => {
					return (
						<li key={notice.id}>
							<p className='text-lg font-extrabold'>{notice.content}</p>
						</li>
					)
				})}
			</ul>
			<Link href='/ssr' prefetch={false} className='mb-3 text-xs'>
				Link to ssr
			</Link>
			<Link href='/isr' prefetch={false} className='mb-3 text-xs'>
				Link to isr
			</Link>
			<button className='mb-3 text-xs' onClick={() => router.push("/ssr")}>
				Route to ssr
			</button>
			<button className='mb-3 text-xs' onClick={() => router.push("/isr")}>
				Route to isr
			</button>
		</Layout>
	)
}

export default Ssg
