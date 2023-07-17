const mongoose = require('mongoose');

const RankingSchema = new mongoose.Schema(
        {
          
          record: Number,
          old_record: Number,
		      _idUser: {
                 type: mongoose.Schema.Types.ObjectId, 
                 required: true
              }
        },
         { timestamps: true }
);

module.exports = mongoose.model('Ranking', RankingSchema);

/*
{
   "record" : 100,
   "old_record" : 0,
   "_idUser": "6491ef692100a4af034750ee"
}




*/