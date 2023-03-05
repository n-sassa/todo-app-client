import React, { memo, useState } from "react"
import useStore from "../store"
import { ModalType } from "../types/types"

const fontColorForModal = {
	info: "text-blue-700",
	success: "text-green-700",
	warn: "text-yellow-500",
	error: "text-red-700",
}

const Modal: React.FC = () => {
	const {
		isOpenModal,
		setIsOpenModal,
		modalArgs: modalMessage,
		modalType,
	} = useStore()
	const selectColor = (type: ModalType) => {
		return fontColorForModal[type]
	}
	const onClick = () => {
		setIsOpenModal(!isOpenModal)
	}
	return (
		<>
			<input
				type='checkbox'
				id='my-modal'
				className='modal-toggle'
				checked={isOpenModal}
				onChange={() => {}}
			/>
			<div className='modal'>
				<div className='modal-box'>
					<h3 className={`${selectColor(modalType)} text-lg font-bold`}>
						{modalMessage.title}
					</h3>
					<p className='py-4'>{modalMessage.message}</p>
					<div className='modal-action'>
						<label htmlFor='my-modal' className='btn' onClick={onClick}>
							OK
						</label>
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(Modal)
