import Link from 'next/link'
import React from 'react'

type DropDownList = {
  href: string
  title: string
} 

type Props = {
  dropDownList: DropDownList[]
}

export const DropDown: React.FC<Props> = ({dropDownList}) => {
  return (
    <div className='dropdown'>
    <label tabIndex={0} className='btn-ghost btn-circle btn'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M4 6h16M4 12h16M4 18h7'
        />
      </svg>
    </label>
    <ul
      tabIndex={0}
      className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow'
    >
      {dropDownList.map((dropDown) => (
        <li>
          <Link href={dropDown.href}>{dropDown.title}</Link>
        </li>
      ))}
    </ul>
  </div>
  )
}
