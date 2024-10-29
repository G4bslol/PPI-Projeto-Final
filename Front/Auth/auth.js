export default function auth(req, res) {
    const user = req.body.user
    const password = req.body.password

    if (user == 'admin' && password == 'admin') {
        req.session.auth = true
        res.redirect('/main.html')
    } else {
        console.log('Passou pelo else admin / admin')
    }
}

export function validateAuth(req, res, next){
    if(req.session.auth != undefined && req.session.auth == true) {
        next()
    } else {
        res.redirect('/main.html')
    }
}

export function logout(req, res) {
    req.session.auth = undefined;
    res.redirect('./main.html')
}