import { LogoutIcon } from "@heroicons/react/solid"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import React from "react"
import useStore from "../store"
import { DropDown } from "./DropDown"

export const Navbar: React.FC = () => {
	const { isAuthenticated, updateAuthenticated } = useStore()
	const queryClient = useQueryClient()
	const signOut = () => {
		updateAuthenticated(false)
		queryClient.removeQueries(["todos"])
		queryClient.removeQueries(["notices"])
	}

	const menuList = [
		{ href: "/top", title: "TOP" },
		{ href: "/isr", title: "ISR学習ページ" },
		{ href: "/ssr", title: "SSR学習ページ" },
		{ href: "/ssg", title: "SSG学習ページ" },
		{ href: "/csr", title: "CSR学習ページ" },
	]
	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				{isAuthenticated && <DropDown dropDownList={menuList} />}
			</div>
			<div className='navbar-center'>
				<Link
					href={isAuthenticated ? "/top" : "/"}
					className='btn-ghost btn text-xl normal-case'
				>
					Nextjs練習
				</Link>
			</div>
			<div className='navbar-end'>
				{isAuthenticated && (
					<button className='btn-ghost btn-circle btn'>
						<LogoutIcon className='h-5 w-5' onClick={signOut} />
					</button>
				)}
			</div>
		</div>
	)
}
