const express = require('express');
const path = require('path');
const { sendMail } = require('./controller/sendMail')
const { login, logout, validatLogineMiddleware, validateLogin } = require('./controller/login')
const { auth } = require('express-openid-connect')
const app = express();
const cookieParser = require("cookie-parser")
require('dotenv').config()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// const config = {
//     authRequired: process.env.AUTHREQUIRED,
//     auth0Logout: process.env.AUTH0LOGOUT,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASEURL,
//     clientID: process.env.CLIENTID,
//     issuerBaseURL: process.env.ISSUERBASEURL,
// }
//with is middleware set, all requset to /login and /logout are handled automatically
// app.use(auth(config));

app.get('/', (req, res) => {
    res.render('index',);
})
app.get('/forms', (req, res) => {
    const userinfo = req.oidc.user
    if (userinfo?.email === 'abc@gmail.com')
        res.render('forms',);
    else
        res.status(400).send('unauthorised requset')
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