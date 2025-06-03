import React from "react";
import { router } from "@inertiajs/react";


export default function DisplayInternships({ internships }) {
    const handleApply = (internshipId) => {
        router.post(route("applied-internships.store"), {
            internship_id: internshipId,
        });
    };
    if (!internships || internships.length === 0) {
        return (
            <div className="p-6 text-gray-500 text-center">
                No Internships For Your Course
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
                <div
                    key={internship.id}
                    className="bg-white shadow rounded-lg p-6 flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-lg font-bold mb-2">
                            {internship.internship_name}
                        </h3>
                        <p className="mb-2">
                            {internship.internship_description}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                            <strong>Work Hours:</strong> {internship.work_hours}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                            <strong>Location:</strong>{" "}
                            {internship.work_location}
                        </p>
                    </div>
                    <button
                        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        onClick={() => handleApply(internship.id)}
                    >
                        Apply Now
                    </button>
                </div>
            ))}
        </div>
    );
}
