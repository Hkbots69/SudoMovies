const express = require("express");
const Movie = require("../models/Movies");
const router = express.Router();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { useInsertionEffect } = require("react");
const connectToMongo = require("../db");
const fachauser = require("../middleware/fachauser");
let success = false;

router.post("/addmoves", fachauser, async (req, res) => {
  try {
    let ch = await Movie.findOne({ id: req.body.id });
    if (ch) {
      return res.status(400).json({ success ,error: "Movie Alredy in Database" });
    }
    success = true
    movie = await Movie.create({
      adult: req.body.adult,
      backdrop_path: req.body.backdrop_path,
      genre_ids: req.body.genre_ids,
      id: req.body.id,
      overview:req.body.overview,
      popularity: req.body.popularity,
      poster_path: req.body.poster_path,
      release_date: req.body.release_date,
      title: req.body.title,
      videourl: req.body.videourl,
      vote_average: req.body.vote_average,
      vote_count: req.body.vote_count

      
    }).then((movie) => res.status(200).json({ success ,movie })); //functio for data sand to user
    success = false
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

router.get("/getmovie", fachauser, async (req, res) => {
  try {
    const Mo = await Movie.find();
    res.status(200).json({"results": Mo});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/getmovieData", fachauser, async (req, res) => {
  try {
    const Mo = await Movie.find({ id: req.query.id });
    success =true;
    res.status(200).json({success,Mo});
    success =false;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
