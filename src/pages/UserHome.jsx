import '../css/UserHome.css'
import Navbar from './Navbar'

function UserHome() {
	return (
		<div>
			<Navbar/>
			<div style={{ padding: '40px', alignItems: 'center' }} className='container'>
				<p style={{ marginBottom: '0px', textAlign: 'left', fontSize: '23px', width: '100%', fontFamily: 'Nunito, sans-serif', fontWeight: '700' }}>
					<i>
						Our Web-Application is your all-in-one solution for managing health records,
						<br />
						medications, and schedules. It ensures that medical information is always organized,
						<br /> accessible, and secure.
						<br />
						<br /> Whether you're tracking personal health or managing patient care,
						<br /> our platform simplifies the process, helping you stay informed and on top of your health with ease.
					</i>
				</p>
			</div>
			<div className='container my-4'>
				<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5'>
					<div className='col'>
						<div className='card h-100 custom-rounded-card'>
							<img src='./images/Records.svg' className='card-img-top' alt='Card Image 1' />
							<div className='card-body overflow-hidden'>
								<p className='card-text' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '21px' }}>
									Securely store and
									<br />
									access all your medical documents in one place
								</p>
							</div>
							<hr style={{ color: '#083b6e', height: '10%', width: '100%' }} />
							<div className='c-footer overflow-hidden' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '35px' }}>
								<a href='#' style={{ textDecoration: 'none' }}>
									<p style={{ color: 'darkblue' }}>
										Reports <img style={{ width: '45px', height: '45px', margin: '0px' }} src='./images/double_arrow.svg' alt='arrow' />
									</p>
								</a>
							</div>
						</div>
					</div>
					<div className='col'>
						<div className='card h-100 custom-rounded-card'>
							<img src='./images/medicine_Bottle_code.svg' className='card-img-top' alt='Card Image 2' />
							<div className='card-body'>
								<p className='card-text' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '20px' }}>
									Track and manage
									<br />
									your medications effortlessly
								</p>
							</div>
							<hr style={{ color: '#343a40', height: '2px', width: '100%' }} />

							<div className="c-footer" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '35px' }}>
								<a href="/pres" style={{ textDecoration: 'none' }}>

									<p style={{ color: 'darkblue' }}>
										Medicines <img style={{ width: '45px', height: '45px', margin: '0px' }} src='./images/double_arrow.svg' alt='arrow' />
									</p>
								</a>
							</div>
						</div>
					</div>
					<div className='col'>
						<div className='card h-100 custom-rounded-card'>
							<img src='./images/stopwatch.svg' className='card-img-top' alt='Card Image 3' />
							<div className='card-body'>
								<p className='card-text' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '20px' }}>
									Stay on schedules with timely reminders for your medications
								</p>
							</div>
							<hr style={{ color: '#343a40', height: '2px', width: '100%' }} />
							<div className='c-footer' style={{ fontFamily: 'Nunito, sans-serif', fontWeight: '700', fontSize: '35px' }}>
								<a href='#' style={{ textDecoration: 'none' }}>
									<p style={{ color: 'darkblue' }}>
										Scheduler <img style={{ width: '45px', height: '45px', margin: '0px' }} src='./images/double_arrow.svg' alt='arrow' />
									</p>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default UserHome
