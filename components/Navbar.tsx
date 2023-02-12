import { LogoutIcon } from "@heroicons/react/solid"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import React from "react"
import { supabase } from "../utils/supabase"
import { DropDown } from "./DropDown"

export const Navbar: React.FC = () => {
	const queryClient = useQueryClient()
	const signOut = () => {
		supabase.auth.signOut()
		queryClient.removeQueries(["todos"])
		queryClient.removeQueries(["notices"])
	}
	const user = supabase.auth.user()

	const menuList = [
		{href: "/top", title: "TOP"},
		{href: "/isr", title: "ISR学習ページ"},
		{href: "/ssr", title: "SSR学習ページ"},
		{href: "/ssg", title: "SSG学習ページ"},
		{href: "/csr", title: "CSR学習ページ"},
	]
	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				{user && 
					<DropDown dropDownList={menuList}/>
				}
			</div>
			<div className='navbar-center'>
				<Link href={user ? "/top" : "/"} className='btn-ghost btn text-xl normal-case'>Nextjs練習</Link>
			</div>
			<div className='navbar-end'>
				{user && 
					<button className="btn btn-ghost btn-circle">
						<LogoutIcon
							className='h-5 w-5'
							onClick={signOut}
						/>
					</button>
				}
			</div>
		</div>
	)
}
