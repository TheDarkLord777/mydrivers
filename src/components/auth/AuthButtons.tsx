import { FcGoogle } from "react-icons/fc";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";

export default function AuthButtons() {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <div className="flex flex-col space-y-3">
      {user ? (
        <button
          onClick={logout}
          className="flex items-center justify-center bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-200 relative"
        >
          <IoLogOutOutline className="w-5 h-5 mr-2" />
          Chiqish
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white"></div>
        </button>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 relative"
        >
          <FcGoogle className="w-5 h-5 mr-2" />
        </button>
      )}
    </div>
  );
}
