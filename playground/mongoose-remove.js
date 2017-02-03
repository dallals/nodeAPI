
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}  = require('./../server/models/Todo');
const {User}  = require('./../server/models/User');

// Todo.remove({}).then((res) => {
// 	console.log(res);
// });

// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('58950945f557042bf8e4541c').then((todo) => {
	console.log(todo);
});

Todo.findOneAndRemove({_id: '58950945f557042bf8e4541c'}).then((todo) => {
	console.log(todo);
})