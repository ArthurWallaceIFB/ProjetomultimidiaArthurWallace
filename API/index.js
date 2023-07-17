const express = require('express');
const bodyParser = require('body-parser');
//================================
const mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb+srv://retroracer:retro9182@apidatabase.xowbpyv.mongodb.net/?retryWrites=true&w=majority',{
     useNewUrlParser: true,
     useUnifiedTopology: true
});
//======================================
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//========================================
const userController = require('./controllers/UserController');
// adiciona user
app.post('/user', userController.store);
// lista user
app.get('/user', userController.show);
// lista user, filtrando por email
// ex: /user/buscaemail/?email=vaguetti@gmail.com
app.get('/user/buscaemail/*', userController.index);

// exclui user
//req.params  = route params (post, put, delete)
app.delete('/user/:id', userController.destroy);

// altera user
app.put('/user/:id', userController.update);


//========================



const RankingController = require('./controllers/RankingController');

app.get('/all/ranking', RankingController.show);  // todos os rankings
app.get('/ranking/:id', RankingController.indexbyUserId);
app.post('/ranking', RankingController.store);
app.put('/ranking/:id', RankingController.update);





// inicialização básica
app.get('/', (req, res) => {
res.send('REST API Game');
});

app.listen(3000, () => console.log('server REST API GAME started on port: 3000 '));

