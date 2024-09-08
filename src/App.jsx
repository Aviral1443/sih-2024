import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import User from './pages/User'
import Hospital from './pages/Hospital'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/user/*' element={<User />} />
				<Route path='/hospital/*' element={<Hospital />} />
				<Route path='*' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
