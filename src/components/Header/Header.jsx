import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { FaAngleDown } from "react-icons/fa";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

const DropdownMenu = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  const dispatch = useDispatch();
  const logoutHandler = ()=>{
    dispatch(logout());

}


  return (
    <Flex alignItems="center">
      <Box>
        <Text color="white" fontSize='x-small' mt={'16px'} mb={'6px'}>
          {user.firstName + " " + user.lastName}
        </Text>
        <Text color="white" fontSize="x-small" pr={'20px'}>
          {user.walletAddress}
        </Text>
      </Box>
      <Avatar
        size="sm"
        name={user.firstName+" "+user.lastName}
        bg={"#ECC94B"}
        src={user.avatarUrl}
        //{"https://res.cloudinary.com/dqelmz4vt/image/upload/v1683246415/pxzcc5nhzbzwogsyrkbd.jpg"}
        onClick={handleMenuToggle}
        cursor="pointer"
        boxSize={30}
      />
      <FaAngleDown color="#ECC94B" onClick={handleMenuToggle} />
      {isOpen && (
        <Box
          position="absolute"
          top="calc(100% + 8px)"
          zIndex="999"
          minWidth="200px"
          p={2}
          mt={2}
          bg="gray"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          shadow="md"
          onMouseLeave={handleMenuClose}
        >
          <Link to="/mytender">
            <Flex alignItems="center" px={2} py={1} cursor="pointer">
              <IoMdPerson size={20} />
              <Text ml={2}>Mytender</Text>
            </Flex>
          </Link>
          <Link to="/profile">
            <Flex alignItems="center" px={2} py={1} cursor="pointer">
              <FaUserCircle size={20} />
              <Text ml={2}>Profile</Text>
            </Flex>
          </Link>
          <Link to="/">
            <Flex alignItems="center" px={2} py={1} cursor="pointer">
              <FaSignOutAlt size={20} />
              <Text ml={2} onClick={logoutHandler}>Logout</Text>
            </Flex>
          </Link>
        </Box>
      )}
    </Flex>
  );
};

const Header = ({ isAuthenticated }) => {

    // const user = {
    //     name: "Nayab Nathani",
    //     avatarUrl:
    //       "https://res.cloudinary.com/dqelmz4vt/image/upload/v1683246415/pxzcc5nhzbzwogsyrkbd.jpg",
    //     walletAddress: "0x1234567890ABCDEF",
    //   };

    const {user} = useSelector(state => state.user)

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand className="logo me-auto">
                <a href="/">
                  <h4>Tender First</h4>
                  <span>.</span>
                </a>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                  <Nav.Link className="me-5 ms-5" href="/marketplace" cpas>
                    Market Place
                  </Nav.Link>
                  <Nav.Link className="ms-5 me-5" eventKey={2} href="/opentender">
                    Open a Tender
                  </Nav.Link>
                </Nav>
                <Nav className="ml-auto ms-auto">
                  <DropdownMenu user={user}/>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      ) : (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand className="logo me-auto">
                <a href="/">
                  <h4>Tender First</h4>
                  <span>.</span>
                </a>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                  <Nav.Link className="me-5 ms-5" href="/" cpas>
                    Home
                  </Nav.Link>
                  <Nav.Link className="ms-5 me-5" eventKey={2} href="/#about">
                    About
                  </Nav.Link>
                  <Nav.Link className="ms-5" eventKey={3} href="/#team">
                    Our Team
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link className="get-started-btn ms-5" href="/Login">
                    LOGIN
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    </>
  );
};

export default Header;
