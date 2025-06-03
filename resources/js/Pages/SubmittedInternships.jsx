import React from "react";
import SubmittedInternship from "@/Components/SubmittedInternship";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";



export default function SubmittedInternships({ appliedInternships }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    My Applications
                </h2>
            }
        >
            <Head title="My Applications" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {appliedInternships.length === 0 ? (
                                <div className="col-span-full text-center text-gray-500">
                                    You have not applied for any internships
                                    yet.
                                </div>
                            ) : (
                                appliedInternships.map((applied) => (
                                    <SubmittedInternship
                                        key={applied.id}
                                        applied={applied}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
