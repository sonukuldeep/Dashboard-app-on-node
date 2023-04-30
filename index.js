const express = require('express');
const path = require('path');
const { sendMail } = require('./controller/sendMail')
const { login, logout, validatLogineMiddleware, validateLogin } = require('./controller/auth')
const app = express();
const cookieParser = require("cookie-parser")
require('dotenv').config()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index',);
})
app.get('/forms', (req, res) => {
    res.render('forms')
})
app.get('/cards', (req, res) => {
    res.render('cards',);
})
app.get('/charts', (req, res) => {
    res.render('charts',);
})
app.get('/buttons', (req, res) => {
    res.render('buttons',);
})
app.get('/modals', (req, res) => {
    res.render('modals',);
})
app.get('/tables', (req, res) => {
    res.render('tables',);
})
app.get('/login', (req, res) => {
    res.render('login',);
})
app.get('/create-account', (req, res) => {
    res.render('create-account',);
})
app.get('/forgot-password', (req, res) => {
    res.render('forgot-password',);
})
app.get('/blank', (req, res) => {
    res.render('blank',);
})
app.get('/mail', validatLogineMiddleware, sendMail)

app.get('/magic-link', login)

app.get('/account', validateLogin)
app.get('/logout', logout)

app.get('/*', (req, res) => {
    res.render('404',);
})

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});