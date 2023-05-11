import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import Footer from "../../components/Footer/footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);

  // const [name, setName] = useState(user.firstName + " " + user.lastName);
  const [email, setEmail] = useState(user.email);
  const userId = user._id;
  console.log(userId);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        userId: userId,
        updates: {
          email: email,
        },
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://49f9-39-48-195-219.ngrok-free.app/user/update",
        updatedUser,config
      );
      console.log(data); // log the updated user data
      toast.success("Updated Successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Error Encountered!")
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={submitHandler} style={{ textAlign: "center" }}>
          <h1 className="text-center text-uppercase mb-4 mt-4">
            Update Profile
          </h1>
          <hr />
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderColor: "#ECC94B" }}
            />
          </Form.Group>

          <Button
            variant="warning"
            type="submit"
            block
            style={{ width: "80%", marginTop: "1rem" }}
          >
            <FaLock className="me-2" />
            Update
          </Button>
        </Form>
      </div>
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Footer />
      </div>
    </>
  );
};

export default UpdateProfile;
