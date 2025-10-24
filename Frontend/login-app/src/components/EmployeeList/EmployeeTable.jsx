import React from 'react';
import styles from './EmployeeList.module.css';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <table className={styles.employeeTable}>
      <thead>
        <tr>
          <th>Çalışan No</th>
          <th>İsim Soyisim</th>
          <th>E-posta</th>
          <th>Departman</th>
          <th>Pozisyon</th>
          <th>Düzenleme</th>
        </tr>
      </thead>
      <tbody>
        {employees.length === 0 ? (
          <tr>
            <td colSpan="6" className={styles.statusMessage} style={{ textAlign: 'center' }}>
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
              <td>
  <div className={styles.actionButtons}>
    <button
      className={styles.editButton}
      onClick={() => onEdit(employee)}
    >
      Düzenle
    </button>
    <button
      className={styles.deleteButton}
      onClick={() => onDelete(employee.id)}
    >
      Sil
    </button>
  </div>
 </td>

            </tr>
            
          ))
        )}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
