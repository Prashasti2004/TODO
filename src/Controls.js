import React, { useState } from 'react';
import { ReactComponent as DisplayIcon } from './Assets/Display.svg';  // Your Display icon
import { ReactComponent as DownIcon } from './Assets/down.svg';
import './controls.css'; // Add styles for dropdown

const Controls = ({ groupBy, setGroupBy, sortBy, setSortBy }) => {
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

  // Toggle the dropdown visibility when clicking on "Display"
  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="controls">
      {/* Display button with icon and text acting as the dropdown toggle */}
      <div className="dropdown-container">
        <button className="display-btn" onClick={handleToggleDropdown}>
          <DisplayIcon className="icon" /> {/* Display Icon */}
          <span>Display</span>
          <DownIcon/>
        </button>

        {/* Dropdown items that appear when clicking "Display" */}
        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <span>Grouping</span>
              <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="dropdown-item">
              <span>Ordering</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
