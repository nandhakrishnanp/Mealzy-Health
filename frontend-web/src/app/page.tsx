'use client';

import Link from "next/link";

// interface PageProps {}

const Page = ({}) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">
      <h1 className="font-extrabold text-3xl sm:text-6xl text-center text-gray-800 dark:text-white tracking-tight drop-shadow-lg">
        Mealzy Health
      </h1>
      <p className="mt-6 text-md max-md:m-6 sm:text-xl text-center text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
        The Ultimate <span className="font-semibold text-purple-600 dark:text-purple-400">AI-Powered</span> Nutrition & Wellness App. 
        Track food intake, get smarter suggestions, and talk to your AI Nutritionist.
      </p>
      <Link
        href="/login"
        className="mt-10 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition duration-200 shadow-md hover:shadow-lg"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Page;
