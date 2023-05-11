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

const Profile = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [User, setUser] = useState({ user });
  const avatarUrl = "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png";

  useEffect(() => {
    setUser(user);
  }, [user]);

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
                  <MDBCardImage
                  src={
                    newAvatar
                      ? URL.createObjectURL(newAvatar)
                      : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png"
                  }
                  alt={avatarUrl}
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
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
                        {user.firstName + " " + user.lastName}
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
                        {user.contactNumber}
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
                        {user.contactNumber}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Organization Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {user.organizationName ? user.organizationName : "None"}
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
