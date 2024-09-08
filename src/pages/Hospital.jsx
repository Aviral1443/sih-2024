import { auth, onAuthStateChanged } from '../fb'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Hospital/Login'
import Register from './Hospital/Register'
import Prescription from './Hospital/Prescription'
import Patient from './Hospital/Patient'
import Patients from './Hospital/Patients'
import Navbar from './Hospital/Navbar'
import Scheduler from './Hospital/Scheduler'

function User() {
	const [id, setId] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)
			} else {
			}
		})
	}, [])

	return (
		<>
			<Navbar hospitalId={id} />
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='prescription' element={<Prescription hospitalId={id} />} />
				<Route path='patients' element={<Patients hospitalId={id} />} />
				<Route path='patient' element={<Patient hospitalId={id} />} />
				<Route path='scheduler' element={<Scheduler hospitalId={id} />} />
			</Routes>
		</>
	)
}

export default User
