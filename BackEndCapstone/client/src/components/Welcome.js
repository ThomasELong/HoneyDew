import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Welcome() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <section className="welcome">
    <h1>HoneyDew</h1>
    <div className="motto">We Help Make Honey-Do Into Honey-Done!</div>
      <div className="loginregister">
        <Button size="lg" color="info" outline tag={Link} to={`register`}>Sign Up</Button>
        <Button size="lg" color="primary" outline tag={Link} to={`login`}>Sign In</Button>
      </div> 
    </section>
  
  );
}