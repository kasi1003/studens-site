import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function DisplayInternships({ internships, filters = {} }) {
    const [location, setLocation] = useState(filters.location || "");
    const [name, setName] = useState(filters.name || "");

    const handleApply = (internshipId) => {
        router.post(route("applied-internships.store"), {
            internship_id: internshipId,
        });
    };

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route("dashboard"), { location, name }, { preserveState: true });
    };

    return (
        <div className="p-4">
            <form onSubmit={handleFilter} className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <input
                    type="text"
                    placeholder="Search by internship name"
                    className="border p-2 rounded w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by location"
                    className="border p-2 rounded w-full"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Filter
                </button>
            </form>

            {internships.length === 0 ? (
                <div className="text-gray-500 text-center">No Internships Found</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {internships.map((internship) => (
                        <div
                            key={internship.id}
                            className="bg-white shadow rounded-lg p-6 flex flex-col justify-between"
                        >
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
                            <button
                                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                onClick={() => handleApply(internship.id)}
                            >
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
