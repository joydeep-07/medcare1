import React, { useState, useEffect } from "react";
import Loader from "../Components/Loader"; // Assuming this is your loader component
import { endPoint } from "../api/endpoints";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear any previous errors

        // Make the API call to your backend
        // No authentication token or headers required for a public endpoint
        const response = await fetch(endPoint.users, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
         
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch users.");
        }

        const data = await response.json();
        // Map _id to 'id' for React's key prop, and include the new 'patientId'
        const formattedUsers = data.map((user) => ({
          id: user._id, // MongoDB's default _id (useful for React keys)
          patientId: user.patientId, // The custom patient ID (e.g., pid1000)
          fullname: user.fullname,
          email: user.email,
          createdAt: user.createdAt, // Mongoose timestamps will provide this
        }));
        setUsers(formattedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to load users. Please try again.");
      } finally {
        setLoading(false); // Ensure loading state is turned off
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this useEffect runs once on component mount

  // Determine which users to display based on 'showAll' state
  const displayedUsers = showAll ? users : users.slice(0, 6);

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-teal-50 p-6 sm:p-10 font-sans flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-8 sm:mb-12 text-center">
        <span className="bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
          Registered Patients
        </span>
      </h1>

      {/* Loading State */}
      {loading && <Loader />}

      {/* Error State */}
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md w-full max-w-4xl"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {/* Display Users List in a table */}
      {!loading && !error && (
        <div className="w-full max-w-[1550px] overflow-x-auto rounded-md shadow-xl">
          {users.length === 0 ? (
            // Message when no users are registered
            <div className="bg-white p-8 rounded-lg shadow-xl text-center text-gray-600 text-lg">
              <p className="mb-2">No patients registered yet.</p>
            </div>
          ) : (
            <>
              <table className="min-w-full bg-white rounded-xl overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm leading-normal">
                  <tr>
                    {/* Header for MongoDB's _id */}
                    {/* <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                      System ID
                    </th> */}
                    {/* Header for your custom patient ID */}
                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                      Patient ID
                    </th>
                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">
                      Registered On
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                    {displayedUsers
                      .slice()
                      .reverse()
                      .map((user, index) => (
                    <tr
                      key={user.id} // Use MongoDB's _id as the unique key for the row
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-blue-50" : "bg-white"
                      } hover:bg-blue-100 transition-colors duration-150`}
                    >
                      {/* Display MongoDB's _id */}
                      {/* <td className="py-4 px-6 text-left font-medium text-blue-800">
                        <span className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold">
                          {user.id}
                        </span>
                      </td> */}
                      {/* Display the custom patientId */}
                      <td className="py-4 px-6 text-left font-medium text-purple-800">
                        <span className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-semibold">
                          {user.patientId || "N/A"}{" "}
                          {/* Display patientId, fallback if somehow not set */}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-left font-medium">
                        <div className="flex items-center">{user.fullname}</div>
                      </td>
                      <td className="py-4 px-6 text-left">
                        <a
                          href={`mailto:${user.email}`}
                          className="text-teal-600 hover:text-teal-800 hover:underline"
                        >
                          {user.email}
                        </a>
                      </td>
                      <td className="py-4 px-6 text-left">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}{" "}
                        {/* Format the date for display */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length > 6 && (
                // Show More/Show Less buttons if there are more than 6 users
                <div className="flex justify-center p-4 bg-white">
                  {!showAll ? (
                    <button
                      onClick={() => setShowAll(true)}
                      className=" text-gray-500 font-medium py-2 px-6 rounded-md transition-colors duration-200 hover:text-gray-700"
                    >
                      Show More
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowAll(false)}
                      className="text-gray-500 font-medium py-2 px-6 rounded-md transition-colors duration-200 hover:text-gray-700 "
                    >
                      Show Less
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UsersList;
