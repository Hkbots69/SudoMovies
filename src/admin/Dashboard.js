import React, { useEffect, useState } from "react";
import "../components/login.css";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const history = useNavigate();
  const Addmovie = async (e) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    };

    const mm = document.getElementById("moveinfo").value
    console.log(mm)

    let response = await fetch("https://sudomovies-backend.onrender.com/api/movies/addmoves", {
      method: "POST",
      body: mm,
      headers: headersList,
    });

    let data = await response.json();

    if (data.success || !data.adult ) {
      document.getElementById("msg").innerHTML = "Movie Added"
    } else {
      document.getElementById("msg").innerHTML = data.error;
    }
  };


  const logoutuser = () => {
    localStorage.removeItem("token");
    history('/login')
  }

  const goheme = () => {
    history('/login')
  }
  return (
    <>
      <div className="aline">
        <span id="msg"></span><br />
        <h2>Add Movie Here</h2>
        <textarea rows="20" cols="100" id="moveinfo"></textarea><br />
        <button className="playva" onClick={Addmovie}>Add Movie</button>
        <button className="playva" onClick={logoutuser}>Logout</button>
        <button className="playva" onClick={goheme}>Home</button>
      </div>
    </>
  );
}

export default Dashboard;
