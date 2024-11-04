export default function auth(req, res) {
    const user = req.body.user
    const password = req.body.password

    if (user == 'admin' && password == 'admin') {
        req.session.auth = true
        res.redirect('/main.html')
    } else {
        res.write(`
            <html>
                <head>
                    <title>Falha ao logar</title>
                    <meta charset="utf-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                </head>
                <body style='background-color: #222; color:white; padding: 200px'>
                    <h1>Usuário ou senha inválidos!</h1>
                    <a href="/main.html">Voltar a main</a>
                </body>
            </html>
            `);
        res.end()
    }
}

export function validateAuth(req, res, next) {
    if (req.session.auth != undefined && req.session.auth == true) {
        next()
    } else {
        res.write(`
            <html>
                <head>
                    <title>Falha ao logar</title>
                    <meta charset="utf-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                </head>
                <body style='background-color: #222; color:white; padding: 200px'>
                    <h1>Usuário não autenticado!</h1>
                    <a href="/main.html">Voltar a main</a>
                </body>
                </html>
    `);
        res.end()
    }
}

export function logout(req, res) {
    req.session.auth = undefined;
    res.redirect('./main.html')
}