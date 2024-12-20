import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../navbar";
import { handleUpload } from "../../FileUpload";
import Footer2 from "../footer2";

export default function NewMenu() {
  const [category_name, setName] = useState("");
  const [category_description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      let category_image_url = "";
      if (image) {
        category_image_url = await handleUpload(image);
      }

      await axios.post("http://localhost:4000/category", {
        // Replace with actual API URL
        category_name,
        category_description,
        category_image_url: category_image_url,
      });

      toast.success("New Menu Category is added successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Menu Category adding is failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate("/hotelMenuPage");
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col justify-between relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?t=st=1734521074~exp=1734524674~hmac=7b00696977e1fa6c8169ef3c5887450344265f9875995ffb44368c528f9e7520&w=1060)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: 0,
        }}
      ></div>
      <Navbar />
      <div className="flex justify-center items-center flex-grow relative z-10">
        <div className="p-10 bg-white shadow-md rounded-lg m-6 min-h-full max-w-full w-full md:w-3/4 lg:w-4/5">
          {/* Title */}
          <div className="text-2xl font-semibold text-amber-950 mb-4">
            Add New Menu
          </div>
          <form onSubmit={handleRegister}>
            <div className="w-full flex flex-col md:flex-row m-5 mt-10">
              {/* Upload Photo Section */}
              <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 mt-4 flex flex-col items-center w-full md:w-1/2 h-100% ml-4">
                <div className="text-center ">
                  {/* Image Preview or Upload Icon */}
                  {image ? (
                    <div className="mt-4 flex justify-center items-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mt-10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {/* Upload Instructions */}
                  <div className="flex text-sm text-gray-600 ">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white font-semibold text-orange-500 hover:text-orange-600 rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        aria-label="Image"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>

              {/* Name, Price, Description */}
              <div className="space-y-4 w-full md:w-1/2 ml-4 mr-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={category_name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    aria-label="Name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-[#fafafa]"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    type="text"
                    value={category_description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    aria-label="Description"
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-[#fafafa]"
                    placeholder="Add a description..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div>
              {/* Save/Cancel Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#a85900]  hover:bg-gray-200"
                  onClick={handleCancel}
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
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
      <div className="bottom-0 w-full fixed">
        <Footer2 />
      </div>
    </div>
  );
}
