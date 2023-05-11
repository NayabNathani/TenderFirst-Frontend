import React, { useState } from "react";
import Footer from '../../components/Footer/footer';
import * as Components from "./Components";
import { useDispatch, useSelector } from "react-redux";
import { login, registerUser } from "../../redux/actions/user";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [pool, setPool] = useState("");
  const [category, setCategory] = useState([]);

  const { user, error, isAuthenticated, registerSuccess } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLoginSubmit(event) {
    event.preventDefault();
    dispatch(login(email, password))
  }

  function handleSignUpSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(firstName, lastName, email, password, contactNumber, organizationName, pool, category));
  };

  useEffect(() => {
    if (error) {
      toast.error("Incorrect Email/Password!");
      dispatch({ type: "clearError" });
    } else if (isAuthenticated) {
      toast.success(`Welcome Back ${user.firstName}`);
      navigate("/dashboard");
    } else if (registerSuccess) {
      toast.success(`Successfully registered!`);
    } else if (registerSuccess === false) {
      toast.error("Registration failed!");
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error, isAuthenticated, navigate, registerSuccess, user]);

  return (
    <>
      <Components.Container style={{ maxWidth: "100%", height: "650px" }}>
        <Components.SignUpContainer signingIn={signIn} >
          <Components.Form onSubmit={handleSignUpSubmit}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" value={firstName} placeholder="First Name" onChange={(e) => { setFname(e.target.value) }} />
            <Components.Input type="text" value={lastName} placeholder="Last Name" onChange={(e) => { setLname(e.target.value) }} />
            <Components.Input type="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <Components.Input type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <Components.Input type="text" value={contactNumber} placeholder="Contact Number" onChange={(e) => { setContactNumber(e.target.value) }} />
            <Components.Input type="text" value={organizationName} placeholder="Organization Name" onChange={(e) => { setOrganizationName(e.target.value) }} />
            <Components.Input type="text" value={pool} placeholder="Pool" onChange={(e) => { setPool(e.target.value) }} />
            <Components.Input type="text" value={category} placeholder="Category" onChange={(e) => { setCategory(e.target.value) }} />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signingIn={signIn}>
          <Components.Form onSubmit={handleLoginSubmit}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <Components.Input type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
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
