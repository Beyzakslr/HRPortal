// src/components/common/Table/Table.jsx

import React from 'react';
import styles from './PayrollList.module.css'; // Ortak stiller için aynı CSS dosyasını kullanabiliriz

const Table = ({ data, columns }) => {
    if (!data || data.length === 0) {
        return <p className={styles.noDataMessage}>Gösterilecek veri bulunamadı.</p>;
    }

    // Tablo başlıklarını oluştur
    const tableHeaders = (
        <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.accessor}>{col.header}</th>
                ))}
            </tr>
        </thead>
    );

    // Tablo gövdesini oluştur
    const tableBody = (
        <tbody>
            {data.map((row) => (
                <tr key={row.id}>
                    {columns.map((col) => (
                        <td key={col.accessor}>
                            {/* Eğer özel bir render fonksiyonu varsa onu kullan, yoksa direkt veriyi bas */}
                            {col.render ? col.render(row) : row[col.accessor]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );

    return (
        <table className={styles.genericTable}>
            {tableHeaders}
            {tableBody}
        </table>
    );
};

export default Table;