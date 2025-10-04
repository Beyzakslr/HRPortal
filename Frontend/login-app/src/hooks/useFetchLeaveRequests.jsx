// src/hooks/useFetchLeaveRequests.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaveRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://localhost:7269/api/LeaveRequest', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaveRequests(res.data);
    } catch (err) {
      setError('İzin talepleri alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return { leaveRequests, setLeaveRequests, fetchLeaveRequests, loading, error };
};


export default useFetchLeaveRequests;
