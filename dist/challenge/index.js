const express       = require('express');
const app           = express();
const path          = require('path');
const routes        = require('./routes');
const { engine }    = require ('express-handlebars');

app.engine('handlebars', engine({defaultLayout: 'main', extname: '.handlebars'}));
app.set('view engine', 'handlebars');

var router = require('./routes/index');

app.set('views', './views');
app.use('/static', express.static(path.resolve('static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.disable('etag');

app.use(router);

app.all('*', (req, res) => {
    return res.status(404).send({
        message: '404 page not found'
    });
});

(async () => {
    app.listen(1337, '0.0.0.0', () => console.log('Listening on port 1337'));
})();