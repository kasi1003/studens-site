import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function DisplayInternships({ internships, filters = {} }) {
    const [location, setLocation] = useState(filters.location || "");
    const [name, setName] = useState(filters.name || "");

    // Modal and file upload state
    const [showModal, setShowModal] = useState(false);
    const [selectedInternshipId, setSelectedInternshipId] = useState(null);
    const [formData, setFormData] = useState({
        cv: null,
        cover_letter: null,
        academic_results: null,
        wil_letter: null,
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route("dashboard"), { location, name }, { preserveState: true });
    };

    const openModal = (id) => {
        setSelectedInternshipId(id);
        setShowModal(true);
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const submitApplication = () => {
        const data = new FormData();
        data.append("internship_id", selectedInternshipId);
        Object.entries(formData).forEach(([key, file]) => {
            if (file) data.append(key, file);
        });

        router.post(route("applied-internships.store"), data, {
            onFinish: () => {
                setShowModal(false);
                setFormData({
                    cv: null,
                    cover_letter: null,
                    academic_results: null,
                    wil_letter: null,
                });
            },
        });
    };

    return (
        <div className="p-4">
            {/* Filter Form */}
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

            {/* Internship List */}
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
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Contact Email:</strong> {internship.user?.email || "N/A"}
                                </p>
                                <p className="text-sm text-gray-600 mb-1">
                                    <strong>Contact Number:</strong> {internship.user?.contact_number || "N/A"}
                                </p>
                            </div>
                            <button
                                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                onClick={() => openModal(internship.id)}
                            >
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Upload Application Documents</h2>

                        {/* Upload CV */}
                        <div className="mb-4">
                            <label className="block bg-gray-100 p-2 rounded cursor-pointer text-center hover:bg-gray-200">
                                Upload CV
                                <input type="file" name="cv" onChange={handleFileChange} className="hidden" />
                            </label>
                            {formData.cv && (
                                <p className="text-sm text-gray-600 mt-1 text-center">{formData.cv.name}</p>
                            )}
                        </div>

                        {/* Upload Cover Letter */}
                        <div className="mb-4">
                            <label className="block bg-gray-100 p-2 rounded cursor-pointer text-center hover:bg-gray-200">
                                Upload Cover Letter
                                <input type="file" name="cover_letter" onChange={handleFileChange} className="hidden" />
                            </label>
                            {formData.cover_letter && (
                                <p className="text-sm text-gray-600 mt-1 text-center">{formData.cover_letter.name}</p>
                            )}
                        </div>

                        {/* Upload Academic Results */}
                        <div className="mb-4">
                            <label className="block bg-gray-100 p-2 rounded cursor-pointer text-center hover:bg-gray-200">
                                Upload Academic Record
                                <input type="file" name="academic_results" onChange={handleFileChange} className="hidden" />
                            </label>
                            {formData.academic_results && (
                                <p className="text-sm text-gray-600 mt-1 text-center">{formData.academic_results.name}</p>
                            )}
                        </div>

                        {/* Upload WIL Letter */}
                        <div className="mb-6">
                            <label className="block bg-gray-100 p-2 rounded cursor-pointer text-center hover:bg-gray-200">
                                Upload WIL Letter
                                <input type="file" name="wil_letter" onChange={handleFileChange} className="hidden" />
                            </label>
                            {formData.wil_letter && (
                                <p className="text-sm text-gray-600 mt-1 text-center">{formData.wil_letter.name}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="mr-2 px-4 py-2 rounded bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitApplication}
                                className="px-4 py-2 rounded bg-indigo-600 text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
