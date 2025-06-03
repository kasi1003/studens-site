import React from "react";

export default function SubmittedInternship({ applied }) {
    const { internship, application_status } = applied;

    if (!internship) return null;

    return (
        <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold mb-2">{internship.internship_name}</h3>
                <p className="mb-2">{internship.internship_description}</p>
                <p className="text-sm text-gray-600 mb-1">
                    <strong>Work Hours:</strong> {internship.work_hours}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                    <strong>Location:</strong> {internship.work_location}
                </p>
            </div>
            <div className="mt-4">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        application_status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : application_status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                    {application_status ? application_status.charAt(0).toUpperCase() + application_status.slice(1) : "Pending"}
                </span>
            </div>
        </div>
    );
}