import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SelectCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category

  const navigate = useNavigate();
  
  useEffect(() => {
    // Making the GET request using axios
    axios.get('http://localhost:8080/api/category')
      .then(response => {
        // Mapping through the categories and setting them to the state
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  // Handle category selection
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    console.log('Selected Category:', category); // You can process the selected category here
  };

  // Handle the navigation
  const handleNavigate = () => {
    if (selectedCategory) {
      // Navigate to the target page and pass the selected category as state
      navigate('/becomedriver', { state: { selectedCategory } });
    } else {
      alert('Please select a category first!');
    }
  };

  return (
    <div>
      <h2>Select Category</h2>
      
      {/* Radio Buttons for Category Selection */}
      <div>
        {categories.map(category => (
          <div key={category.catID} style={{ marginBottom: '10px' }}>
            <input
              type="radio"
              id={`category-${category.catID}`}
              name="category"
              value={category.catID}
              onChange={() => handleSelectCategory(category)}
              checked={selectedCategory?.catID === category.catID}
            />
            <label htmlFor={`category-${category.catID}`} style={{ marginLeft: '10px' }}>
              <strong>{category.catType}</strong>
              <div>Seats: {category.noOfSeats}</div>
              <div>Luggage Type: {category.lagguageType}</div>
              <div>Price per KM: {category.pricePerKm}</div>
            </label>
          </div>
        ))}
      </div>

      {/* Display selected category details */}
      {selectedCategory && (
        <div>
          <h3>Selected Category Details:</h3>
          <p><strong>Category Type:</strong> {selectedCategory.catType}</p>
          <p><strong>Seats:</strong> {selectedCategory.noOfSeats}</p>
          <p><strong>Luggage Type:</strong> {selectedCategory.lagguageType}</p>
          <p><strong>Price per KM:</strong> {selectedCategory.pricePerKm}</p>
        </div>
      )}

      {/* Button to navigate to the selected category */}
      <button onClick={handleNavigate} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Go to Category Details
      </button>
    </div>
  );
}

export default SelectCategory;
