// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
	if(err){
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('connect to MongoDB server');

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID('58937907f557042bf8e43a22')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }, {
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// });


		db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('589270f917d7d36ba6d06c1a')
		}, {
			$set: {
				name: 'Jimmy'
			},
			$inc: {
				ago: 1
			}
		}, {
			returnOriginal: false
		}).then((result) => {
			console.log(result);
		});

	// db.close();
});