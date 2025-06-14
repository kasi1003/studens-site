import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register({ faculties = {} }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        student_num: "",
        course: "",
        faculty: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [courses, setCourses] = useState([]);
    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="student_num" value="Student Number" />
                    <TextInput
                        id="student_num"
                        name="student_num"
                        value={data.student_num}
                        className="mt-1 block w-full"
                        autoComplete="student_num"
                        onChange={(e) => setData("student_num", e.target.value)}
                        required
                    />
                    <InputError message={errors.student_num} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="faculty" value="Faculty" />
                    <select
                        id="faculty"
                        name="faculty"
                        value={data.faculty}
                        className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => {
                            const selectedFaculty = e.target.value;
                            setData("faculty", selectedFaculty);
                            setCourses(faculties[selectedFaculty] || []);
                            setData("course", ""); // reset course
                        }}
                        required
                    >
                        <option value="">-- Select your faculty --</option>
                        {Object.keys(faculties).map((faculty) => (
                            <option key={faculty} value={faculty}>
                                {faculty}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.faculty} className="mt-2" />
                </div>

                {data.faculty && (
                    <div className="mt-4">
                        <InputLabel htmlFor="course" value="Course" />
                        <select
                            id="course"
                            name="course"
                            value={data.course}
                            className="mt-1 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData("course", e.target.value)}
                            required
                        >
                            <option value="">-- Select your course --</option>
                            {courses.map((course) => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.course} className="mt-2" />
                    </div>
                )}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
