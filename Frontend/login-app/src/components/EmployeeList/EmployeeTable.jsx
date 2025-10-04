import React from 'react';
import styles from './EmployeeList.module.css';

const EmployeeTable = ({ employees }) => {
  return (
    <table className={styles.employeeTable}>
      <thead>
        <tr>
          <th>Çalışan No</th>
          <th>İsim Soyisim</th>
          <th>E-posta</th>
          <th>Departman</th>
          <th>Pozisyon</th>
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="5" className={styles.statusMessage} style={{ textAlign: 'center' }}>
              Gösterilecek çalışan bulunamadı.
            </td>
          </tr>
        ) : (
          employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employeeNumber}</td>
              <td>{employee.fullName}</td>
              <td>{employee.email}</td>
              <td>{employee.departmentName}</td>
              <td>{employee.jobPositionName}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
