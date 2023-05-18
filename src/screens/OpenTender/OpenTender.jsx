import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Breadcrumb from "../../components/BreadCrumb/breadcrumb";
import { Heading } from "@chakra-ui/react";
import "./OpenTender.css";
import Footer from "../../components/Footer/footer";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
// import CheckboxDropdown from "./CheckboxDropdown";
import Select from "react-select";
import { useSelector } from "react-redux";
import API_URL from "../../config"

const OpenTender = () => {
  const initialFormData = {
    title: "",
    description: "",
    quantity: "0",
    pool: [],
    requiredExperience: 0,
    timeLimit: "",
    category: [],
    location: "",
    startDate: new Date().toISOString().substr(0, 10),
    endDate: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [pool, setPool] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(API_URL + "/category")
        .then((response) => {
          const categoriesArray = response.data.result.data.map((category) => {
            return { value: category._id, label: category.title };
          });
          setCategories(categoriesArray);
        });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(API_URL + "/pool")
        .then((response) => {
          const poolArray = response.data.result.data.map((pool) => {
            return { value: pool._id, 
              label: `${pool.title}  (${pool.minimumCost} - ${pool.maximumCost})`
            };
          });
          setPool(poolArray);
          console.log("Here ", poolArray)
        });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  

  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
       API_URL + "/tender/add",
        {
          title: formData.title,
          description: formData.description,
          quantity: formData.quantity,
          userId: user._id,
          poolId: formData.pool,
          location: formData.location,
          timeLimit: formData.timeLimit,
          category: formData.category,
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Tender created successfully");
        setFormData(initialFormData);
        console.log(formData)
      } else {
        toast.error("Error creating tender");
        console.log(formData)
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error creating tender");
      // console.log(formData)
    }
  };

  return (
    <>
      <Breadcrumb />

      <Heading textAlign={"center"} mt={"10px"} mb={"20px"}>
        Open A Tender
      </Heading>
      <Form onSubmit={handleSubmit} style={{ paddingBottom: "20px" }}>
        <Form.Group controlId="title">
          <Form.Label style={{ paddingLeft: "10px" }}>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label style={{ paddingLeft: "10px" }}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ "--bs-input-focus-border-color": "#ECC94B" }}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label style={{ paddingLeft: "10px" }}>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={formData.quantity}
            required
            onChange={handleChange}
            min='0'
          />
        </Form.Group>
        <Form.Group controlId="pool">
          <Form.Label style={{ paddingLeft: "10px" }}>Pool</Form.Label>
          <Select
            options={pool}
            isMulti={false}
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                pool: selectedOption ? selectedOption.value : [],
              });
            }}
            value={pool.find((p) => p.value === formData.pool)}
          />
        </Form.Group>

        <Form.Group controlId="timeLimit">
          <Form.Label style={{ paddingLeft: "10px" }}>Time Limit (Number of Days)</Form.Label>
          <Form.Control
            type="number"
            name="timeLimit"
            value={formData.timeLimit}
            onChange={handleChange}
            required
            min='1'
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label style={{ paddingLeft: "10px" }}>Category</Form.Label>
          <Select
            options={categories}
            isMulti={true}
            onChange={(values) => {
              const selectedCategories = values.map((value) => value.value);
              setFormData({ ...formData, category: selectedCategories });
            }}
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label style={{ paddingLeft: "10px" }}>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label style={{ paddingLeft: "10px" }}>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label style={{ paddingLeft: "10px" }}>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button
            type="submit"
            size="lg"
            style={{
              marginTop: "1rem",
              backgroundColor: "#ECC94B",
              color: "white",
              outline: "none",
              border: "none",
              transition: "background-color 0.3s ease",
              ":hover": { backgroundColor: "#F6E05E" },
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
      <Footer />
    </>
  );
};

export default OpenTender;
