import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'
import { refreshToken } from './redux/actions/authAction'

import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import Home from './pages/home'
import Login from './pages/login'
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'
import Register from './pages/register'
import StatusModal from './components/StatusModal'

// import io from 'socket.io-client'

function App() {
	const { auth, status, modal } = useSelector((state) => state)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(refreshToken())
		// const socket = io()
	}, [dispatch])

	useEffect(() => {
		if (auth.token) {
			dispatch(getPosts(auth.token))
			dispatch(getSuggestions(auth.token))
		}
	}, [dispatch, auth.token])

	return (
		<Router>
			<Alert />
			<input id="theme" type="checkbox" />
			<div className={`App ${(status || modal) && 'mode'}`}>
				<div className="main">
					{auth.token && <Header />}
					{status && <StatusModal />}
					<Route exact path="/" component={auth.token ? Home : Login} />
					<Route exact path="/register" component={Register} />

					<div className="wrap_page">
						<PrivateRouter exact path="/:page" component={PageRender} />
						<PrivateRouter exact path="/:page/:id" component={PageRender} />
					</div>
				</div>
			</div>
		</Router>
	)
}

export default App
