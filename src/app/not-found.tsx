import Link from "next/link";
import { FaFaceFrown } from "react-icons/fa6";
// import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <main className="grid place-items-center h-screen">
      <div className="text-center">
        <FaFaceFrown className="w-12 h-12 mx-auto text-gray-400" />
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <p>Could not find the requested page.</p>
        <Link
          href="/dashboard"
          className="mt-5 px-6 py-3 rounded-md bg-blue-600 text-white inline-block"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
