import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useNavigate } from 'react-router-dom';

function Singup() {

  const history = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      history('/home');
    }
  },[]);

  const [singupData, setsingupData] = useState({
    name: "",
    email: "",
    passwd: "",
  });
 
  const singupSubmit = async (e) => {
    e.preventDefault();
    
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    let bodyContent = JSON.stringify({
      name: singupData.name,
      email: singupData.email,
      passwd: singupData.passwd,
    });
    // console.log(bodyContent);

    let response = await fetch("http://18.234.35.72/api/auth/creatuser", {
      method: "POST",
      mode: "cors",
      body: bodyContent,
      headers: headersList,
    });
    console.log(response);
    let data = await response.json();
    // console.log(data);
    if (data.success) {
      localStorage.setItem('token',data.token);
      history('/home');
   }else{
      document.getElementById("msg").innerHTML = data.message;
   }
  };

  const onChange = (e) => {
    setsingupData({ ...singupData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="animated bounceInDown">
        <div className="container2">
          <span className=" animated tada" id="msg"></span>
          <form
            name="form1"
            className="box"
            method="post"
            onSubmit={singupSubmit}
          >
            <h4>Singup</h4>
            <h5>Create account.</h5>
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              onChange={onChange}
              value={singupData.name}
            />
            <input
              type="text"
              name="email"
              required
              placeholder="Email"
              onChange={onChange}
              value={singupData.email}
            />
            <i className="typcn typcn-eye" id="eye"></i>
            <input
              type="password"
              name="passwd"
              required
              placeholder="Passsword"
              id="pwd"
              autocomplete="off"
              value={singupData.passwd}
              onChange={onChange}
            />
            <input type="submit" value="Sign in" className="btn1" />
          </form>
          <Link to="/login" className="dnthave">
            Alredy have an account? Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default Singup;
