// src/components/LeaveRequestList.jsx
import React from 'react';
import LeaveRequestTable from './LeaveRequestTable';
import useFetchLeaveRequests from '../../hooks/useFetchLeaveRequests';

const LeaveRequestList = () => {
  const { leaveRequests, setLeaveRequests,fetchRequests, loading, error } = useFetchLeaveRequests();

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return <LeaveRequestTable leaveRequests={leaveRequests} setLeaveRequests={setLeaveRequests} fetchRequests={fetchRequests}/>;
};

export default LeaveRequestList;
