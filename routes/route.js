const express = require("express");
const router = express.Router();
const app = express();
const passport = require('passport')
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const auth = require('../middelware/auth')
const register = require("../controller/registercontroller");
const login = require("../controller/logincontroller");
const { getPosts, getPostById, createPost, updatePost, deletePost, getPostByLocation, dashboard } = require('../controller/postcontroller')

router.post('/register', register)
router.post('/login', login)
router.get('/posts', auth, getPosts);
router.get('/posts/:id', auth, getPostById);
router.post('/posts', auth, createPost);
router.put('/posts/:id', auth, updatePost);
router.delete('/posts/:id', auth, deletePost);
router.get('/posts/:latitude/:longitude', auth, getPostByLocation)
router.get('/dashboard', dashboard)

module.exports = router;

