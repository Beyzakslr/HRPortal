import React from "react";
import styles from "./JobPositionList.module.css"; 




const JobPositionTable = ({ jobPositions, onEdit, onDelete }) => {
  if (!jobPositions || jobPositions.length === 0) {
    return <p className={styles.statusMessage}>Gösterilecek pozisyon bulunamadı.</p>;
  }


  return (
    <table className={styles.jobPositionTable}> 

      <thead>
        <tr>
          <th>Pozisyon Adı</th>
          <th>Ücret</th>
          <th>İşlemler</th> 
        </tr>
      </thead>
      <tbody>
        {jobPositions.map((pos) => (
          <tr key={pos.id || pos.jobPositionId}> 
            <td>{pos.title}</td>
            <td>{pos.salary}</td>
            
            <td className={styles.actionButtons}> 
              <button 
                className={styles.editButton} 
                onClick={() => onEdit(pos)}
              >
                Düzenle
              </button>
              <button 
                className={styles.deleteButton} 
                onClick={() => onDelete(pos.id || pos.jobPositionId)}
              >
                Sil
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobPositionTable;