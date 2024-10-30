import express from 'express';
import auth, { logout, validateAuth } from './Auth/auth.js'
import session from 'express-session'


const host = '0.0.0.0';
const port = '3000';
const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}))

app.use(express.static('./public'))

app.get('/logout', logout)

app.post('/login', auth)

app.get('/interessado', (req, res) => {
    res.redirect('/interessado-cadastro.html')
})

app.get('/filhote', (req, res) => {
    res.redirect('/filhote-cadastro.html')
})

app.use(validateAuth, express.static('./private', (req, res) => {}))

// app.use((req, res) => {
//     res.status(404).redirect('/main.html');
// });

app.listen(port, host, () => {
    console.log(`Servidor Front-End rodando em http://${host}:${port}`)
})
