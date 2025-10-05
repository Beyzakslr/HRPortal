// src/components/PayrollList/PayrollList.jsx

import React from 'react';
import useFetch from '../../hooks/useFetchPayroll';
import PayrollTable from './PayrollTable'; // Yeni Table component'imizi import ediyoruz
import styles from './PayrollList.module.css';

// Yardımcı fonksiyonlar (formatCurrency, formatDate) burada veya ayrı bir dosyada olabilir.
const formatCurrency = (amount) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });

const PayrollList = () => {
    const API_URL = 'https://localhost:7269/api/Payroll';
    const { data: payrolls, loading, error } = useFetch(API_URL);

    // Sütun yapılandırmasını burada tanımlıyoruz.
    const columns = [
        {
            header: 'Çalışan Adı',
            accessor: 'employee', // Anahtar
            render: (row) => row.fullName || 'Bilinmiyor' // Özel gösterim
        },
        {
            header: 'Ödeme Tarihi',
            accessor: 'payDate',
            render: (row) => formatDate(row.payDate)
        },
        {
            header: 'Ana Maaş',
            accessor: 'baseSalary',
            render: (row) => formatCurrency(row.baseSalary)
        },
        {
            header: 'Bonus',
            accessor: 'bonus',
            render: (row) => formatCurrency(row.bonus)
        },
        {
            header: 'Kesintiler',
            accessor: 'deductions',
            render: (row) => formatCurrency(row.deductions)
        },
        {
            header: 'Net Maaş',
            accessor: 'netSalary', // Bu anahtar veride yok, biz oluşturuyoruz
            render: (row) => {
                const netSalary = row.baseSalary + row.bonus - row.deductions;
                return <strong>{formatCurrency(netSalary)}</strong>;
            }
        }
    ];

    if (loading) return <div className={styles.statusMessage}>Yükleniyor...</div>;
    if (error) return <div className={styles.statusMessage}>Hata: {error.message}</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Maaş Bordroları</h2>
            <PayrollTable data={payrolls} columns={columns} />
        </div>
    );
};

export default PayrollList;