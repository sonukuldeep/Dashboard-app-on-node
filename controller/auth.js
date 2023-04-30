
const jwt = require('jsonwebtoken');
const { mailFunction } = require('./sendMail');

function login(req, res) {

    const token = jwt.sign({
        email: process.env.MAIL
    }, 'secret', { expiresIn: '1h' }); // numbers are interpreted as seconds. Other units:- '10m','1h','7 days' in quotes

    const msgTemplate = `
    <p><b>Hi there</b></p>
    <a href="${process.env.HOST}/account?token=${token}" target="_blank" rel="noopener noreferrer">Cilck this link to login to you app</a>
    `

    mailFunction(msgTemplate)
    res.status(200).render('magic-link')
}

function validateLogin(req, res) {
    const { token } = req.query
    const { status, error, email } = validateHelper(token)
    if (status !== 200) {
        res.status(status).send(error)
    }
    else if (email === process.env.MAIL) {
        res.cookie("token", token).status(200).render("login-redirect")
    }
}

function logout(req, res) {
    res.cookie("token", "").status(200).render("logout")
}

function validatLogineMiddleware(req, res, next) {
    const { token } = req.cookies
    const { status, error } = validateHelper(token)
    if (status !== 200) {
        res.status(status).send(error)
        return
    } else {
        next()
    }
}

module.exports = { login, validateLogin, validatLogineMiddleware, logout }

function validateHelper(token) {
    if (!token) {
        console.log('invalid jwt token')
        return { status: 401, error: 'something went wrong' }
    }
    let decoded
    try {
        decoded = jwt.verify(token, 'secret')
    } catch (error) {
        console.log(error.message)
        return { status: 401, error: 'something went wrong' }
    }
    if (!decoded.hasOwnProperty('email') || !decoded.hasOwnProperty('exp')) {
        console.log('invalid jwt token')
        return { status: 401, error: 'something went wrong' }
    }
    const { email, exp } = decoded
    if (exp < Date.now() / 1000) {
        console.log('fire')
        console.log('jwt token expired')
        return { status: 401, error: 'something went wrong' }
    }
    if (email !== process.env.MAIL) {
        console.log('user unauthorized')
        return { status: 401, error: 'something went wrong' }
    }
    return { status: 200, email }
}