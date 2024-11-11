"use client";

import { useRouter } from "next/navigation";
import Button from "../button/button";
import { useAuth } from '@/contexts/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';
import buttonStyles from '../button/button.module.css';

interface AuthButtonProps {
  className?: string;
}

const AuthButton = ({ className }: AuthButtonProps) => {
  const router = useRouter();
  const { isAuthenticated, setAuthenticated } = useAuth();

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      try {
        await axios.post('/api/auth/logout');
        Cookies.remove('token');
        setAuthenticated(false);
        router.push('/login');
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    } else {
      router.push('/login');
    }
  };

  const combinedClassName = `${buttonStyles.btn} ${className || ''}`.trim();

  return (
    <Button 
      onClick={isAuthenticated !== null ? handleAuthAction : undefined}
      className={combinedClassName}
      style={{ 
        position: 'absolute',
        right: '10px',
      }}
    >
      {isAuthenticated === null ? 'Carregando...' : 
       isAuthenticated ? 'Sair' : 'Entrar'}
    </Button>
  );
};

export default AuthButton;