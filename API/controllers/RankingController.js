const mongoose = require('mongoose');
const Ranking = require('../models/Ranking');

module.exports = {
  // lista todos usuarios
  async show(req, res) {
    let rankings = await Ranking.find().populate('_idUser', 'nickname');
    return res.json(rankings);
  },
  //lista com filtro "email"
  async indexbyUserId(req, res) {
    let ranking = await Ranking.find(
      { _idUser: req.params.id }
    );
    return res.json(ranking);
  },

  async indexbyRankingId(req, res) {
    let ranking = await Ranking.find(
      { _id: req.params.id }
    );
    return res.json(ranking);
  },
  // adiciona ranking
  async store(req, res) {

    try {

      const existingRanking = await Ranking.find(
        { _idUser: req.body._idUser, difficulty: req.body.difficulty }
      );

      let rankingData = req.body;

      if (existingRanking && existingRanking.length > 0) {
        if (parseFloat(rankingData.record) < parseFloat(existingRanking[0].record)) {
          rankingData.old_record = parseFloat(existingRanking[0].record);
        }
        else {
          res.status(400);
          return res.json({newRecord: false, ...existingRanking});
        }

        let ranking = await Ranking.findByIdAndUpdate(existingRanking[0]._id, rankingData, { new: true });
        return res.json(ranking);
      }

      const ranking = await Ranking.create(req.body);
      return res.json(ranking);
    }
    catch(e){
      res.status(500);
      return res.send("Invalid Request!");
    }
  },
  // deleta ranking de jogador
  async destroy(req, res) {
    let ranking = await Ranking.findByIdAndRemove(req.params.id);
    return res.json(ranking);
  },

  // altera ranking de jogador
  // devesse passar dois dados: o id via param e o json via body
  async update(req, res) {
    let ranking = await Ranking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(ranking);
  }

};