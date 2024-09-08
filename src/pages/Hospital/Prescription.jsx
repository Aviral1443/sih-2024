import { useEffect, useState } from 'react'
import { doc, firestore, getDoc, storage, uploadBytes, ref, getDownloadURL, addDoc, collection, updateDoc } from '../../fb'
import CreatableSelect from 'react-select/creatable'
import { pdf } from '@react-pdf/renderer'
import Pdf from './Pdf'
import Navbar from './Navbar'

function Prescription() {
	const [patient, setPatient] = useState()
	const [drugList, setDrugList] = useState()
	const [addPills, setAddPills] = useState(false)
	const [pills, setPills] = useState([])

	useEffect(() => {
		;(async () => {
			const res = await fetch('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=38647')
			const json = await res.json()
			const drugs = Array.from(new Set(json.results.map((i) => i.term)))
			setDrugList(drugs)
		})()
	}, [])

	async function getPatient(e) {
		e.preventDefault()
		const { id } = e.target.elements

		const snap = await getDoc(doc(firestore, 'users', id.value))

		if (snap.exists()) {
			setPatient({ ...snap.data(), id: id.value })
		} else {
			alert('User not found')
		}

		// try {
		// 	snap = await getDoc(doc(firestore, 'users', id.value))
		// } catch (err) {
		// 	alert('Patient not found!')
		// 	console.log(err)
		// }

		// if (snap.exists()) setPatient({ ...snap.data(), id: id.value })
	}

	async function addPill(e) {
		e.preventDefault()
		const { drug, endDate, qty, unit, dosage, instruction } = e.target.elements

		const newpill = {
			drug: drug.value,
			endDate: endDate.value,
			qty: parseInt(qty.value),
			unit: unit.value,
			dosage: dosage.value,
			instruction: instruction.value ? [instruction.value] : Array.from(instruction).map((i) => i.value)
		}

		setPills((prev) => [...prev, newpill])
		setAddPills(false)
	}

	async function createPrescription() {
		// create pdf
		const blob = await pdf(<Pdf pills={pills} patient={patient} />).toBlob()
		window.open(URL.createObjectURL(blob))

		// initialize an empty doc in reports collection
		const docRef = await addDoc(collection(firestore, 'users', patient.id, 'reports'), {})

		// upload pdf to fb storage
		const fileRef = ref(storage, docRef.id)
		await uploadBytes(fileRef, blob)
		const presUrl = await getDownloadURL(fileRef)

		// add prescription pdf to reports
		await updateDoc(doc(firestore, 'users', patient.id, 'reports', docRef.id), {
			file: 'doc_name',
			url: await presUrl,
			date: new Date()
		})

		// add pills to medicines collection
		for (let i of pills) {
			await addDoc(collection(firestore, 'users', patient.id, 'medicines'), { ...i, prescription: presUrl })
		}
	}

	return (
		<>
		<div className='bg-light h-100'>
			<div className='container px-4 py-5'>
				<h2 className='pb-2 border-bottom mb-4'>Prescription</h2>

				<form onSubmit={getPatient} className='d-flex align-items-center col-5 my-4'>
					<input name='id' className='form-control me-2' placeholder='Enter patient id' required />
					<button className='btn btn-primary'>Go</button>
				</form>

				{patient && (
					<>
						<div className='my-4'>
							<div>
								<strong>Name:</strong> {patient.name}
							</div>
							<div>
								<strong>Email:</strong> {patient.email}
							</div>
							<div>
								<strong>DOB:</strong> {patient.dob}
							</div>
							<div>
								<strong>Gender:</strong> {patient.gender}
							</div>
							<div>
								<strong>Blood Group:</strong> {patient.bloodGroup}
							</div>
						</div>

						<form onSubmit={addPill}>
							<button className='btn btn-success mb-2'>
								<i className='bi bi-plus-circle me-2'></i>
								Add pill
							</button>
							{/* <button className='btn btn-danger ms-3' type='button' onClick={() => setAddPills(false)}>
									Cancel
								</button> */}

							<div className='row py-3 my-auto'>
								<div className='col me-5'>
									<input list='drugs' name='drug' placeholder='Medicine' className='form-control' />
									<datalist id='drugs'>
										{drugList.map((i) => (
											<option value={i} key={i} />
										))}
									</datalist>
								</div>
								<div className='col-3 me-5 '>
									<div className='input-group'>
										<span class='input-group-text'>End date</span>
										<input name='endDate' type='date' className='form-control' />
									</div>
								</div>
								<div className='d-flex justify-content-between col-4 my-auto'>
									<div className='form-check'>
										<input className='form-check-input' type='radio' name='dosage' value='Daily' id='daily' defaultChecked />
										<label className='form-check-label' htmlFor='daily'>
											Daily
										</label>
									</div>
									<div className='form-check'>
										<input className='form-check-input' type='radio' name='dosage' value='Weekly' id='weekly' />
										<label className='form-check-label' htmlFor='weekly'>
											Weekly
										</label>
									</div>
									<div className='form-check'>
										<input className='form-check-input' type='radio' name='dosage' value='As required' id='asrequired' />
										<label className='form-check-label' htmlFor='asrequired'>
											As required
										</label>
									</div>
								</div>
							</div>

							<div className='row mb-2'>
								<div className='col-2'>
									<input name='qty' className='form-control' defaultValue={1} />
								</div>
								<div className='col-5'>
									<select name='unit' className='form-select' defaultValue='pill'>
										<option value='pill'>pill</option>
										<option value='tsp'>tsp</option>
										<option value='puff'>puff</option>
										<option value='item'>item</option>
										<option value='time'>time</option>
									</select>
								</div>
								<div className='col'>
									<CreatableSelect
										name='instruction'
										isMulti
										placeholder={'When/How'}
										options={[
											{ value: 'Morning', label: 'Morning' },
											{ value: 'Before Breakfast', label: 'Before Breakfast' },
											{ value: 'After Breakfast', label: 'After Breakfast' },
											{ value: 'Before Lunch', label: 'Before Lunch' },
											{ value: 'After Lunch', label: 'After Lunch' },
											{ value: 'Evening', label: 'Evening' },
											{ value: 'Before Dinner', label: 'Before Dinner' },
											{ value: 'After Dinner', label: 'After Dinner' },
											{ value: 'Before Bed', label: 'Before Bed' }
										]}
									/>
								</div>
							</div>
						</form>

						{pills.length > 0 && (
							<div className='addedmed mt-4'>
								<table className='table table-hover table-responsive p-5'>
									<thead>
										<tr>
											<th>Drug</th>
											<th>Dosage</th>
											<th>Qty</th>
											<th>Instructions</th>
										</tr>
									</thead>
									<tbody>
										{pills.map((i) => (
											<tr key={i.drug}>
												<td>{i.drug}</td>
												<td>{i.dosage}</td>
												<td>
													{i.qty} {i.unit}
													{parseInt(i.qty) > 1 ? 's' : ''}
												</td>
												<td>{i.instruction.join(', ')}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
						<button className='btn btn-primary  btn-lg my-4' onClick={createPrescription}>
							Done <i class='bi bi-check-lg'></i>
						</button>
					</>
				)}
			</div>
		</div>
		</>
	)
}

export default Prescription
