require('dotenv').config({ path: '.env' });
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

app.use(bodyParser.json());
//app.use('/users', usersRoute);
app.use('/comments', commentsRoute);
app.use('/uploads', express.static('uploads'));

app.listen(3001);
