import axios from 'axios';

const API_URL = 'http://3.223.98.72:1337/api/students';

// Fetch students with a limit
export const fetchStudents = async (limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}?_limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// Fetch a single student by ID
export const fetchStudent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching student with id ${id}:`, error);
    return null;
  }
};

// Create a new student
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(API_URL, { data: studentData });
    return response.data.data;
  } catch (error) {
    console.error("Error creating student:", error);
    return null;
  }
};

// Update an existing student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { data: studentData });
    return response.data.data;
  } catch (error) {
    console.error(`Error updating student with id ${id}:`, error);
    return null;
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error deleting student with id ${id}:`, error);
    return null;
  }
};
