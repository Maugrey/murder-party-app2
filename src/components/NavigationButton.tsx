import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonProps {
  to: string;
  children: React.ReactNode;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ to, children }) => {
  const navigate = useNavigate();
  
  return (
    <button 
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition" 
      onClick={() => navigate(to)}
    >
      {children}
    </button>
  );
};

export default NavigationButton;