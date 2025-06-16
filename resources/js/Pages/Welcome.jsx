import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to InternBridge" />
            <div className="bg-gradient-to-b from-blue-50 to-white text-gray-800 min-h-screen">
                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500 opacity-10"></div>
                    <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-8">
                                <img 
                                    src="/images/logo.png" 
                                    alt="NUST Logo" 
                                    className="h-24"
                                />
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block text-blue-600">InternBridge</span>
                                <span className="block">Your Gateway to Internships</span>
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Connecting NUST students with top companies for internship opportunities.
                            </p>
                            <div className="mt-10 flex justify-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-150"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-150"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition duration-150"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Why use InternBridge?
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Feature 1 */}
                                <div className="pt-6">
                                    <div className="flow-root bg-blue-50 rounded-lg px-6 pb-8 h-full">
                                        <div className="-mt-6">
                                            <div>
                                                <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Curated Internships</h3>
                                            <p className="mt-5 text-base text-gray-500">
                                                Access hand-picked internship opportunities from top companies specifically looking for NUST talent.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="pt-6">
                                    <div className="flow-root bg-blue-50 rounded-lg px-6 pb-8 h-full">
                                        <div className="-mt-6">
                                            <div>
                                                <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Verified Listings</h3>
                                            <p className="mt-5 text-base text-gray-500">
                                                All internships are verified by our team to ensure they meet quality standards and provide real value.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div className="pt-6">
                                    <div className="flow-root bg-blue-50 rounded-lg px-6 pb-8 h-full">
                                        <div className="-mt-6">
                                            <div>
                                                <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Application Tracking</h3>
                                            <p className="mt-5 text-base text-gray-500">
                                                Keep track of all your internship applications in one place and never miss an important deadline.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="bg-blue-600 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center mb-12">
                            <h2 className="text-base text-blue-200 font-semibold tracking-wide uppercase">Success Stories</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                                What NUST students say
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">JK</span>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold">John K.</h4>
                                        <p className="text-gray-600">Computer Science</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    "InternBridge helped me land my dream internship at a leading tech company. The application process was so smooth!"
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">SM</span>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold">Sarah M.</h4>
                                        <p className="text-gray-600">Engineering</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    "I found three perfect internship matches within a week of using InternBridge. It saved me so much time!"
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">TP</span>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold">Thomas P.</h4>
                                        <p className="text-gray-600">Business</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    "The internship I found through InternBridge turned into a full-time job offer after graduation. Highly recommend!"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            <span className="block">Ready to find your perfect internship?</span>
                        </h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            Join hundreds of NUST students who've launched their careers through InternBridge.
                        </p>
                        <div className="mt-8 flex justify-center">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-150"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-150"
                                >
                                    Get Started Now
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-50">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center">
                            <img 
                                src="/images/logo.png" 
                                alt="NUST Logo" 
                                className="h-12"
                            />
                        </div>
                        <p className="mt-8 text-center text-base text-gray-400">
                            &copy; {new Date().getFullYear()} InternBridge - Connecting NUST students with internship opportunities.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}