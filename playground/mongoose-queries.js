
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}  = require('./../server/models/Todo');
const {User}  = require('./../server/models/User');

var id = '5894d0889497e9a44d5e6b7c'

if(!ObjectID.isValid(id)){
	console.log('ID not valid');
}
//
Todo.find({ 
	_id: id
}).then((todos) => {
	console.log('Todos', todos);
});
//
Todo.findOne({
	_id: id
}).then((todo) => {
	console.log('Todo', todo);
});
//
Todo.findById(id).then((todo) => {
	if(!todo){
		return console.log('Id not found')
	}
	console.log('Todo by Id', todo);
}).catch((e) => console.log(e));
//
var id = '5893a785253812401a5e58a1'
//
User.findById(id).then((user) => {
	if(!user){
		return console.log('User not found')
	}
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));