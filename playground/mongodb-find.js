// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
	if(err){
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('connect to MongoDB server');

	// db.collection('Todos').find({
	// 		_id: new ObjectID('589266856912f668a85e5710')}).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to find todos', err);
	// });

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// }, (err) => {
	// 	console.log('Unable to find todos', err);
	// });

	db.collection('Users').find({name: 'Sammy'}).toArray().then((docs) => {
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to find items', err)
	})

	// db.close();
});