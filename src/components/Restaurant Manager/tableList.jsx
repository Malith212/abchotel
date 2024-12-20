import React, { useState, useEffect } from 'react';

function TableList() {
    const [tables, setTables] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [tablesPerPage] = useState(5);

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

    // Get current tables
    const indexOfLastTable = currentPage * tablesPerPage;
    const indexOfFirstTable = indexOfLastTable - tablesPerPage;
    const currentTables = tables.slice(indexOfFirstTable, indexOfLastTable);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="table-container">
            <h2 className='text-xl font-semibold text-amber-950'>Table List</h2>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className='text-amber-950'>
                        <th className="px-4 py-2 border">Table ID</th>
                        <th className="px-4 py-2 border">Table Name</th>
                        <th className="px-4 py-2 border">QR Code</th>
                        <th className="px-4 py-2 border">Download QR</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTables.map(table => (
                        <tr key={table.table_id}>
                            <td className="px-4 py-2 border">{table.table_id}</td>
                            <td className="px-4 py-2 border">{table.table_name}</td>
                            <td className="px-4 py-2 border">
                                <img src={table.qr_code} alt={`QR code for ${table.table_name}`} width={50} />
                            </td>
                            <td className="px-4 py-2 border">
                                <button
                                    className="bg-orange-500 text-white py-1 px-4 rounded"
                                    onClick={() => downloadQR(table.qr_code, table.table_name)}
                                >
                                    Download QR
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination flex justify-center items-center mt-4">
                {Array.from({ length: Math.ceil(tables.length / tablesPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 border ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TableList;
