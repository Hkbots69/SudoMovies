import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { BsStarHalf } from "react-icons/bs";
import "react-tuby/css/main.css";
import "./video-react.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/no-image.jpg";
import { Player, BigPlayButton } from "video-react";
let purl;

const Details = () => {
  let params = useParams();
  let navigate = useNavigate();
  
  const [movie, setMovie] = useState();

  const murl = `https://movieflix-movies.s3.ap-south-1.amazonaws.com/movies/${params.movieId}.mp4`;

  const fetchMovie = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US`
    );
    const movie = await data.json();
    setMovie(movie);
    purl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
    startplayer();
  };

  useEffect(() => {
    fetchMovie(params.movieId)
  }, []);


  const startplayer = () => {
    var str = window.location.href;
    var myVar = setInterval(function () {
      cutcoin();
      console.log("cut token");
      console.log(str.search(/GeeksforGeeks/i))
      if (!str.search(/home/i)) { 
        console.log("Url is done" + window.location.href)
        clearInterval(myVar);
      }
    }, 15000);
    // clearInterval(myVar)
    
  };

  const cutcoin = async () => {
    
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token")
    };

    let response = await fetch("https://sudomovies-backend.onrender.com/api/tokens/cutoken", {
      method: "PUT",
      headers: headersList,
    });

    let data = await response.json();

    if (!data.success) {
      document.getElementById("view").style.display = 'none';
      document.getElementById("error").innerHTML = 'Plase Recharge Coin'
    }
  };
  return (<>
    <span id="error" className="aline"></span>
    <div id="view">
      <div className="mt-5">
        {/* <link
          rel="stylesheet"
          href="https://video-react.github.io/assets/video-react.css"
        /> */}

        <Player poster={purl}>
          <source src={murl} />
          {/* <poster src={movie.backdrop_path}/> */}
          <BigPlayButton position="center" onClick={startplayer} />
        </Player>
      </div>
      <div>
        <div className="back">
          <MdArrowBack
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        {movie && (
          <div className="container details">
            <h1 className="section-title">{movie.original_title}</h1>
            {movie.poster_path !== null ? (
              <img
                className="img-bg"
                alt={movie.original_title}
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              />
            ) : (
              <img className="img-bg" alt="defaultImage" src={defaultImage} />
            )}
            <div>
              <h4>Overview </h4>
              <p>{movie.overview}</p>
            </div>
            <div>
              <h4>Rating</h4>
              <p id="rate">
                <BsStarHalf />
                {movie.vote_average}
              </p>
            </div>
            <div>
              <h4>Film genres</h4>
              <ul>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Production companies</h4>
              <ul>
                {movie.production_companies.map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Production countries</h4>
              <ul>
                {movie.production_countries.map((prod) => (
                  <li>{prod.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Release</h4>
              <p>{movie.release_date}</p>
            </div>
            <div>
              <a href={movie.homepage}>
                <span> Film page </span>
                <FiExternalLink />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Details;
