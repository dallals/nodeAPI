const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todos =[{ // seed data
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completeAt: 333,
	completed: true
}];

beforeEach((done) => {
	Todo.remove({}).then(() => { //deleting DB to make test pass with know data
		return Todo.insertMany(todos); // adding const todos with seed data
	}).then(() => done());
});


//test for added new todo
describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}
				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			}); 
	});

	it('should not create todo with bad data', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if(err){
					return done(err);
				}
				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	});
});

// test for get all todos
describe('Get /todos', () => {
	it('should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	})
});

describe('GET /todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text)
			})
			.end(done);
	});
	it('should return 404 if todo not found', (done) => {
		request(app)
			.get(`/todos/${new ObjectID().toHexString()}`)
			.expect(404)
			.end(done);
	});
	it('should return 404 for non-object id', (done) => {
		request(app)
			.get('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('Delete /todos/:id', () => {
	it('should delete todo by ID', (done) => {
		var id = todos[1]._id.toHexString();
		request(app)
			.delete(`/todos/${id}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(id)
			})
			.end((err, res) => {
				if(err){
					return done(err);
				}
				Todo.findById(id).then((todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
			});
	});
	it('should send a 404 if todo not found', (done) => {
		request(app)
			.delete(`/todos/${new ObjectID().toHexString()}`)
			.expect(404)
			.end(done);
	});

	it('should send 404 if obect id is invalid', (done) =>{
		request(app)
			.delete('/todos/123')
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos/:id', () =>{
	it('Should update the todo', (done) => {
		var id = todos[0]._id.toHexString();
		var updatedText = "updated todo"
		// todos[0].text = updatedText
		request(app)
			.patch(`/todos/${id}`)
			.send({
				text: updatedText,
				completed: true
			})
			.expect(200)
			.expect((res) =>{
				expect(res.body.todo.text).toBe(updatedText);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number')
			})
			.end(done)
	});

	it('should clear completeAt when todo is not completed', (done) => {
		var id = todos[1]._id.toHexString();
		var updatedText = "updated todo2";
		request(app)
			.patch(`/todos/${id}`)
			.send({
				text: updatedText,
				completed: false
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(updatedText);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toNotExist();
			})
			.end(done)
	});
});





