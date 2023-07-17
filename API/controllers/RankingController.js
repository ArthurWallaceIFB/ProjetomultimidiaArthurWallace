const mongoose = require('mongoose');
const Ranking = require('../models/Ranking');

module.exports = {
// lista todos usuarios
     async show(req, res)
    {
        let rankings = await Ranking.find();
        return res.json(rankings);
    }, 
  //lista com filtro "email"
     async indexbyUserId(req,res)
    {
        let ranking = await Ranking.find(
          { _idUser : req.params.id }
                                   );
        return res.json(ranking);
    },

     async indexbyRankingId(req,res)
    {
        let ranking = await Ranking.find(
          { _id : req.params.id }
                                   );
        return res.json(ranking);
    },
  // adiciona ranking
  async store(req, res)
     {
        const ranking =  await Ranking.create(req.body);

        return res.json(ranking);
     },
  // deleta ranking de jogador
  async destroy(req,res){
      let ranking = await Ranking.findByIdAndRemove(req.params.id);
         return res.json(ranking);
    },

  // altera ranking de jogador
  // devesse passar dois dados: o id via param e o json via body
   async update(req,res){
        let ranking = await Ranking.findByIdAndUpdate(req.params.id, req.body,{new:true}); 
        return res.json(ranking);
    }
 
};