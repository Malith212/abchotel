import React, { useState } from 'react';
import Navbar from '../navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function QRCodeGenerate() {
    const [tableName, setTableName] = useState('');
    const [qrCode, setQRCode] = useState(''); // To store the generated QR code
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('', {
                tableName
            });
            // Assuming the backend returns a URL or base64 string of the QR code
            setQRCode(response.data.qrCodeUrl); // Set the QR code URL in the state

            toast.success('QR code generated successfully!');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'QR code generation failed. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
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
        <div>
            <Navbar />
            <div className="p-6 bg-white shadow-md rounded-lg m-6 mt-10">
                {/* Title */}
                <div className="text-2xl font-bold text-[#5b3100] mb-4">Generate QR Code</div>
                <form onSubmit={handleRegister}>
                    <div className="w-full flex m-5 mt-10">
                        {/* Upload Photo Section */}
                        <div className="border-gray-300 rounded-lg p-6 flex flex-col items-center w-1/2 ml-4">
                            {/* Display QR Code */}
                            {qrCode && (
                                <div>
                                    <img src={qrCode} alt="QR Code" className="w-32 h-32 mb-4" />
                                    <button
                                        onClick={handlePrint}
                                        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#e9902c] hover:bg-orange-600"
                                    >
                                        Print QR Code
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 w-1/2 ml-4 mr-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Table Name</label>
                                <input
                                    type="text"
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                    required
                                    aria-label="TableName"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-[#fafafa]"
                                    placeholder="Table Name"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save/Cancel Buttons */}
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#a85900] hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#e9902c] hover:bg-orange-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
