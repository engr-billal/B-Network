require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Socket
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
	console.log(socket.id + ' Connected')
})

// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))

const URI = process.env.MONGO_DB_URL

const connectDB = async () => {
	await mongoose.connect(
		URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		},
		(error) => {
			if (error) throw error
			console.log('Connected to mongoDB')
		}
	)
}

connectDB()

const port = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')))

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	})
} else {
	app.get('/', (req, res) => {
		res.send('API running')
	})
}

http.listen(port, () => {
	console.log('Server is running on port ', port)
})
