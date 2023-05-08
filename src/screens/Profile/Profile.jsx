import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Breadcrumb from "../../components/BreadCrumb/breadcrumb";
import Footer from "../../components/Footer/footer";
import { Link } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import axios from "axios";

// const user = {
//   name: "John Doe",
//   email: "johndoe@example.com",
//   phone: "123-456-7890",
//   address: "123 Main St, Anytown USA",
//   avatar: {
//     url: "https://res.cloudinary.com/dqelmz4vt/image/upload/v1683246415/pxzcc5nhzbzwogsyrkbd.jpg",
//   },
// };

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [user, setUser] = useState({
    name: "Ali Nayab Nathani",
    email: "nayabnathani@gmail.com",
    phone: "03313999101",
    address: "Garden East, Karachi",
    avatar: {
      url: "https://res.cloudinary.com/dqelmz4vt/image/upload/v1683246415/pxzcc5nhzbzwogsyrkbd.jpg",
    },
  });

  //When Api called
  // useEffect(() => {
  //   axios
  //     .get('https://example.com/api/user')
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  //dummyData working
  useEffect(() => {
    setUser(user);
  }, []);

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // FOR API CALLING
  // const handleConfirmChange = async () => {
  //   Send the selected file to the server
  //   const formData = new FormData();
  //   formData.append('file', newAvatar);

  //   try {
  //     await axios.put('https://example.com/api/user/avatar', formData);
  //     const newAvatarUrl = URL.createObjectURL(newAvatar);
  //     setUser((prevState) => ({
  //       ...prevState,
  //       avatar: { url: newAvatarUrl },
  //     }));
  //     setNewAvatar(null);
  //     setShowModal(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Dummy WOrking
  const handleConfirmChange = () => {
    const newAvatarUrl = URL.createObjectURL(newAvatar);
    console.log(newAvatarUrl);
    setUser((prevState) => ({
      ...prevState,
      avatar: { url: newAvatarUrl },
    }));
    setNewAvatar(null);
    setShowModal(false);
  };

  const AvatarModal = () => {
    return (
      <>
        <MDBModal show={showModal} getOpenState={(e) => setShowModal(e)}>
          <MDBModalHeader toggle={toggleModal}>Change Picture</MDBModalHeader>
          <MDBModalBody>
            <div className="mb-3">
              <label htmlFor="avatarInput" className="form-label">
                Choose a new profile picture:
              </label>
              <input
                type="file"
                className="form-control"
                id="avatarInput"
                onChange={handleFileInput}
              />
            </div>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="dark" onClick={toggleModal}>
              Cancel
            </MDBBtn>
            <MDBBtn
              outline
              className="ms-1"
              color="warning"
              onClick={handleConfirmChange}
            >
              Save changes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </>
    );
  };

  return (
    <>
      <Breadcrumb />
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  {/* <MDBCardImage
                  src={user.avatar.url}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid /> */}
                  <MDBCardImage
                    src={
                      newAvatar
                        ? URL.createObjectURL(newAvatar)
                        : user.avatar.url
                    }
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">{user.address}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <Link to="/updateprofile">
                      <MDBBtn
                        outline
                        color="dark"
                        style={{ height: "36px", overflow: "visible" }}
                      >
                        Edit profile
                      </MDBBtn>
                    </Link>
                    <MDBBtn
                      outline
                      className="ms-1"
                      color="warning"
                      onClick={toggleModal}
                    >
                      {" "}
                      Change Picture
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.name}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.phone}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.phone}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.address}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <AvatarModal />
      <Footer />
    </>
  );
};

export default Profile;
