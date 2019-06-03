// import express from 'express';
// import db from './db/db';
// import bodyParser from 'body-parser';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');
// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/api/v1/todos', (req, res) => {
	res.status(200).send({
		success: 'true',
		message: 'todos retrieved successfully',
		todos: db
	})
});

// get a single todo
app.get('/api/v1/todos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	db.map((todo) => {
		if (todo.id === id) {
			return res.status(200).send({
				success: 'true',
				message: 'todo retrieved successfully',
				todo
			});
		}
	});

	return res.status(404).send({
		success: 'false',
		message: 'todo does not exist'
	});
});

// create todo
app.post('/api/v1/todos', (req, res) => {
	if (!req.body.title) {
		return res.status(400).send({
			success: 'false',
			message: 'title is required'
		});
	} else if (!req.body.description) {
		return res.status(400).send({
			success: 'false',
			message: 'description is required'
		});
	}

	const todo = {
		id: db.length + 1,
		title: req.body.title,
		description: req.body.description
	}

	db.push(todo);

	return res.status(201).send({
		success: 'true',
		message: 'todo added successfully',
		todo
	})
});

app.put('/api/v1/todos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	let todoFound
	let itemIndex
	db.map((todo, index) => {
		if (todo.id === id) {
			todoFound = todo;
			itemIndex = index;
		}
	});

	if (!todoFound) {
		return res.status(404).send({
			success: 'false',
			message: 'todo not found'
		});
	}

	if (!req.body.title) {
		return res.status(400).send({
			success: 'false',
			message: 'title is required !!'
		});
	} else if (!req.body.description) {
		return res.status(400).send({
			success: 'false',
			message: 'description is required !!'
		});
	}

	const updatedTodo = {
		id: todoFound.id,
		title: req.body.title || todoFound.title,
		description: req.body.description || todoFound.description
	};
	db.splice(itemsIndex, 1, updateTodo);


	return res.status(201).send({
		success: 'true',
		message: 'todo updated successfully',
		updatedTodo
	});


});

// remove todo
app.delete('/api/v1/todos/:id', (req, res) => {
	const id = parseInt(req.params.id, 10); // 10 : base de calcul

	db.map((todo, index) => {
		if (todo.id === id) {
			db.splice(index, 1);
			return res.status(200).send({
				success: 'true',
				message: 'todo deleted successfully'
			});
		}
	});

	return res.status(404).send({
		success: 'false',
		message: 'todo not found'
	});
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
});

