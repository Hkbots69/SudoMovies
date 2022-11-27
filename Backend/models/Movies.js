const mongoose = require("mongoose");
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const m ={
  "adult": false,
  "backdrop_path": "/y5Z0WesTjvn59jP6yo459eUsbli.jpg",
  "genre_ids": [
      27,
      53
  ],
  "id": 663712,
  "original_language": "en",
  "original_title": "Terrifier 2",
  "overview": "After being resurrected by a sinister entity, Art the Clown returns to Miles County where he must hunt down and destroy a teenage girl and her younger brother on Halloween night.  As the body count rises, the siblings fight to stay alive while uncovering the true nature of Art's evil intent.",
  "popularity": 3715.544,
  "poster_path": "/wRKHUqYGrp3PO91mZVQ18xlwYzW.jpg",
  "release_date": "2022-10-06",
  "title": "Terrifier 2",
  "video": false,
  "vote_average": 7,
  "vote_count": 539
}

const MovieSchema = new Schema({
  adult:{
    type: Boolean,
    require: true,
  },
  backdrop_path:{
    type: String,
    require: true,
  },
  genre_ids:{
    type: [],
    require: true,
  },
  id:{
    type: Number,
    require: true,
  },
  release_date:{
    type: Date,
    require: true,
  },
  poster_path:{
    type: String,
    require: true,
  },
  title:{
    type: String,
    require: true,
  },
  vote_average:{
    type: Number,
    require: true,
  },
  popularity:{
    type: Number,
    require: true,
  },
  vote_count:{
    type: Number,
    require: true,
  },
  videourl:{
    type: String,
    require: true,
  },
  overview:{
    type: String,
    require: true,
  }





  // movieid: {
  //   type: Number,
  //   require: true,
  // },
  // title: {
  //   type: String,
  //   require: true,
  // },
  // overview: {
  //   type: String,
  //   require: true,
  // },
  // poster_path: {
  //   type: String,
  //   require: true,
  // },
  // genre_ids: {
  //   type: Number,
  // },
  // vote_average: {
  //   type: Number,
  // },
  // release_date: {
  //   type: Date,
  // },
  // posturl: {
  //   type: String,
  //   require: true,
  // },
  // videourl: {
  //   type: String,
  //   require: true,
  // }
  
});
const Movies = mongoose.model("movies", MovieSchema);
Movies.createIndexes();
module.exports = Movies;
