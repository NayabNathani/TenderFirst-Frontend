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

const OpenTender = () => {
  const initialFormData = {
    title: "",
    description: "",
    quantity: "",
    financialStability: false,
    requiredExperience: 0,
    timeLimit: "",
    category: [],
    location: "",
    startDate: "",
    endDate: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://localhost:8000/category").then((response) => {
        const categoriesArray = response.data.result.data.map((category) => {
          return { value: category._id, label: category.title };
        });
        setCategories(categoriesArray);
      });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleSelectChange = (selectedOption, { name }) => {
    const newFormData = { ...formData, [name]: selectedOption.value };
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "After",
        formData.title,
        formData.description,
        formData.quantity,
        formData.financialStability,
        formData.requiredExperience,
        formData.timeLimit,
        formData.category,
        formData.location,
        formData.startDate,
        formData.endDate
      );
      const res = await axios.put(
        "http://localhost:8000/tender/add",
        {
          title: formData.title,
          description: formData.description,
          quantity: formData.quantity,
          financialStability: formData.financialStability,
          requiredExperience: formData.requiredExperience,
          timeLimit: formData.timeLimit,
          category: formData.category,
          location: formData.location,
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        toast.success("Tender created successfully");
        setFormData(initialFormData);
      } else {
        toast.error("Error creating tender");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error creating tender");
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
          <Select
            value={{
              value: formData.financialStability,
              label: formData.financialStability,
            }}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, { name: "financialStability" })
            }
            options={[
              { value: "true", label: "true" },
              { value: "false", label: "false" },
            ]}
            required
            className="formDrop"
          />
        </Form.Group>
        {/* <Form.Group controlId="pool">
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
        </Form.Group> */}

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
