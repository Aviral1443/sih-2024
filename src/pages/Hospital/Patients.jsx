import { useEffect, useRef, useState } from 'react'
import { doc, firestore, getDoc, collection, setDoc, onSnapshot, orderBy, query } from '../../fb'
import Navbar from './Navbar'

function Patients({ hospitalId }) {
	const [newPatient, setNewPatient] = useState()
	const [patients, setPatients] = useState()
	const [selectedId, setSelectedId] = useState()
	const [selectedPatient, setSelectedPatient] = useState()

	const formRef = useRef(null)

	useEffect(() => {
		if (hospitalId) {
			onSnapshot(query(collection(firestore, 'hospitals', hospitalId, 'patients'), orderBy('admit date')), (snap) => {
				setPatients(
					snap.docs.map((doc) => ({
						...doc.data(),
						id: doc.id
					}))
				)
			})
		}
	}, [hospitalId])

	useEffect(() => {
		if (selectedId) {
			onSnapshot(doc(firestore, 'users', selectedId), (snap) => {
				setSelectedPatient(snap.data())
			})
		}
	}, [selectedId])

	async function getNewPatient(e) {
		e.preventDefault()
		const { id } = e.target.elements

		try {
			const snap = await getDoc(doc(firestore, 'users', id.value))
			setNewPatient({ ...snap.data(), id: id.value })
			// also add the pic
		} catch (err) {
			alert('Patient not found!')
			console.log(err)
		}
	}

	async function addNewPatient(e) {
		e.preventDefault()

		console.log(newPatient)

		try {
			await setDoc(doc(firestore, 'hospitals', hospitalId, 'patients', newPatient.id), {
				name: newPatient.name,
				'admit date': new Date()
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		document.getElementById('exampleModal').addEventListener('hidden.bs.modal', () => {
			formRef.current.reset()
			setNewPatient()
		})
	}, [])

	return (
		<>
		<div className='container mt-5 px-md-5 px-3'>
			{/* headers */}
			<div className=' row justify-content-sm-between mx-auto'>
				<div className='col-sm-auto '>
					<h1>Patients</h1>
				</div>
				<div className='col-sm-auto text-md-start row mx-md-0 mx-auto'>
					<div className='col-sm-auto px-0 me-sm-2 mb-2 mb-sm-0 '>
						<button className='btn btn-primary col-12 col-sm-auto' data-bs-toggle='modal' data-bs-target='#exampleModal'>
							<i className='bi bi-plus-circle me-sm-2'></i>
							Add patient
						</button>
					</div>
					<div className='col-sm-auto px-0'>
						<div className='input-group col-12 col-sm-auto'>
							<span className='input-group-text ' id='basic-addon1' style={{ backgroundColor: 'transparent' }}>
								<i className='bi bi-search'></i>
							</span>
							<input className='form-control border-start-0' type='search' placeholder='Search patients' />
						</div>
					</div>
				</div>
			</div>

			{/* modal */}
			<div className='modal fade' id='exampleModal' tabIndex='-1'>
				<div className='modal-dialog '>
					<div className='modal-content'>
						<div className='modal-header'>
							<div className='input-group m-3  ps-2 ms-2'>
								<form onSubmit={getNewPatient} className='mx-auto' ref={formRef}>
									<div className='input-group '>
										<input type='text' className='form-control' name='id' placeholder='Enter patient id to search' required />
										<button className='btn btn-danger' id='basic-addon1'>
											<i className='bi bi-search'></i>
										</button>
									</div>
								</form>
							</div>
						</div>
						{newPatient && (
							<div className='modal-body mx-5 my-3'>
								<div>
									<div>Name: {newPatient.name}</div>
									<div>Email: {newPatient.email}</div>
									<div>Phone: {newPatient.phone}</div>
									<div>Blood gr: {newPatient.blood}</div>
								</div>
							</div>
						)}
						<div className='modal-footer'>
							<button type='button' className='btn btn-primary' disabled={!newPatient} onClick={addNewPatient}>
								Add
							</button>
							<button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* all patients */}
			<div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 my-3 my-lg-5'>
				{patients?.map((i) => (
					<div className='col px-3 py-2' key={i.id}>
						<div className='card h-100 rounded-4 p-4'>
							{/* <a href={i.url} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }} className='card h-100  rounded-4'> */}
							<a
								href={'/hospital/patient?id=' + i.id}
								target='_blank'
								rel='noreferrer'
								style={{ textDecoration: 'none', color: 'black' }}
								className='d-flex justify-content-evenly my-auto'
							>
								<div className='col-4 my-auto me-4 me-sm-2 me-lg-4'>
									<img src='/images/avatar.svg' className='rounded-start  img-fluid' alt='...' />
								</div>
								<div className='my-auto  mx-2'>
									<h4 className='card-title mb-0'>{i.name}</h4>
									<small className='text-body-secondary card-text' style={{ fontSize: '0.5em' }}>
										{i.id}
									</small>
									<p className='card-text'>{i.reason || 'Checkup'}</p>
								</div>
							</a>
							{/* </a> */}
						</div>
					</div>
				))}
			</div>

			{selectedPatient && (
				<>
					<p>Name: {selectedPatient.name}</p>
					<p>Email: {selectedPatient.email}</p>
				</>
			)}
		</div>
		</>
	)
}

export default Patients
