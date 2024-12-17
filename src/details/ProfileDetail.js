import React, { useEffect, useState } from 'react';
import { useAuth } from '../authentication/AuthContext'; // Assuming you have an auth context
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const ProfileDetail = () => {
  const { authState } = useAuth(); // Access the auth context to get the token
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch the profile details when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8001/profile', {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        setProfileData(response.data); // Assuming the response contains the profile data
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Failed to load profile');
      }
    };

    fetchProfile();
  }, [authState.token]);

  // Render loading or error messages if necessary
  if (!profileData && !error) {
    return <p>Loading profile...</p>;
  }

  const handleEditProfile = () => {
    // Navigate to the '/create-profile' route when the edit button is clicked
    navigate('/create-profile');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Profile Details</h2>

      {/* Show error message if there's an error */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Profile details display */}
      {profileData && (
        <div>
          <div className="mb-4">
            <h3 className="font-medium text-lg">Name:</h3>
            <p>{profileData.name}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-lg">Gender:</h3>
            <p>{profileData.gender}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-lg">Street:</h3>
            <p>{profileData.street}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-lg">Postal Code:</h3>
            <p>{profileData.postalCode}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-lg">City:</h3>
            <p>{profileData.city}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-lg">Country:</h3>
            <p>{profileData.country}</p>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-4">
            <button
              onClick={handleEditProfile}
              className="w-full p-3 bg-blue-500 text-white rounded-md"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
