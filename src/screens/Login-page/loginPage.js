import React, { useState } from "react";
import Footer from '../../components/Footer/footer';
import * as Components from "./Components";
import { useDispatch, useSelector } from "react-redux";
import { login, registerUser } from "../../redux/actions/user";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import API_URL from "../../config";
import { Button } from "react-bootstrap";


const LoginPage = () => {

  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const initialFormData = {
    pool: [],
    categories: [],
    newCategory: "",

  };
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [pool, setPool] = useState([]);
  const { user, error, isAuthenticated, registerSuccess } = useSelector(
    (state) => state.user
  );
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLoginSubmit(event) {
    event.preventDefault();
    dispatch(login(email, password))
  };

  function handleSignUpSubmit(event) {
    event.preventDefault();
    const poolIds = formData.pool.map((option) => option.value);
    dispatch(registerUser(firstName, lastName, email, password, contactNumber, organizationName, poolIds, formData.categories));
  };

  const handleCategoryChange = (values) => {
    const selectedCategories = values.map((value) => value.value);
    setFormData({ ...formData, categories: selectedCategories });
  };

  const handleNewCategoryChange = (e) => {
    setFormData({ ...formData, newCategory: e.target.value });
  };

  const handleAddCategory = () => {
    const newCategory = formData.newCategory.trim();
    if (newCategory === "") {
      return;
    }
    axios
      .post(API_URL + "/category/add", {
        title: newCategory
      }, { withCredentials: true })
      .then((response) => {
        const newCategoryOption = {
          value: response.data.result._id,
          label: response.data.result.title,
        };
        setCategories([...categories, newCategoryOption]);
        setFormData({ ...formData, categories: [...formData.categories, newCategoryOption.value], newCategory: "" });
        setFlag(!flag);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    try {
      axios
        .get(API_URL + "/category", { withCredentials: true })
        .then((response) => {
          const categoriesArray = response.data.result.data.map((category) => {
            return { value: category._id, label: category.title };
          });
          setCategories(categoriesArray);
        });
    } catch (error) {
      console.error(error.message);
    }
  }, [flag]);

  useEffect(() => {
    try {
      axios
        .get(API_URL + "/pool", { withCredentials: true })
        .then((response) => {
          const poolArray = response.data.result.data.map((pool) => {
            return {
              value: pool._id,
              label: `${pool.title}  (${pool.minimumCost} - ${pool.maximumCost})`
            };
          });
          setPool(poolArray);
        });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error("Incorrect Email/Password!");
      dispatch({ type: "clearError" });
    } else if (isAuthenticated) {
      toast.success(`Welcome Back ${user.firstName} ${user.lastName}`);
      navigate("/dashboard");
    } else if (registerSuccess) {
      toast.success(`Successfully registered!`);
    }
  }, [dispatch, error, isAuthenticated, navigate, registerSuccess, user]);
  console.log(formData);
  return (
    <>
      <Components.Container style={{ maxWidth: "100%", height: "900px" }}>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSignUpSubmit}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" value={firstName} placeholder="First Name" onChange={(e) => { setFname(e.target.value) }} />
            <Components.Input type="text" value={lastName} placeholder="Last Name" onChange={(e) => { setLname(e.target.value) }} />
            <Components.Input type="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <Components.Input type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <Components.Input type="text" value={contactNumber} placeholder="Contact Number" onChange={(e) => { setContactNumber(e.target.value) }} />
            <Components.Input type="text" value={organizationName} placeholder="Organization Name" onChange={(e) => { setOrganizationName(e.target.value) }} />
            <div style={{ marginBottom: "20px", marginLeft: "0", display: "flex",marginTop:"10px" }}>
              <Select
                options={[...categories]}
                isMulti
                onChange={handleCategoryChange}
                value={categories.filter((category) => formData.categories.includes(category.value))}
                placeholder="Select categories"
              />

              <div style={{padding:"10px"}}>OR</div>
              <input autoComplete="off" type="text" id="newCategory" name="newCategory" value={formData.newCategory} onChange={handleNewCategoryChange} />
              <Button style={{margin:"5px"}} variant="warning" type="button" onClick={handleAddCategory}>Add category</Button>
            </div>


            <div style={{ marginBottom: "10px", marginLeft: "0" }}>
              <Select
                options={pool}
                isMulti={false}
                onChange={(value) => {
                  setFormData({ ...formData, pool: value ? [value] : [] });
                }}
                placeholder="Select Pool"
              />
            </div>
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
