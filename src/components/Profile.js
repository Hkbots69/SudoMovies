import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import prileimg from "../assets/download.png";
import { MdEmail } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";

export default function Profile() {
  const [userData, setuserData] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    } else {
      history("/login");
    }
  }, []);

  const getProfile = async () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    };

    let response = await fetch(process.env.SERVER_URL+"/api/auth/getuser", {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    setuserData(data.user);
    // console.log(data.user);
    // console.log(localStorage.getItem("token"));
  };

  const addtokens =async () => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
     }
     
     let response = await fetch(process.env.SERVER_URL+"/api/tokens/addtoken/50", { 
       method: "PUT",
       headers: headersList
     });
     
     let data = await response.text();
     getProfile();
     
  }

  return (
    <>
     
      <div className="animated bounceInDown">
        <div className="container3">
          <div className="aline ">
          
            <img
              src={prileimg}
              className="profimg"
              width="150px"
              alt="USR_IMG"
            />
            <h1>{userData.name}</h1>

            <ul className="userinfot">
              <li>
                <MdEmail /> Email : {userData.email}
              </li>
              <li>
                <AiFillDollarCircle /> Coin : {userData.coin}
              </li>
            </ul>

            <Link className="playv" to="/home">
              Home
            </Link>

            <Link
              className="playv"
              to="/login"
              onClick={() => localStorage.removeItem("token")}
            >
              Logout
            </Link>
            <Link to="/profile" className="playv" onClick={getProfile}>
              Refresh
            </Link>

            <Link to="/profile" className="playv" onClick={addtokens}>
              Add Token
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
