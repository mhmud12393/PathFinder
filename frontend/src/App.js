import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './App.css'; 

// Function to calculate the path using x and y coordinates
const calculatePath = async (x, y) => {
  // Checking if x and y coordinates are provided
  if (!x || !y) {
    throw new Error('Please provide valid coordinates for x and y.');
  }

  try {
    // Making a GET request to the server with the x and y coordinates
    const response = await axios.get(`http://localhost:8000/calculate/${x}/${y}/`);
    // Checking if the server responded with an error status code
    if (response.status !== 200) {
      throw new Error('Server responded with an error');
    }
    // Returning the data received from the server
    return response.data;
  } catch (error) {
    // Handling specific error status codes
    if (error.response && error.response.status === 404) {
      throw new Error('No link station found for the given coordinates');
    }
    // Rethrowing the error for generic error handling
    throw error;
  }
};

// Main App function
function App() {
  // Using useState hook for state management
  const [state, setState] = useState({
    x: '',
    y: '',
    result: null,
    error: null,
    // Adding tempX and tempY to store the input values before the form is submitted (so that it doesn't update on change)
    tempX:'',
    tempY:''
  });

  // Function to handle changes in the input fields
  const handleChange = useCallback((event) => {
    // Updating the state with the new input values using the name attribute of the input fields
    setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  // Function to handle form submission
  const handleSubmit = useCallback(async (event) => {
    // Preventing the default form submission behaviour (page reload)
    setState(prevState => ({
      ...prevState,
      // Saving the input values before the form is submitted so that it doesn't update on change.
      tempX:state.x,
      tempY:state.y
    }));
    event.preventDefault();
    try {
      const result = await calculatePath(state.x, state.y); // function with the current state values as arguments
      // Updating the state with the result and resetting the error:
      setState(prevState => ({
        ...prevState,
        result,
        error: null,
      }));
    } catch (error) {
      // Updating the state with the error message if an error occurred during the request:
      setState(prevState => ({
        ...prevState,
        error: 'An error occurred: ' + error.message,
      }));
    }
  }, [state.x, state.y]);

  return (
    <div className="container mt-5 wrapper">
      <h1 className="text-center text-auto mb-4" style={{color: 'black'}}>Path Finder</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="alert alert-primary" style={{ fontSize: '20px' }}>Please enter your coordinates to find the best link for your location.</div>
        <div className="row g-3">
          <div className="col">
            <label htmlFor="x-input" className="form-label" style={{ fontWeight: 'bold' }}>Point X:</label>
            <input type="number" id="x-input" name="x" className="form-control" placeholder="X" value={state.x} onChange={handleChange} />
          </div>
          <div className="col">
            <label htmlFor="y-input" className="form-label" style={{ fontWeight: 'bold' }}>Point Y:</label>
            <input type="number" id="y-input" name="y" className="form-control" placeholder="Y" value={state.y} onChange={handleChange} />
          </div>
          <div>
            <button type="submit" className="btn btn-dark d-grid gap-2 col-6 mx-auto" style={{backgroundColor: '#4a4a4a'}}>Submit</button>
          </div>
        </div>
      </form>
      {state.error && <div className="alert alert-danger">{state.error}</div>}
      {state.result && (
        state.result.best_link_station ? (
          <div className="bg-primary card text-auto bg-success">
            <div className="card-body">
              <h5 className="card-title" style={{ fontWeight: 'bold' }}>Point: [{state.tempX}, {state.tempY}]</h5>
              <p className="card-text" style={{ fontWeight: 'bold' }}>Best link station: {state.result.best_link_station.x}, {state.result.best_link_station.y}</p>
              <p className="card-text" style={{ fontWeight: 'bold' }}>Power: {String(state.result.power).substring(0, 5)}</p>
            </div>
          </div>
        ) : (
          <div className="alert alert-warning" style={{ fontWeight: 'bold' }}>No link station within reach for point [{state.tempX}, {state.tempY}]</div>
        )
      )}
    </div>
  );
}

export default App;