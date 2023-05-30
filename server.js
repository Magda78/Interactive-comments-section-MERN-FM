require('dotenv').config({ path: '.env.local' });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//const usersRoute = require('./routes/users-route');
const commentsRoute = require('./routes/comments-route');

const app = express();

const mongoosePath = process.env.MANGO_URL;
mongoose.set('strictQuery', false);

mongoose.connect(mongoosePath, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const whitelist = [ 'http://localhost:3000' ];
const corsOptions = {
	origin: function(origin, callback) {
		console.log('** Origin of request ' + origin);
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			console.log('Origin acceptable');
			callback(null, true);
		} else {
			console.log('Origin rejected');
			callback(new Error('Not allowed by CORS'));
		}
	}
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'frontend/build')));
	// Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
	});
}

app.use(bodyParser.json());
//app.use('/users', usersRoute);
app.use('/comments', commentsRoute);
app.use('/uploads', express.static('uploads'));

app.listen(3001);
