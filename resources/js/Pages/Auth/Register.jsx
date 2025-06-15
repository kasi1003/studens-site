import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        student_num: "",
        name: "",
        email: "",
        faculty: "",
        course: "",
        specialization: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);
    // Define available options
    const faculties = [
        { value: "", label: "Select Faculty", disabled: true },
        { value: "Faculty of Computing and Informatics", label: "Faculty of Computing and Informatics" }
    ];

    const coursesByFaculty = {
        "Faculty of Computing and Informatics": [
            { value: "", label: "Select Course", disabled: true },
            { value: "Computer Science", label: "Computer Science" },
            { value: "Cyber Security", label: "Cyber Security" },
            { value: "Informatics", label: "Informatics" }
        ]
    };

    const specializationsByCourse = {
        "Computer Science": [
            { value: "", label: "Select Specialization", disabled: true },
            { value: "Software Development", label: "Software Development" },
            { value: "Artificial Intelligence", label: "Artificial Intelligence" },
            { value: "Data Science", label: "Data Science" }
        ],
        "Cyber Security": [
            { value: "", label: "Select Specialization", disabled: true },
            { value: "Network Security", label: "Network Security" },
            { value: "Digital Forensics", label: "Digital Forensics" },
            { value: "Ethical Hacking", label: "Ethical Hacking" }
        ],
        "Informatics": [
            { value: "", label: "Select Specialization", disabled: true },
            { value: "Information Systems", label: "Information Systems" },
            { value: "Business Informatics", label: "Business Informatics" },
            { value: "Health Informatics", label: "Health Informatics" }
        ]
    };

    // Get current options based on selections
    const currentCourses = data.faculty ? coursesByFaculty[data.faculty] || [] : [];
    const currentSpecializations = data.course ? specializationsByCourse[data.course] || [] : [];

const handleFacultyChange = (e) => {
        setData({
            ...data,
            faculty: e.target.value,
            course: "", // Reset course when faculty changes
            specialization: "" // Reset specialization when faculty changes
        });
    };

    const handleCourseChange = (e) => {
        setData({
            ...data,
            course: e.target.value,
            specialization: "" // Reset specialization when course changes
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit} noValidate>
                {/* Student Number */}
                <div className="mt-4">
                    <InputLabel htmlFor="student_num" value="Student Number" />
                    <TextInput
                        id="student_num"
                        name="student_num"
                        value={data.student_num}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("student_num", e.target.value)}
                        required
                        title="7-10 digits only"
                    />
                    <InputError message={errors.student_num} className="mt-2" />
                </div>

                {/* Name */}
                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Full Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        title="2-4 names with 2+ characters each"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
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
                        title="Must be @gmail.com, @nust.na or @outlook.com"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Faculty Dropdown */}
                <div className="mt-4">
                    <InputLabel htmlFor="faculty" value="Faculty" />
                    <select
                        id="faculty"
                        name="faculty"
                        value={data.faculty}
                        onChange={handleFacultyChange}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        required
                    >
                        {faculties.map((faculty) => (
                            <option 
                                key={faculty.value} 
                                value={faculty.value}
                                disabled={faculty.disabled}
                            >
                                {faculty.label}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.faculty} className="mt-2" />
                </div>

                {/* Course Dropdown */}
                <div className="mt-4">
                    <InputLabel htmlFor="course" value="Course" />
                    <select
                        id="course"
                        name="course"
                        value={data.course}
                        onChange={handleCourseChange}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        required
                        disabled={!data.faculty}
                    >
                        {currentCourses.map((course) => (
                            <option 
                                key={course.value} 
                                value={course.value}
                                disabled={course.disabled}
                            >
                                {course.label}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.course} className="mt-2" />
                </div>

                {/* Specialization Dropdown */}
                <div className="mt-4">
                    <InputLabel htmlFor="specialization" value="Specialization" />
                    <select
                        id="specialization"
                        name="specialization"
                        value={data.specialization}
                        onChange={(e) => setData("specialization", e.target.value)}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        required
                        disabled={!data.course}
                    >
                        {currentSpecializations.map((specialization) => (
                            <option 
                                key={specialization.value} 
                                value={specialization.value}
                                disabled={specialization.disabled}
                            >
                                {specialization.label}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.specialization} className="mt-2" />
                </div>

                {/* Password */}
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
                        title="8+ chars with uppercase, lowercase, number and special character"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password_confirmation", e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900"
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