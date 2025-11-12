import React from "react";

const FoodRequestsTable = ({ requests, loading, handleAction }) => {
  if (loading) {
    return <p className="text-center">Loading requests...</p>;
  }

  if (!requests || requests.length === 0) {
    return <p className="text-center text-gray-600">No requests yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Reason</th>
            <th className="px-4 py-2 border">Contact No.</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id} className="text-center">
              <td className="px-4 py-2 border">{req.name}</td>
              <td className="px-4 py-2 border">{req.userEmail}</td>
              <td className="px-4 py-2 border">{req.location}</td>
              <td className="px-4 py-2 border">{req.reason}</td>
              <td className="px-4 py-2 border">{req.contactNo}</td>
              <td className="px-4 py-2 border capitalize">{req.status}</td>
              <td className="px-4 py-2 border flex justify-center gap-2">
                {req.status === "pending" ? (
                  <>
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => handleAction(req._id, "accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => handleAction(req._id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodRequestsTable;
