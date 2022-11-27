import React from "react";
import { MdOutlineMovieFilter } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { BiCameraMovie } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
// import {AiFillDollarCircle} from "react-icons/ai"
import { AiOutlineStar } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { useContext ,useEffect} from "react";
import MovieContext from "../MovieContext";
import { Link, useNavigate } from 'react-router-dom';

const Panel = () => {
  const history = useNavigate();
  
  useEffect(()=>{
      if (!localStorage.getItem("token")) {
        history('/login');
      }
    },[]);

  const {
    header,
    fetchPopular,
    getFavourites,
    fetchNowPlaying,
    fetchTopRated,
    fetchUncoming,
  } = useContext(MovieContext);

  const Logout= () =>{
      localStorage.removeItem('token');
      history('/login');
  }
  return (
    <div className="panel">
      <div>
        <MdOutlineMovieFilter
          onClick={() => fetchPopular()}
          className={header === "Trending" ? "active" : null}
        />

        <BiMoviePlay
          onClick={() => fetchNowPlaying()}
          className={header === "Now playing" ? "active" : null}
        />

        <BsStars
          onClick={() => fetchTopRated()}
          className={header === "Top rated" ? "active" : null}
        />

        <BiCameraMovie
          onClick={() => fetchUncoming()}
          className={header === "Uncoming" ? "active" : null}
        />
      </div>
      <div>
        <AiOutlineStar
          onClick={() => getFavourites()}
          className={header === "Your favourites" ? "active" : null}
        />
        <Link to="/profile"><FaUserCircle/></Link>
        
        {/* <AiFillDollarCircle /> */}
        <ImExit onClick={() => Logout()}/>
      </div>
    </div>
  );
};

export default Panel;
