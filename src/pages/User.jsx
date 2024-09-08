import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { onAuthStateChanged, auth } from '../fb'
import Navbar from './User/Navbar'
import Home from './User/Home'
import Login from './User/Login'
import Profile from './User/Profile'
import Reports from './User/Reports'
import Medicine from './User/Medicine'
import Appointment from './User/Appointment'

function User() {
	const [id, setId] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)
			} else {
				setId()
			}
		})
	}, [])

	return (
		<>
			<Navbar userId={id} />
			<Routes>
				<Route path='login' element={<Login userId={id} />} />
				<Route path='profile' element={<Profile userId={id} />} />
				<Route path='appointment' element={<Appointment userId={id} />} />
				<Route path='reports' element={<Reports userId={id} />} />
				<Route path='medicine' element={<Medicine userId={id} />} />
				<Route path='*' element={<Home userId={id} />} />
			</Routes>
		</>
	)
}

export default User
