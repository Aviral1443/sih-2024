import { useEffect, useState } from 'react'
import { doc, firestore, getDoc, collection, setDoc, onSnapshot, orderBy, query, getDocs } from '../../fb'

function Patient({ hospitalId }) {
	const [patient, setPatient] = useState()
	const [reports, setReports] = useState()
	const [medicines, setMedicines] = useState()

	async function getPatient(id) {
		try {
			let snap = await getDoc(doc(firestore, 'users', id))
			setPatient({ ...snap.data(), id: id })

			snap = await getDocs(query(collection(firestore, 'users', id, 'reports'), orderBy('date')))
			setReports(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

			snap = await getDocs(query(collection(firestore, 'users', id, 'medicines')))
			setMedicines(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

			// snap = await getDoc(doc(firestore, 'hospitals', hospitalId, 'users', id))
			// setPatient({ ...patient, ...snap })
		} catch (err) {
			alert('Patient not found!')
			console.log(err)
		}
	}

	useEffect(() => {
		if (hospitalId) {
			const id = new URLSearchParams(window.location.search).get('id')
			getPatient(id)
		}
	}, [hospitalId])

	return (
		<div className=' bg-light '>
			{console.table(reports)}
			{console.table(medicines)}
			<div className='container px-4 py-5'>
				<h2 className='pb-2 border-bottom'>Patient details</h2>

				<div className='row g-5 py-5 gap-4 '>
					<div className='col bg-white rounded-4 p-5 card'>
						<div className=' text-center'>
							<img src='/images/avatar.svg' className='img-fluid' alt='...' />
							<h2 className='card-title mt-3 mb-0'>{patient?.name}</h2>
						</div>
						{/* <p className='text-body-secondary mb-0'>abc</p>
						 */}
					</div>

					<div className='col-9 bg-white rounded-4 p-5 card'>
						<div className='row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4'>
							{patient &&
								Object.entries(patient).map(([key, value]) => (
									<div key={key} className='col'>
										<p className='text-muted mb-2'>{key}</p>
										<h4 className='fw-semibold text-body-emphasis'>{value}</h4>
									</div>
								))}
						</div>
					</div>
				</div>
				<h2 className='pb-2 border-bottom'>Patient Current Vitals</h2>
				<div className='mb-4 d-flex flex-wrap justify-content-between'>
					{/* Card 1 */}
					<div className='card mx-2 my-2' style={{ width: '15rem' }}>
						<div className='card-body'>
							<h5 className='card-title'>Blood Pressure</h5>
							<p className='card-text h3'>
								122/80 <span className='text-muted h5'>mm/hg</span>
							</p>
							<p className='text-success'>In the normal</p>
						</div>
					</div>

					{/* Card 2 */}
					<div className='card mx-2 my-2' style={{ width: '15rem' }}>
						<div className='card-body'>
							<h5 className='card-title'>Heart Rate</h5>
							<p className='card-text h3'>
								120 <span className='text-muted h5'>BPM</span>
							</p>
							<p className='text-danger'>Above the normal</p>
						</div>
					</div>

					{/* Card 3 */}
					<div className='card mx-2 my-2' style={{ width: '15rem' }}>
						<div className='card-body'>
							<h5 className='card-title'>Glucose</h5>
							<p className='card-text h3'>
								90<span className='text-muted h5'>mg/dl</span>
							</p>
							<p className='text-success'>In the normal</p>
						</div>
					</div>

					{/* Card 4 */}
					<div className='card mx-2 my-2' style={{ width: '15rem' }}>
						<div className='card-body'>
							<h5 className='card-title'>Cholestrol</h5>
							<p className='card-text h3'>
								85<span className='text-muted h5'>mg/dl</span>
							</p>
							<p className='text-success'>In the normal</p>
						</div>
					</div>
				</div>

				<h2 className='pb-2 border-bottom'>Patient reports</h2>
				<div className='p-4 bg-white card table-responsive rounded-3'>
					<table className='table table-borderless'>
						<thead className='thead-light'>
							<tr>
								<th scope='col'>Date</th>
								<th scope='col'>Report</th>
							</tr>
						</thead>
						<tbody>
							{reports?.map((i, j) => (
								<tr id='j'>
									<td>{i.date.toDate().toLocaleDateString('en-CA')}</td>
									<td>
										<a href={i.url}>{i.file}</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Patient
