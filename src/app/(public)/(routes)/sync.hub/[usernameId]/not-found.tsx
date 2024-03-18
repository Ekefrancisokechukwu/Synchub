import Link from "next/link";
import { FaFaceFrown } from "react-icons/fa6";
// import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaFaceFrown className="text-3xl text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>

     
    </main>
  );
}
