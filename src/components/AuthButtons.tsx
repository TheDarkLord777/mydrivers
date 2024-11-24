import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc'; // Google ikonkasi uchun
import { IoLogOutOutline } from 'react-icons/io5'; // Logout ikonkasi uchun

export default function AuthButtons() {
  return (
    <div className="flex flex-col space-y-3">
      {/* Google bilan Kirish tugmasi */}
      <Link href="/api/auth/login">
        <p className="flex items-center justify-center bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
          <FcGoogle className="w-5 h-5 mr-2" />
          Google bilan Kirish
        </p>
      </Link>

      {/* Chiqish tugmasi */}
      <Link href="/">
        <p className="flex items-center justify-center bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-200">
          <IoLogOutOutline className="w-5 h-5 mr-2" />
          Chiqish
        </p>
      </Link>
    </div>
  );
}
