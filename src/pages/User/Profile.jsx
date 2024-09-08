import { useEffect, useState } from 'react'
import {
	auth,
	doc,
	firestore,
	onAuthStateChanged,
	getDoc,
	storage,
	uploadBytes,
	ref,
	getDownloadURL,
	arrayUnion,
	updateDoc,
	setDoc,
	serverTimestamp,
	addDoc,
	collection,
	getDocs,
	onSnapshot,
	query,
	orderBy
} from '../../fb'

function UserProfile({ userId }) {
	const [data, setData] = useState('')
	const [editMode, setEditMode] = useState(false)

	useEffect(() => {
		if (userId) {
			onSnapshot(doc(firestore, 'users', userId), (snap) => {
				setData({ ...snap.data(), id: snap.id })
			})
		}
	}, [userId])

	async function edit(e) {
		e.preventDefault()

		const { phone, address, dob, allergy, gender, blood, father, mother, occupation, marital, chronic, height, weight, bp, heart } = e.target.elements

		try {
			await updateDoc(doc(firestore, 'users', userId), {
				phone: phone.value,
				address: address.value,
				dob: dob.value,
				allergy: allergy.value,
				gender: gender.value,
				blood: blood.value,
				father: father.value,
				mother: mother.value,
				occupation: occupation.value,
				marital: marital.value,
				chronic: chronic.value,
				height: height.value,
				weight: weight.value,
				bp: bp.value,
				heart: heart.value
			})

			setEditMode(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<div className='bg-light'>
				<div className='container px-4 py-5'>
					<form onSubmit={edit}>
						<div className='d-flex flex-row-reverse'>
							{editMode ? (
								<>
									<button
										className=' btn btn-danger'
										type='button'
										onClick={() => {
											setEditMode(false)
										}}
									>
										Cancel
									</button>
									<button className='btn btn-primary me-2'>Done</button>
								</>
							) : (
								<button
									type='button'
									className='btn btn-success'
									onClick={() => {
										setEditMode(true)
									}}
								>
									<i className='bi bi-pencil-square'></i> Edit
								</button>
							)}
						</div>
						<div className='row g-5 py-5 gap-4'>
							{/* <div className=''> */}
							<div className='col bg-white rounded-4 p-5 card mt-3'>
								<div className='text-center'>
									<img src='/images/avatar.svg' className='img-fluid' alt='...' />
									<h1 className='mt-3 mb-0'>{data.name}</h1>
									<small style={{ fontSize: '0.7em' }}>{data.id}</small>
								</div>
								<div className='mt-3 mx-auto'>
									<div className='d-flex align-items-center my-1'>
										<i className='bi bi-envelope me-2 '></i>
										{data.email}
									</div>
									<div className='d-flex align-items-center my-1'>
										<i className='bi bi-telephone me-2 '></i>
										{editMode ? <input name='phone' defaultValue={data.phone} className='form-control' /> : data.phone}
									</div>
									<div className='d-flex align-items-center my-1'>
										<i className='bi bi-house me-2 '></i>
										{editMode ? <input name='address' defaultValue={data.address} className='form-control' /> : data.address}
									</div>
								</div>
							</div>
							<div className='col-8 bg-white rounded-4 p-5 card justify-content-center mt-3'>
								<div className='row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4'>
									<div className='col'>
										<p className='text-muted mb-2'>DOB</p>
										{editMode ? (
											<input className='form-control' name='dob' defaultValue={data.dob} type='date' />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.dob}</h4>
										)}
									</div>

									<div className='col'>
										<p className='text-muted mb-2'>Blood Group</p>
										{editMode ? (
											<input className='form-control' name='blood' defaultValue={data.blood} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.blood}</h4>
										)}
									</div>
									<div className='col'>
										<p className='text-muted mb-2'>Father's Name</p>
										{editMode ? (
											<input className='form-control' name='father' defaultValue={data.father} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.father}</h4>
										)}
									</div>
									<div className='col'>
										<p className='text-muted mb-2'>Mother's Name</p>
										{editMode ? (
											<input className='form-control' name='mother' defaultValue={data.mother} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.mother}</h4>
										)}
									</div>
									<div className='col'>
										<p className='text-muted mb-2'>Occuptation</p>
										{editMode ? (
											<input className='form-control' name='occupation' defaultValue={data.occupation} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.occupation}</h4>
										)}
									</div>
									<div className='col'>
										<p className='text-muted mb-2'>Marital status</p>
										{editMode ? (
											<input className='form-control' name='marital' defaultValue={data.marital} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.marital}</h4>
										)}
									</div>
								</div>
								<div className='row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mt-2'>
									<div className='col'>
										<p className='text-muted mb-2'>Chronic conditions</p>
										{editMode ? (
											<input className='form-control' name='chronic' defaultValue={data.chronic} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.chronic}</h4>
										)}
									</div>
									<div className='col'>
										<p className='text-muted mb-2'>Allergy</p>
										{editMode ? (
											<input className='form-control' name='allergy' defaultValue={data.allergy} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.allergy}</h4>
										)}
									</div>
									<div className='col'>
										<p className='text-muted mb-2'>Gender</p>
										{editMode ? (
											<input className='form-control' name='gender' defaultValue={data.gender} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.gender}</h4>
										)}
									</div>
									<div className='col'>
										{' '}
										<p className='text-muted mb-2'>Height</p>
										{editMode ? (
											<input className='form-control' name='height' defaultValue={data.height} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.height}</h4>
										)}
									</div>
									<div className='col'>
										<p className='text-muted mb-2'>Weight</p>
										{editMode ? (
											<input className='form-control' name='weight' defaultValue={data.weight} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.weight}</h4>
										)}
									</div>
									<div className='col'>
										<p className='text-muted mb-2'>Blood pressure</p>
										{editMode ? (
											<input className='form-control' name='bp' defaultValue={data.bp} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.bp}</h4>
										)}
									</div>
									<div className='col'>
										<p className='text-muted mb-2'>Heart Rate</p>
										{editMode ? (
											<input className='form-control' name='heart' defaultValue={data.heart} />
										) : (
											<h4 className='fw-semibold text-body-emphasis'>{data.heart}</h4>
										)}
									</div>
								</div>
							</div>
							{/* </div> */}
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default UserProfile
