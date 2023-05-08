import React, { useState } from "react";
import Footer from '../../components/Footer/footer'; 
import * as Components from "./Components";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/user";

const LoginPage= ()=> {

    const [signIn, toggle] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFname] = useState("");
    const [lastName, setLname] = useState("");
    const [contact, setContact] = useState("");

    const dispatch = useDispatch();

    function handleLoginSubmit(event) {
      event.preventDefault();
      dispatch(login(email,password))
    }

    function handleSignUpSubmit(event) {
      event.preventDefault();
      console.log("Clicked")

    }

  return (
    <>
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSignUpSubmit}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" value = {firstName} placeholder="First Name" onChange={(e) => {setFname(e.target.value)}}/>
          <Components.Input type="text" value = {lastName} placeholder="Last Name" onChange={(e) => {setLname(e.target.value)}}/>
          <Components.Input type="email" value = {email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
          <Components.Input type="password" value = {password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
          <Components.Input type="text" value = {contact} placeholder="Contact Number" onChange={(e) => {setContact(e.target.value)}}/>
          <Components.Button>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleLoginSubmit}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" value = {email} placeholder="Email" onChange = {(e) => {setEmail(e.target.value)}}/>
          <Components.Input type="password" value = {password} placeholder="Password" onChange = {(e) => {setPassword(e.target.value)}}/>
          <Components.Anchor href="/">Forgot your password?</Components.Anchor>
          <Components.Button>Sign In</Components.Button>
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
