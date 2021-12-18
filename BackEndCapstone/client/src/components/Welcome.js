import React, { useState, useContext } from "react";
import { Button } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Welcome() {

  let navigate = useNavigate();

  function sendToSignIn() {
    navigate('/login')
  }

  function sendToRegister() {
    navigate('/register')
  }

  return (
    <section className="welcome">
      <h1>HoneyDew</h1>
      <div className="motto">We Help Make Honey-Do Into Honey-Done!</div>
      <div className="loginregister">
        <Button size="lg" color="info" onClick={sendToRegister}>Sign Up</Button>
        <Button size="lg" color="primary" onClick={sendToSignIn}>Sign In</Button>
      </div>
    </section>

  );
}
