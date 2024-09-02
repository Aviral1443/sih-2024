import { useEffect, useState } from 'react'
import { doc, firestore, getDoc, storage, uploadBytes, ref, getDownloadURL, addDoc, collection } from '../fb'
import CreatableSelect from 'react-select/creatable'
import { pdf } from '@react-pdf/renderer'
import Pdf from './Pdf'

import '../css/Prescription.css'
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

		try {
			const snap = await getDoc(doc(firestore, 'users', id.value))
			setPatient({ ...snap.data(), id: id.value })
		} catch (err) {
			alert('Patient not found!')
			console.log(err)
		}
	}

	async function addPill(e) {
		e.preventDefault()
		const { drug, qty, unit, dosage, instruction } = e.target.elements

		const newpill = {
			drug: drug.value,
			qty: parseInt(qty.value),
			unit: unit.value,
			dosage: dosage.value,
			instruction: instruction.value ? [instruction.value] : Array.from(instruction).map((i) => i.value)
		}

		setPills((prev) => [...prev, newpill])
		setAddPills(false)
	}

	async function createPrescription() {
		const blob = await pdf(<Pdf pills={pills} patient={patient} />).toBlob()
		window.open(URL.createObjectURL(blob))

		const time = new Date()
		const fileName = 'doc_name_' + time.getTime()

		// to firebase storage
		const fileRef = ref(storage, fileName)
		await uploadBytes(fileRef, blob)
		const fileUrl = await getDownloadURL(fileRef)

		// to firestore
		const prescriptionRef = await addDoc(collection(firestore, 'users', patient.id, 'prescriptions'), {
			pills,
			date: time,
			url: fileUrl,
			doctor: 'doc_name'
		})

		for (let i of pills) {
			await addDoc(collection(firestore, 'users', patient.id, 'prescriptions', prescriptionRef.id, 'pills'), i)
		}
	}

	return (
		<div>
			<Navbar />
			<div className='mainBody m-4'>
				<form onSubmit={getPatient} className='d-flex align-items-center'>
					<input name='id' className='form-control me-2' placeholder='Enter patient id' required />
					<button className='btn btn-primary'>Go</button>
				</form>

				{patient && (
					<div className='mt-4'>
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
				)}

				<br />

				{!addPills && (
					<div className='addMed'>
						{/* <img src="plus.svg" id="plusSvg" /> */}
						<button className='btn btn-success' onClick={() => setAddPills(true)}>
							Add Pill
						</button>
					</div>
				)}

				{addPills && (
					<form onSubmit={addPill}>
						<button className='btn btn-primary'>
							<i className='bi bi-plus-circle me-2'></i>
							Add
						</button>
						<button className='btn btn-danger ms-3' type='button' onClick={() => setAddPills(false)}>
							Cancel
						</button>
						<br />
						<br />
						<input list='drugs' name='drug' placeholder='Medicine' className='form-control' />
						<datalist id='drugs'>
							{drugList.map((i) => (
								<option value={i} key={i} />
							))}
						</datalist>
						<br />
						<div className='d-flex justify-content-between'>
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
						<br />
						<div className='row'>
							Dosage
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
							<div className='col overflow-hidden'>
								<CreatableSelect
								    className='overflow-auto'
									name='instruction'
									isMulti
									placeholder={'When/How'}
									options={[
										{ value: 'Daily', label: 'Daily' },
										{ value: 'Before meal', label: 'Before meal' },
										{ value: 'After meal', label: 'After meal' },
										{ value: 'Before breakfast', label: 'Before breakfast' },
										{ value: 'After breakfast', label: 'After breakfast' },
										{ value: 'Before lunch', label: 'Before lunch' },
										{ value: 'After lunch', label: 'After lunch' },
										{ value: 'Before dinner', label: 'Before dinner' },
										{ value: 'After dinner', label: 'After dinner' },
										{ value: 'Before bed', label: 'Before sleep' }
									]}
								/>
							</div>
						</div>
					</form>
				)}

				<div className='addedmed mt-4'>
					<table className='table table-striped table-responsive'>
						<thead>
							<tr>
								<th>Drug</th>
								<th>Dosage</th>
								<th>Quantity & Unit</th>
								<th>Instruction</th>
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
				<button className='btn btn-success' onClick={createPrescription}>
					OK
				</button>
			</div>
		</div>
	)
}

export default Prescription
