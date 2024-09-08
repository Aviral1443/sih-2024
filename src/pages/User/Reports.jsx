import { useEffect, useRef, useState } from 'react'
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

function UserReports({ userId }) {
	const [newUpload, setNewUpload] = useState()
	const [reports, setReports] = useState()
	const fileInputRef = useRef(null)

	useEffect(() => {
		if (userId) {
			onSnapshot(query(collection(firestore, 'users', userId, 'reports'), orderBy('date')), (snap) => {
				setReports(
					snap.docs.map((doc) => ({
						...doc.data(),
						id: doc.id
					}))
				)
			})
		}
	}, [userId])

	async function upload(e) {
		e.preventDefault()

		try {
			const filename = e.target.elements.filename.value

			// initialize an empty doc in reports collection
			const docRef = await addDoc(collection(firestore, 'users', userId, 'reports'), {})

			console.log(docRef)

			// upload pdf to fb storage
			const fileRef = ref(storage, docRef.id)
			await uploadBytes(fileRef, newUpload)

			// update the doc in firestore
			await updateDoc(doc(firestore, 'users', userId, 'reports', docRef.id), {
				file: filename,
				url: await getDownloadURL(fileRef),
				date: new Date()
			})

			setNewUpload(null)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className='container  my-4'>
				<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-3 text-center '>
					<div className='col px-3 py-4'>
						<div className='card border-info h-100 rounded-4'>
							<form onSubmit={upload}>
								{newUpload ? (
									<div className='m-3 card-body p-3'>
										<button className='border-0' style={{ backgroundColor: 'transparent' }}>
											<i className='bi bi-file-earmark-arrow-up' style={{ fontSize: '9em' }}></i>
										</button>
										<input id='filename' className='form-control' defaultValue={newUpload ? newUpload.name : ''} required />
										<button className='btn btn-primary mt-3'>Upload</button>
									</div>
								) : (
									<button
										type='button'
										className='border-0 card-body'
										style={{ backgroundColor: 'transparent' }}
										onClick={() => {
											fileInputRef.current.click()
										}}
									>
										<div className='card-body'>
											{/* <img
												src='/images/plus-circle.svg'
												className='card-img-top img-fluid pb-4'
												alt='Medical Report 2'
												style={{ width: '100%', height: 'auto' }} // Ensures image fills width while maintaining aspect ratio
											/> */}
											<i className='bi bi-plus-circle' style={{ fontSize: '8em' }}></i>
											<input
												type='file'
												accept='image/*,.pdf'
												onChange={(e) => {
													setNewUpload(e.target.files[0])
												}}
												className='d-none'
												ref={fileInputRef}
											/>
											<h5 className='cabg-white pt-4 px-0'>Add report</h5>
										</div>
									</button>
								)}
							</form>
						</div>
					</div>
					{reports?.map((i) => (
						<div className='col px-3 py-4' key={i.id}>
							<a href={i.url} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }} className='card p-5 h-100 rounded-4'>
								<div className='card-body'>
									{i.file.endsWith('.pdf') ? (
										<img src='/images/pdf.png' className='card-img-top img-fluid pb-4' alt='Medical Report 2' />
									) : (
										<img src='/images/gallery.png' className='card-img-top img-fluid pb-4' alt='Medical Report 2' />
									)}
								</div>
								<div className='card-footer bg-white pt-4 px-0'>
									<h5
										className='card-title'
										style={{
											whiteSpace: 'nowrap',
											overflowX: 'auto',
											overflowY: 'hidden',
											msOverflowStyle: 'none',
											scrollbarWidth: 'none',
											WebkitOverflowScrolling: 'touch'
										}}
									>
										{i.file}
									</h5>
									<small>{i.date.toDate().toLocaleDateString('en-CA')}</small>
								</div>
							</a>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default UserReports
