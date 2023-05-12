import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CheckboxDropdown = ({ options, name, value, handleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    handleChange({
      target: {
        name,
        value: Array.isArray(value)
          ? value.filter((v) => !!v)
          : value,
      },
    });
  };

  return (
    <div className="checkbox-dropdown">
      <div
        className="dropdown-button"
        onClick={handleDropdownToggle}
        aria-expanded={isOpen ? "true" : "false"}
      >
        {value.length > 0 ? (
          <div className="selected-items">
            {value.map((v) => (
              <span className="selected-item" key={v}>
                {options.find((o) => o.value === v)?.label || ""}
              </span>
            ))}
          </div>
        ) : (
          <span className="dropdown-placeholder">
            Select categories...
          </span>
        )}
        <span className="caret" />
      </div>
      <div
        className={`dropdown-menu${isOpen ? " show" : ""}`}
        aria-labelledby="dropdownMenuButton"
      >
        <Form.Group className="checkbox-list">
          {options.map((option) => (
            <Form.Check
              key={option.value}
              type="checkbox"
              id={`${name}_${option.value}`}
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={handleCheckboxChange}
              label={option.label}
            />
          ))}
        </Form.Group>
      </div>
    </div>
  );
};

export default CheckboxDropdown;
