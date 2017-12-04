let mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/test', {
	useMongoClient: true
});
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.once('open', () => {
	console.log('connect database successfully');
});


db.on('error', (err) => {
	console.error('Error in MongoDb connection: ' + error);
	mongoose.disconnect();
});


db.on('close', () => {
	console.log('数据库断开，重新连接数据库');
	mongoose.connect('mongodb://localhost/test', {
		useMongoClient: true
	});
});


module.exports = db;