import express from 'express';
import { addUser, getUser, modifyUser, removeUser, getAllUsers } from '../controllers/user.controller.js';

const route = express.Router();

route.get('/', getAllUsers)

route.get('/:id', getUser)

route.post('/', addUser)

route.delete('/:id', removeUser)

route.put('/:id', modifyUser)

export default route
