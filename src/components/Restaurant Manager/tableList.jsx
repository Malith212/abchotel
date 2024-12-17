import React, { useState, useEffect } from 'react';

function TableList() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        // Fetch all tables data from the API
        fetch('http://localhost:4000/table')  // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => setTables(data))
            .catch(error => console.error('Error fetching tables:', error));
    }, []);

    // Function to download QR code
    const downloadQR = (qrCodeData, tableName) => {
        const link = document.createElement('a');
        link.href = qrCodeData;
        link.download = `${tableName}_QR.png`;
        link.click();
    };

    return (
        <div className="table-container">
            <h2>Table List</h2>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Table ID</th>
                        <th className="px-4 py-2 border">Table Name</th>
                        <th className="px-4 py-2 border">QR Code</th>
                        <th className="px-4 py-2 border">Download QR</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map(table => (
                        <tr key={table.table_id}>
                            <td className="px-4 py-2 border">{table.table_id}</td>
                            <td className="px-4 py-2 border">{table.table_name}</td>
                            <td className="px-4 py-2 border">
                                <img src={table.qr_code} alt={`QR code for ${table.table_name}`} width={100} />
                            </td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="bg-blue-500 text-white py-1 px-4 rounded"
                                    onClick={() => downloadQR(table.qr_code, table.table_name)}
                                >
                                    Download QR
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableList;
