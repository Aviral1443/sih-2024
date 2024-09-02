import { useEffect, useState } from 'react'
import "../css/scheduler.css"
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
import Navbar from './Navbar'

function Scheduler() {
	const [id, setId] = useState()
	const [prescriptionsData, setPrescriptionsData] = useState()
	const [prescription, setPrescription] = useState()
	const [showPrescriptions, setShowPrescriptions] = useState(true)
	const [schedule, setSchedule] = useState([])
	const newSchedule = []

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)

				onSnapshot(query(collection(firestore, 'users', usr.uid, 'prescriptions'), orderBy('date')), (snap) => {
					setPrescriptionsData(
						snap.docs.map((doc) => ({
							...doc.data(),
							id: doc.id
						}))
					)
				})

				onSnapshot(query(collection(firestore, 'users', usr.uid, 'schedule'), orderBy('time')), (snap) => {
					setSchedule(
						snap.docs.map((doc) => ({
							...doc.data(),
							id: doc.id
						}))
					)
				})
			}
		})
	}, [])

	async function addSchedule(e) {
		e.preventDefault()
		const elements = e.target.elements

		for (let i of elements) {
			if (i.tagName === 'INPUT' && i.value) {
				newSchedule.push({ ...JSON.parse(i.getAttribute('data-value')), time: i.value })
			}
		}

		for (let i of newSchedule) {
			await addDoc(collection(firestore, 'users', id, 'schedule'), i)
		}
	}

	// converts 24-hr time format to 12-hr
	function formatTime(t) {
		const [hr, min] = t.split(':')
		return (parseInt(hr) % 12 || 12) + ':' + min + (hr < 12 ? ' AM' : ' PM')
	}

	return (
		<>
			<div>
				{showPrescriptions ? (
					<>
						<p>Select prescriptions:</p>
						{prescriptionsData
							? prescriptionsData.map((i) => (
									<div key={i.id}>
										<button
											onClick={() => {
												setPrescription(i)
												setShowPrescriptions(false)
											}}
										>
											<span>{i.doctor}</span>
											<br />
											<span>{i.date.toDate().toLocaleDateString('en-CA')}</span>
										</button>
									</div>
							  ))
							: 'Loading...'}
					</>
				) : (
					<button onClick={() => setShowPrescriptions(true)}>Show prescriptions</button>
				)}
			</div>

			<form onSubmit={addSchedule}>
				{prescription
					? prescription.pills.map((i, k) => (
							<div key={k}>
								<span>{i.drug} </span>
								<span>{i.qty} </span>
								<span>{i.unit} </span>
								<span>{i.dosage} </span>
								<br />
								{[...Array(i.qty)].map((_, j) => (
									<span key={j}>
										<input data-value={JSON.stringify(i)} type='time' />
									</span>
								))}
							</div>
					  ))
					: ''}
				<button>Submit</button>
			</form>

			{schedule
				? schedule.map((i) => (
						<div key={i.id}>
							<span>{i.drug} </span>
							<span>{formatTime(i.time)}</span>
						</div>
				  ))
				: 'Loading...'}
				
	<Navbar/>
    <div className="mainBody">
	
	{showPrescriptions ? (
        <ul className="list">
            <li>
                <div className="liItem">
                    <img src="stopwatch.svg" className="bellIcon"/>
                    <p className="medicineName">Medicine Name</p>
                    <p className="ammount">Ammount</p>
                    <p className="time">Time</p>
                </div>
            </li>
            <li>
                <div className="liItem">
                    <img src="bellIcon.svg" className="bellIcon"/>
                    <p className="medicineName">Medicine Name</p>
                    <p className="ammount">Ammount</p>
                    <p className="time">Time</p>
                </div>
            </li>
            <li>
                <div className="liItem">
                    <img src="bellIcon.svg" className="bellIcon"/>
                    <p className="medicineName">Medicine Name</p>
                    <p className="ammount">Ammount</p>
                    <p className="time">Time</p>
                </div>
            </li>
            <li>
                <div className="liItem">
                    <img src="bellIcon.svg" className="bellIcon"/>
                    <p className="medicineName">Medicine Name</p>
                    <p className="ammount">Ammount</p>
                    <p className="time">Time</p>
                </div>
            </li>
        </ul>
		):''}
    </div>
		</>
	)
}

export default Scheduler
