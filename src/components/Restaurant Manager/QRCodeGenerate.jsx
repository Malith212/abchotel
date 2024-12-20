import React, { useState } from 'react';
import Navbar from '../navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import TableList from './tableList';
import Footer2 from '../footer2';

export default function QRCodeGenerate() {
    const [tableName, setTableName] = useState('');
    const [qrCode, setQRCode] = useState('');
    const [tableId, setTableId] = useState(null); // to store table id
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateQR = async (e) => {
        e.preventDefault();
        if (!tableName.trim()) {
            toast.error('Table name cannot be empty.');
            return;
        }

        setLoading(true);
        try {
            // Send request to the backend to generate QR code and create table
            const response = await axios.post('http://localhost:4000/table', {
                table_name: tableName,
            });

            // Extract the qr_code and table_name from the response
            const { qr_code, table_name } = response.data;

            setQRCode(qr_code); // Set the QR code data URL
            setTableName(table_name); // Update the table name
            toast.success('QR code generated and table created successfully!');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'QR code generation failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<img src="${qrCode}" alt="QR Code"/>`);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <div className='bg-orange-50 min-h-screen relative py-14'>
            <div
                className="absolute inset-0"
                style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?t=st=1734521074~exp=1734524674~hmac=7b00696977e1fa6c8169ef3c5887450344265f9875995ffb44368c528f9e7520&w=1060)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3, zIndex: 0 }}
            ></div>
            <Navbar />
            <div className="flex flex-row relative z-10">
                <div className="w-full md:w-1/2 p-6 bg-white shadow-md rounded-lg m-6 mt-10">
                    <div className="text-2xl font-bold text-amber-950 mb-4">Add New Table</div>
                    <form onSubmit={handleGenerateQR}>
                        <div className="w-full flex m-5 mt-10">
                            <div className="border-gray-300 rounded-lg p-6 flex flex-col items-center w-full">
                                {qrCode && (
                                    <div>
                                        <img src={qrCode} alt="QR Code" className="w-32 h-32 mb-4" />
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={handlePrint}
                                                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#e9902c] hover:bg-orange-600"
                                            >
                                                Print QR Code
                                            </button>
                                            <a
                                                href={qrCode}
                                                download={`Table-${tableName}-QRCode.png`}
                                                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#4caf50] hover:bg-green-600"
                                            >
                                                Download QR Code
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4 w-full">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Table Name</label>
                                <input
                                    type="text"
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-[#fafafa]"
                                    placeholder="Table Name"
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#a85900] hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#e9902c] hover:bg-orange-600"
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Save'}
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
                <div className="w-full md:w-1/2 p-6 bg-white shadow-md rounded-lg m-6 mt-10">
                    <TableList />
                </div>
            </div>
            <div className="bottom-0 w-full fixed">
                <Footer2 />
            </div>
        </div>
    );
}
