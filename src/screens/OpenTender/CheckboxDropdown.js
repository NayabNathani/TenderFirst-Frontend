import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CheckboxDropdown = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    const selectedIndex = selectedOptions.indexOf(option);
    if (selectedIndex >= 0) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(selectedIndex, 1);
      setSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectAll = () => {
    setSelectedOptions(options);
  };

  const handleDeselectAll = () => {
    setSelectedOptions([]);
  };

  const isChecked = (option) => {
    return selectedOptions.indexOf(option) >= 0;
  };

  return (
    <div className="checkbox-dropdown">
      <div
        className="dropdown-toggle"
        onClick={toggleDropdown}
        onBlur={() => setIsOpen(false)}
        style={{border:"1px solid rgba(128,128,128,0.5)"}}
      >
        Select Categories <span className="caret"></span>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <Form.Group controlId="category">
            {options.map((option) => (
              <Form.Check
                key={option._id}
                id={option._id}
                type="checkbox"
                label={option.title}
                checked={isChecked(option)}
                onChange={() => handleOptionClick(option)}
              />
            ))}
            <div className="dropdown-buttons">
              <button onClick={handleSelectAll}>Select All</button>
              <button onClick={handleDeselectAll}>Deselect All</button>
            </div>
          </Form.Group>
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
