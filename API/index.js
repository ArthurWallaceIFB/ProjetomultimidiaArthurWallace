const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/UserController');
const RankingController = require('./controllers/RankingController');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config({ path: 'API/.env' })

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@apidatabase.xowbpyv.mongodb.net/?retryWrites=true&w=majority`, {
     useNewUrlParser: true,
     useUnifiedTopology: true
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());


//========================================
// adiciona user
app.post('/api/user', userController.store);
// lista user
app.get('/api/user', userController.show);
// lista user, filtrando por nick
// ex: /user?id=64b7da09c7e81e74d5811d23
app.get('/api/user:nickname', userController.findByNickname);

// exclui user
//req.params  = route params (post, put, delete)
app.delete('/api/user/:id', userController.destroy);

// altera user
app.put('/api/user/:id', userController.update);


//========================

app.get('/api/all/ranking', RankingController.show);  // todos os rankings

app.get('/api/ranking/:id', RankingController.indexbyUserId);

app.post('/api/ranking', RankingController.store);

app.put('/api/ranking/:id', RankingController.update);





// inicialização básica
app.get('/api/', (req, res) => {
     res.send('REST API Game');
});


app.listen(3000, () => console.log('server REST API GAME started on port: 3000 '));

