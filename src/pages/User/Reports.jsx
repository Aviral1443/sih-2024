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
import Navbar from './Navbar'
import './css/report.css'

function UserReports() {
	const [id, setId] = useState()
	const [newUpload, setNewUpload] = useState()
	const [reports, setReports] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)

				onSnapshot(query(collection(firestore, 'users', usr.uid, 'reports'), orderBy('date')), (snap) => {
					setReports(
						snap.docs.map((doc) => ({
							...doc.data(),
							id: doc.id
						}))
					)
				})
			} else {
				// window.location.href = '/userLogin'
			}
		})
	}, [])

	async function upload(e) {
		e.preventDefault()
		const filename = e.target.elements.filename.value
		// initialize an empty doc in reports collection
		const docRef = await addDoc(collection(firestore, 'users', id, 'reports'), {})
		// upload pdf to fb storage
		const fileRef = ref(storage, docRef.id)
		await uploadBytes(fileRef, newUpload)
		await addDoc(collection(firestore, 'users', id, 'reports'), {
			file: filename,
			url: await getDownloadURL(fileRef),
			time: new Date()
		})
		setNewUpload(null)
	}
	const handleFileChange = (e) => {
		const file = e.target.files[0] // Get the selected file
		console.log(file) // Perform any action with the file
	}
	return (
		<>
			<div className='container content'>
				<div className='row'>
					<div className='col-md-3'>
						<div className='card1'>
							<form onSubmit={upload}>
								{
									<div
										style={{
											position: 'relative',
											display: 'flex', // Use flexbox
											justifyContent: 'center', // Center horizontally
											alignItems: 'center', // Center vertically
											height: '200px', // Example height
											width: '200px', // Example width
											margin: 'auto' // Center within parent container
										}}
									>
										<input
											type='file'
											accept='image/*,.pdf'
											onChange={handleFileChange} // Handle file change
											style={{
												position: 'absolute',
												top: 0,
												left: 0,
												width: '100%',
												height: '100%',
												opacity: 0, // Make input transparent
												cursor: 'pointer', // Show pointer curso
												overflow: 'hidden'
											}}
										/>
										<img
											className='form-control card-img-top1'
											src='/images/add.svg'
											alt='Medical Report 1'
											style={{
												display: 'block',
												maxWidth: '100%',
												maxHeight: '100%'
											}}
										/>
									</div>
								}
								<div className='input-group  overflow-hidden'>
									<input id='filename' className='form-control' defaultValue={newUpload ? newUpload.name : ''} />
									<button className='btn btn-primary'>Add Reports</button>
								</div>
							</form>
						</div>
					</div>

					{reports
						? reports.map((i) => (
								<div className='col-md-3' key={i.id}>
									<div className='card1'>
										<a href={i.url} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
											<img src='/images/pdf.png' className='card-img-top' alt='Medical Report 2' />
											<div className='card-body'>
												<h5 className='card-title'>{i.file}</h5>
												<small>{i.date.toDate().toLocaleDateString('en-CA')}</small>
												View PDF
											</div>
										</a>
									</div>
								</div>
						  ))
						: 'Loading...'}
				</div>
			</div>
		</>
	)
}

export default UserReports
// <div>

//       <h2>Reports:</h2>
//       {reports
//         ? reports.map((i) => (
//             <div key={i.id}>
//               <a href={i.url} target="_blank" rel="noreferrer">
//                 <img src={i.url} height="50" alt={i.id} />
//               </a>
//               <div>
//                 <small>{i.file}</small>
//                 <br />
//                 <small>{i.time.toDate().toLocaleDateString("en-CA")}</small>
//               </div>
//               <br />
//             </div>
//           ))
//         : "Loading..."}
//     </div>
//     <form onSubmit={upload}>
//       {
//         <input
//           type="file"
//           accept="image/*,.pdf"
//           onChange={(e) => {
//             setNewUpload(e.target.files[0]);
//           }}
//         />
//       }

//       {newUpload && (
//         <div className="input-group">
//           <input
//             id="filename"
//             className="form-control"
//             defaultValue={newUpload ? newUpload.name : ""}
//           />
//           <button className="btn btn-primary">Upload</button>
//         </div>
//       )}
//     </form>
//      //html codes   {reports
//         ? reports.map((i) => (
//             <div key={i.id}>
//               <a href={i.url} target="_blank" rel="noreferrer">
//                 <img src={i.url} height="50" alt={i.id} />
//               </a>
//               <div>
//                 <small>{i.file}</small>
//                 <br />
//                 <small>{i.time.toDate().toLocaleDateString("en-CA")}</small>
//               </div>
//               <br />
//             </div>
//           ))
//         : "Loading..."}
// <div className="col-md-3">
//           <div className="card1">
//             <img
//               src="/images/pdf.png"
//               className="card-img-top"
//               alt="Medical Report 3"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Medical Report 3</h5>
//               <a href="#" className="btn btn-primary">
//                 View PDF
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="card1">
//             <img
//               src="/images/pdf.png"
//               className="card-img-top"
//               alt="Medical Report 4"
//             />
//             <div className="card-body">
//               <h5 className="card-title">Medical Report 4</h5>
//               <a href="#" className="btn btn-primary">
//                 View PDF
//               </a>
//             </div>
//           </div>
//         <//div>
// Repeat the card blocks as needed
// 	also keep track in firestore
// 	await updateDoc(doc(firestore, 'users', id, 'reports', docRef.id), {
// 		file: filename,
// 		url: await getDownloadURL(fileRef),
// 		date: new Date()
// 	})

// 	setNewUpload(null)
// }

// 	return (
// 		<>
// 			<div>
// 				<h2>Reports:</h2>
// 				{reports
// 					? reports.map((i) => (
// 							<div key={i.id}>
// 								<a href={i.url} target='_blank' rel='noreferrer'>
// 									<img src={i.url} height='50' alt={i.id} />
// 								</a>
// 								<div>
// 									<small>{i.file}</small>
// 									<br />
// 									<small>{i.date.toDate().toLocaleDateString('en-CA')}</small>
// 								</div>
// 								<br />
// 							</div>
// 					  ))
// 					: 'Loading...'}
// 			</div>
// 			<form onSubmit={upload}>
// 				{
// 					<input
// 						type='file'
// 						accept='image/*,.pdf'
// 						onChange={(e) => {
// 							setNewUpload(e.target.files[0])
// 						}}
// 					/>
// 				}

// 				{newUpload && (
// 					<div className='input-group'>
// 						<input id='filename' className='form-control' defaultValue={newUpload ? newUpload.name : ''} />
// 						<button className='btn btn-primary'>Upload</button>
// 					</div>
// 				)}
// 			</form>{' '}
// 		</>
// 	)
// }

// export default UserReports
