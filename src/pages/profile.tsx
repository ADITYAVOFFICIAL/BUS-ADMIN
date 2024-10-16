import React, { useState } from 'react';
import '../app/globals.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const Profile: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string>('/profile.png');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-6 space-y-4 lg:space-y-0 lg:space-x-4">
      {/* Profile Information Section */}
      <div className="w-full lg:w-8/12">
        <div className="relative border border-gray-300 rounded-lg mb-2 bg-white shadow">
          <div className="bg-blue-700 text-white rounded-t-lg p-4 flex items-center">
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" /> Student Profile
          </div>
          <div className="p-4">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold w-1/3 py-2 text-black">Location</td>
                  <td>
                    <div className="font-semibold text-blue-700">ITKM Dept. 4th Floor UB</div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2 text-black">Position</td>
                  <td>
                    <div className="font-semibold text-blue-700">Administrator</div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2 text-black">Email ID</td>
                  <td>
                    <div className="font-semibold text-blue-700 break-words">{/* Add break-words class */}
                      assocdirector.itkm@srmist.edu.in
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2 text-black">Institution</td>
                  <td>
                    <div className="font-semibold text-gray-500">Faculty of Engineering and Technology, Kattankulathur</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="w-full lg:w-4/12">
        <div className="flex justify-center lg:justify-start">
          <div className="relative border border-gray-300 rounded-lg mb-4 bg-white shadow w-full max-w-md">
            <div className="p-4 text-center">
              <div className="flex justify-center items-center mb-4">
                <Image 
                  src={profilePic} 
                  alt="Profile Picture" 
                  width={150} 
                  height={150} 
                  className="rounded-full"
                />
              </div>
              <div className="font-semibold text-gray-500 mb-4">
                Current Status: <span className="text-lime-600">Active</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="file-upload"
                className="hidden" // Hide the default file input
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-700 text-white rounded-lg px-4 py-2 hover:bg-blue-800 transition"
              >
                Choose File
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
