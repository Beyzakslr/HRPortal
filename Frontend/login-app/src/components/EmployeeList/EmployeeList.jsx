import React from 'react';
import useFetchEmployees from '../../hooks/useFetchEmployees';
import EmployeeTable from './EmployeeTable';
import styles from './EmployeeList.module.css';

const EmployeeList = () => {
  const { employees, loading, error } = useFetchEmployees();

  if (loading) {
    return <div className={styles.statusMessage}>Yükleniyor...</div>;
  }

  if (error) {
    return <div className={styles.statusMessageError}>{error}</div>;
  }

  return (
    <div className={styles.employeeListContainer}>
      <h2>Çalışan Listesi</h2>
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default EmployeeList;
