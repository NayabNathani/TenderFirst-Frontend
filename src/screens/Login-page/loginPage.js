import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import IndexNavbar from '../../components/Navbar/navbar';
import Footer from '../../components/Footer/footer'; 
import * as Components from "./Components";


const LoginPage= ()=> {

    const [signIn, toggle] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFname] = useState("");
    const [lastName, setLname] = useState("");
    const [contact, setContact] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    function submitCustomer() {
      axios.post("http://localhost:3001/customers/signup", {
          FirstName: firstName,
          LastName: lastName,
          CEmail: email,
          Contact: contact,
          password: password
      }).then(() => {
          alert("Insert Success");
      })
    }

    function validateSigninForm() {
      return email.length > 0 && password.length > 0;
  }

  async function handleSigninSubmit() {
      try{
          // send the email and password to the server
          let response = await axios.get(
          "http://localhost:3001/customers/signin", {
            params: {
              email: email,
              password: password
            }
          })
          //console.log(response);
          if(Object.keys(response.data).length == 0){
              alert("Incorrect Email or Password!")
          } else {
          // set the state of the user
          setUser(response.data);
          console.log(user);
          //localStorage.setItem("userdata", JSON.stringify(response.data));
          //let userdata = JSON.parse(localStorage.getItem("userdata"));
          }
      }
      catch(error) {
          console.log(error)
      }
  }

    function validateForm() {
      return email.length > 0 && password.length > 0 && firstName.length > 0 && lastName.length > 0 && contact.length > 0;
    }

    function handleSubmit(event) {
      event.preventDefault();
    }

  return (
    <>
    <IndexNavbar />

    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSubmit}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" value = {firstName} placeholder="First Name" onChange={(e) => {setFname(e.target.value)}}/>
          <Components.Input type="text" value = {lastName} placeholder="Last Name" onChange={(e) => {setLname(e.target.value)}}/>
          <Components.Input type="email" value = {email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
          <Components.Input type="password" value = {password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
          <Components.Input type="text" value = {contact} placeholder="Contact Number" onChange={(e) => {setContact(e.target.value)}}/>
          <Components.Button onClick  = {(e) => {
            if (validateForm) {
              console.log("done");
              submitCustomer();
            }
            else {
              e.preventDefault();
              alert("Some values left missing!");
            }
          }
          }>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSubmit}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" value = {email} placeholder="Email" onChange = {(e) => {setEmail(e.target.value)}}/>
          <Components.Input type="password" value = {password} placeholder="Password" onChange = {(e) => {setPassword(e.target.value)}}/>
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick = {(e) => {
            if (validateSigninForm()) {
              console.log("Done");
              handleSigninSubmit();
            }
            else {
              e.preventDefault();
              alert("Some values missing!");
            }
            }}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>

    <Footer />
    </>
  )
}

export default LoginPage
