// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
	if(err){
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('connect to MongoDB server');

	//deleteMany
	// db.collection('Todos').deleteMany({text: 'go to mazda'}).then((result) => {
	// 	console.log(result);
	// }, (err) => {
	// 	console.log('could not find items to delete');
	// });

	//deleteOne
	// db.collection('Todos').deleteOne({text: 'mazda'}).then((result) => {
	// 	console.log(result);
	// }, (err) => {
	// 	console.log('no items deleted')
	// });

	//findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result)
	// })

	db.collection('Users').findOneAndDelete({
		_id: new ObjectID('58927129fca1fe6bbed6cb34')}).then((result) => {
			console.log(JSON.stringify(result, undefined, 2));
		});

	// db.close();
});