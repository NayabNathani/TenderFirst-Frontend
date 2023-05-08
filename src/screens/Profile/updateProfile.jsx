import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import Footer from "../../components/Footer/footer";

const UpdateProfile = () => {
  const user = { name: "John Doe", email: "johndoe@example.com" };

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    // navigate.push('/profile');
  };

  return (
    <>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form onSubmit={submitHandler} style={{textAlign: "center"}}>
        <h1 className="text-center text-uppercase mb-4 mt-4">Update Profile</h1>
        <hr />

        <Form.Group className="mb-3">
          <Form.Label style={{marginLeft:"2px"}}>Name</Form.Label>
          <Form.Control
            type="text"
            autoFocus
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{borderColor: "#ECC94B",}}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{marginLeft:"2px", }}>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{borderColor: "#ECC94B",}}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{marginLeft:"2px"}}>Old Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            style={{borderColor: "#ECC94B",}}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{marginLeft:"2px"}}>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{borderColor: "#ECC94B",}}
          />
        </Form.Group>

        <Button variant="warning" type="submit" block style={{width:"80%"}}>
          <FaLock className="me-2" />
          Update
        </Button>
      </Form></div>
      <div style={{marginTop:"3rem"}}><Footer/></div>
    </>
  );
};

export default UpdateProfile;
