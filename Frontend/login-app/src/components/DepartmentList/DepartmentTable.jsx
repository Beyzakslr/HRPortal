import styles from './DepartmentList.module.css';

const DepartmentTable = ({ departments, onEdit, onDelete }) => {
    return (
        <table className={styles.departmentTable}>
            <thead> 
                <tr>
                    <th>Departman Adı</th>
                </tr>
            </thead>
            <tbody>
                {departments.length === 0 ? (
                    <tr>
                        <td colSpan="1" className={styles.statusMessage} style={{ textAlign: 'center' }}>
                            Gösterilecek departman bulunamadı.
                        </td>
                    </tr>
                ) : (
                    departments.map((department) => (
                        <tr key={department.id}>
                            <td>{department.name}</td>
                            <td>
                                <div className={styles.actionButtons}>
                                    <button
                                        className={styles.editButton}
                                        onClick={() => onEdit(department)}
                                    >
                                        Düzenle
                                    </button>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => onDelete(department.id)}
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

   

}
export default DepartmentTable;