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
} from '../fb'
import '../css/UserProfile.css'

function UserProfile() {
	const [id, setId] = useState()
	const [data, setData] = useState('')
	const [editMode, setEditMode] = useState(false)
	const [newUpload, setNewUpload] = useState()
	const [reports, setReports] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)

				// user data
				onSnapshot(doc(firestore, 'users', usr.uid), (snap) => {
					setData({ ...snap.data(), id: snap.id })
				})

				// user reports
				onSnapshot(query(collection(firestore, 'users', usr.uid, 'reports'), orderBy('time')), (snap) => {
					setReports(
						snap.docs.map((doc) => ({
							...doc.data(),
							id: doc.id
						}))
					)
				})
			} else {
				window.location.href = '/userLogin'
			}
		})
	}, [])

	// async function upload(e) {
	// 	e.preventDefault()
	// 	try {
	// 		const filename = e.target.elements.filename.value

	// 		// upload img to fb storage
	// 		const imgref = ref(storage, filename)
	// 		await uploadBytes(imgref, newUpload)

	// 		// also keep track in firestore
	// 		await addDoc(collection(firestore, 'users', id, 'reports'), {
	// 			file: filename,
	// 			url: await getDownloadURL(imgref),
	// 			time: new Date()
	// 		})

	// 		setNewUpload(null)
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }

	async function edit(e) {
		e.preventDefault()
		const { name, age, father, mother, email, phone, address, dob, gender, weight, height, blood } = e.target.elements

		try {
			await updateDoc(doc(firestore, 'users', id), {
				name: name.value,
				age: age.value,
				father: father.value,
				mother: mother.value,
				email: email.value,
				phone: phone.value,
				address: address.value,
				dob: dob.value,
				gender: gender.value,
				weight: weight.value,
				height: height.value,
				blood: blood.value
			})
			setEditMode(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<div className='navBar'>
				<div id='logoImage'></div>
				<div id='homeDiv'>
					<a id='home' className='options'>
						Home
					</a>
				</div>
				<div id='reportsDiv'>
					<a id='reports' className='options'>
						Reports
					</a>
				</div>
				<div id='medicineDiv'>
					<a id='medicine' className='options'>
						Medicine
					</a>
				</div>
				<div id='schedulerDiv'>
					<a id='scheduler' className='options'>
						Scheduler
					</a>
				</div>
				<div id='helpDiv'>
					<a id='help' className='options'>
						Help
					</a>
				</div>
				<button id='account'>
					<img src='./images/avatar.svg' id='avatar' />
				</button>
			</div>

			<div className='body'>
				<div id='profileImg'>
					<img src='./images/avatar.svg' id='Img' />
					<div id='name'>
						<h3 className='name'>
							Patient Id:
							<span className='n'>
								<p>{data.id}</p>
							</span>
						</h3>
						<br />
						<h3 className='name'>
							Hospital Name:
							<span className='n'>
								<p>hospital name</p>
							</span>
						</h3>
					</div>
				</div>
				<form onSubmit={edit}>
					{!editMode && (
						<button
							type='button'
							onClick={() => {
								setEditMode(true)
							}}
						>
							Edit
						</button>
					)}
					{editMode && (
						<>
							{' '}
							<button
								type='button'
								onClick={() => {
									setEditMode(false)
								}}
							>
								Cancel
							</button>
							<button>Submit</button>
						</>
					)}
					<div className='personalInformation'>
						<div>Name: </div>
						<h3 className='pInfo'>
							Name:
							<span className='info'>{editMode ? <input name='name' defaultValue={data.name} /> : <p>{data.name}</p>}</span>
						</h3>
						<br />
						<h3 className='pInfo'>
							Age:
							<span className='info'>{editMode ? <input name='age' defaultValue={data.age} /> : <p>{data.age}</p>}</span>
						</h3>
						<br />
						<h3 className='pInfo'>
							Father's Name:
							<span className='info'>{editMode ? <input name='father' defaultValue={data.father} /> : <p>{data.father}</p>}</span>
						</h3>
						<br />
						<h3 className='pInfo'>
							Mother's Name:
							<span className='info'>{editMode ? <input name='mother' defaultValue={data.mother} /> : <p>{data.mother}</p>}</span>
						</h3>
						<br />
						<h3 className='pInfo'>
							Email Id:
							<span className='info'>{editMode ? <input name='email' defaultValue={data.email} /> : <p>{data.email}</p>}</span>
						</h3>
						<br />
						<h3 className='pInfo'>
							Phone:
							<span className='info'>{editMode ? <input name='phone' defaultValue={data.phone} /> : <p>{data.phone}</p>}</span>
						</h3>
						<br />
						<br />
						<h3 className='pInfo'>
							Address:
							<span className='info'>{editMode ? <input name='address' defaultValue={data.address} /> : <p>{data.address}</p>}</span>
						</h3>
						<br />
					</div>
					<div className='medicalInformation'>
						<h3 className='pInfo'>
							DOB:
							<span className='info'>{editMode ? <input name='dob' defaultValue={data.dob} /> : <p>{data.dob}</p>}</span>
						</h3>
						<br />
						<h3 className='pInfo'>
							Gender:
							<span className='info'>{editMode ? <input name='gender' defaultValue={data.gender} /> : <p>{data.gender}</p>}</span>
						</h3>
						<br />
						<h3 className='pInfo'>
							Weight:
							<span className='info'>{editMode ? <input name='weight' defaultValue={data.weight} /> : <p>{data.weight}</p>}</span>
						</h3>
						<br />
						<h3 className='pInfo'>
							Height:
							<span className='info'>{editMode ? <input name='height' defaultValue={data.height} /> : <p>{data.height}</p>}</span>
						</h3>
						<br />
						<br />
						<h3 className='pInfo'>
							Blood Groop:
							<span className='info'>{editMode ? <input name='blood' defaultValue={data.blood} /> : <p>{data.blood}</p>}</span>
						</h3>
						<br />
						<br />
					</div>
				</form>
			</div>
		</>
	)
}

export default UserProfile
