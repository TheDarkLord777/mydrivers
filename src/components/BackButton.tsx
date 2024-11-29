import { useRouter } from 'next/router';
import React from 'react';
import { FiLogOut } from 'react-icons/fi'; // Importing the logout icon from react-icons

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center bg-red-500 text-white px-4 py-2 rounded relative group overflow-hidden transition-all duration-600"
    >
      <FiLogOut className="mr-2" />
      <span className="ml-2 whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-600">
        Orqaga
      </span>
    </button>
  );
};

export default BackButton;