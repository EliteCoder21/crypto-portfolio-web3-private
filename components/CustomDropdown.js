import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false); // Close the menu after selection
  };

  return (
    <div className="dropdown">
      {/*Package of Dropdown*/}
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        {

          options.map(
            (option) => <Dropdown.Item onClick={() => handleSelect(option)}>
              {option.label}
            </Dropdown.Item>

          )
        }
      </DropdownButton>
    </div>
  );
};

export default CustomDropdown;