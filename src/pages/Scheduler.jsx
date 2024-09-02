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

import data from '../data'

function Scheduler() {
	const [id, setId] = useState()
	const [schedule, setSchedule] = useState([])

	const [showPrescriptions, setShowPrescriptions] = useState(false)
	const [prescriptionsData, setPrescriptionsData] = useState([])
	const [selectedPrescription, setSelectedPrescription] = useState()

	const [showOtc, setShowOtc] = useState(false)

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

	async function addScheduleFromPres(e) {
		e.preventDefault()
		const elements = e.target.elements

		for (let i of elements) {
			if (i.tagName === 'INPUT' && i.value) {
				await addDoc(
					collection(firestore, 'users', id, 'schedule'),

					{ drug: i.getAttribute('data-drug'), time: i.value }
				)
			}
		}

		setSelectedPrescription()
	}

	async function addScheduleFromOtc(e) {
		e.preventDefault()
		const { drug, time } = e.target.elements

		await addDoc(
			collection(firestore, 'users', id, 'schedule'),

			{ drug: drug.value, time: time.value }
		)

		setSelectedPrescription()
	}

	// converts 24-hr time format to 12-hr
	function formatTime(t) {
		const [hr, min] = t.split(':')
		return (parseInt(hr) % 12 || 12) + ':' + min + (hr < 12 ? ' AM' : ' PM')
	}

	return (
		<>
			<h1>Scheduler</h1>
			<button
				onClick={() => {
					setShowPrescriptions(true)
					setSelectedPrescription()
					setShowOtc()
				}}
			>
				Add from prescription
			</button>
			&nbsp;
			<button
				onClick={() => {
					setShowOtc(true)
					setShowPrescriptions()
					setSelectedPrescription()
				}}
			>
				Add OTC
			</button>
			{showPrescriptions && (
				<>
					{prescriptionsData?.map((i) => (
						<div key={i.id}>
							<button
								onClick={() => {
									setSelectedPrescription(i)
									setShowPrescriptions(false)
								}}
							>
								<span>{i.doctor}</span>
								<br />
								<span>{i.date.toDate().toLocaleDateString('en-CA')}</span>
							</button>
						</div>
					))}
				</>
			)}
			{selectedPrescription && (
				<form onSubmit={addScheduleFromPres}>
					{selectedPrescription?.pills?.map((i, k) => (
						<div key={k}>
							<span>{i.drug} </span>
							<span>{i.qty} </span>
							<span>{i.unit} </span>
							<span>{i.dosage} </span>
							<br />
							{[...Array(i.qty)].map((_, j) => (
								<span key={j}>
									<input data-drug={i.drug} type='time' />
								</span>
							))}
						</div>
					))}
					<button>Submit</button>
					<button
						type='button'
						onClick={() => {
							setSelectedPrescription()
							setShowPrescriptions()
						}}
					>
						Cancel
					</button>
				</form>
			)}
			{showOtc && (
				<form onSubmit={addScheduleFromOtc}>
					<input list='drugs' name='drug' placeholder='Medicine' />
					<input type='time' name='time' />
					<datalist id='drugs'>
						{data.map((i) => (
							<option value={i} key={i} />
						))}
					</datalist>
					<br />
					<button>Submit</button>
					<button
						type='button'
						onClick={() => {
							setShowOtc()
						}}
					>
						Cancel
					</button>
				</form>
			)}
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
