import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/items'; // REST API Server

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Create operation
  const create = async (newData) => {
    setLoading(true);
    setMessage(null);  // Clear previous message
    try {
      const response = await axios.post(`${API_URL}/create`, newData);
      setData(response.data);
      setMessage('Created successfully');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Read operation
  const read = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.get(`${API_URL}/read`);
      setData(response.data);
      setMessage('Data retrieved successfully');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Update operation
  const update = async (updatedData) => {
    const { id, ...data } = updatedData; // Destructure to get the id
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      setData(response.data);
      setMessage('Updated successfully');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete operation
  const remove = async (id) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        data: { id },
      });
      setData(response.data);
      setMessage(`Deleted successfully`);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, message, create, read, update, remove };
};

export default useApi;