import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import Footer from "../../components/Footer/footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updatePoolSuccess, updateUserEmailSuccess } from "../../redux/actions/user";
import API_URL from "../../config";
import Select from "react-select";
import { useEffect } from "react";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);

  // const [name, setName] = useState(user.firstName + " " + user.lastName);
  const [email, setEmail] = useState(user.email);
  const userId = user._id;
  const [pool, setPool] = useState([]);
  const [newPool, setNewPool] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      axios
        .get(API_URL + "/pool", { withCredentials: true })
        .then((response) => {
          const poolArray = response.data.result.data
          // .map((pool) => {
          //   return {
          //     value: pool._id,
          //     label: `${pool.title}  (${pool.minimumCost} - ${pool.maximumCost})`,
          //   };
          // });
          setPool(poolArray);
        });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        userId: userId,
        updates: {
          email: email,
          pool: newPool,
        },
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        API_URL + "/user/update",
        updatedUser,
        config
      );

      dispatch(updateUserEmailSuccess(email));
      dispatch(updatePoolSuccess(newPool)); // dispatch the new action
      toast.success("Updated Successfully");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Error Encountered!");
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

          <div style={{ marginBottom: "10px", marginLeft: "0" }}>
            <Form.Group className="mb-3">
              <Select
                options={pool.map(p => ({value: p, label: `${p.title} (${p.minimumCost}-${p.maximumCost})`}))}
                isMulti={false}
                onChange={(value) => {
                  setNewPool(value.value);
                }}
                placeholder="Select Pool"
              />
            </Form.Group>
          </div>

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
