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
import CheckboxDropdown from "./CheckboxDropdown";

const OpenTender = () => {
  const initialFormData = {
    title: "",
    description: "",
    quantity: "",
    financialStability: "",
    pool: "",
    requiredExperience: "",
    timeLimit: "",
    category: "",
    startDate: "",
    endDate: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("https://c202-39-48-195-219.ngrok-free.app/category")
        .then((response) => {
          const categoriesArray = response.data.map((category) => {
            return { title: category.title, _id: category._id };
          });
          setCategories(categoriesArray);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "https://6780-39-48-222-11.ngrok-free.app/tender/add",
        formData,
        config
      );

      console.log(response.data);
      toast.success("Success");

      setFormData(initialFormData);
    } catch (error) {
      toast.error(error);
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
          />
        </Form.Group>
        <Form.Group controlId="financialStability">
          <Form.Label style={{ paddingLeft: "10px" }}>
            Financial Stability
          </Form.Label>
          <Form.Select
            value={formData.financialStability}
            onChange={handleChange}
            required
            className="formDrop"
          >
            <option value="">Select an option</option>
            <option value="stable">Stable</option>
            <option value="unstable">Unstable</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="pool">
          <Form.Label style={{ paddingLeft: "10px" }}>Pool</Form.Label>
          <Form.Select
            value={formData.pool}
            onChange={handleChange}
            required
            className="formDrop"
          >
            <option value="">Select an option</option>
            <option value="stable">P-1</option>
            <option value="unstable">Unstable</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="requiredExperience">
          <Form.Label style={{ paddingLeft: "10px" }}>
            Required Experience
          </Form.Label>
          <Form.Control
            type="number"
            name="requiredExperience"
            value={formData.requiredExperience}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="timeLimit">
          <Form.Label style={{ paddingLeft: "10px" }}>Time Limit</Form.Label>
          <Form.Control
            type="number"
            name="timeLimit"
            value={formData.timeLimit}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label style={{ paddingLeft: "10px" }}>Category</Form.Label>
          <CheckboxDropdown
            options={categories}
            onChange={(selectedOptions) => {
              const selectedIds = selectedOptions.map((option) => option._id);
              setFormData({ ...formData, category: selectedIds });
            }}
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
