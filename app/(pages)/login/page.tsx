"use client";
import { useRef, useState } from "react";
import { createUser } from '@/actions/actions';
import styles from "./login.module.css";
import Button from "@/app/components/button/button";
import SuccessDialog from "@/app/components/login/SuccessDialog";
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '@/contexts/AuthContext';
 
const LoginPage = () => {
  const { setAuthenticated, setUser } = useAuth();

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string[]>([]);
  const [signup, setSignup] = useState(false);

  const handleCreatedUser = () => {
    setShowSuccessDialog(false);
    setSignup(false);
  };
  
  async function handleSubmit() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    const newError: string[] = [];
    const formData = new FormData();

    if (!email) newError.push("email"); else formData.append("email", email);
    if (!password) newError.push("password"); else formData.append("password", password);

    if (signup) {
      if (!name) newError.push("name"); else formData.append("name", name);
      if (!confirmPassword) newError.push("confirmPassword");
      if (password !== confirmPassword) newError.push("mismatchPassword");

      if (newError.length == 0) {
        // criar usuario
        formData.append("status", "active");
        formData.append("role", "user");
        setLoading(true);
        try {
          await createUser(formData);
          setMessage("Usuário criado com sucesso");
          setShowSuccessDialog(true);
        } catch (error) {
          setMessage("Erro desconhecido. Tente novamente.");
          if (error instanceof Error) {
            const errorMessage = error.message;
            if (errorMessage.includes("Usuário já cadastrado"))
              setMessage(error.message);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setError(newError);
        return;
      }
    } else {
      if (newError.length == 0) {
        // autenticar usuário
        setLoading(true);
        try {
          const response = await axios.post('/api/auth/login', { email, password });

          const redirectTo = Cookies.get('redirectPath');
          Cookies.remove('redirectPath');

          setAuthenticated(true);
          setUser(response.data.user);

          window.location.href = redirectTo ?? '/';
        } catch (error) {
          console.log(error);
          setMessage("Erro inesperado. Tente novamente.");
          if (error instanceof AxiosError) {
            setMessage(error.response?.data?.message);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setError(newError);
        return;
      }
    }
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
          {signup && (
            <>
              <label>Nome</label>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder='João da Silva'
                  ref={nameRef}
                  className={error.includes("name") ? styles.errorInput : ''}
                />
              </div>
            </>
          )}
          <label>Email</label>
          <div className={styles.formGroup}>
              <input 
                type="email"
                placeholder='Email'
                ref={emailRef}
                className={error.includes("email") ? styles.errorInput : ''}
              />
          </div>
          <label>Senha</label>
          <div className={styles.formGroup}>
              <input 
                type="password" 
                placeholder='Senha'
                ref={passwordRef}
                className={error.includes("password") ? styles.errorInput : ''}
              />
          </div>
          {signup && (
            <>
              <label>Confirme a senha</label>
              <div className={styles.formGroup}>
                <input
                  type="password"
                  placeholder='Senha'
                  ref={confirmPasswordRef}
                  className={error.includes("confirmPassword") || error.includes("mismatchPassword") ?
                    styles.errorInput : ''}
                />
              </div>
            </>
          )}
          {message && (
            <div style={{ color: '#D70000', marginTop: '10px' }}>
              {message}
            </div>
          )}
          <div style={{ alignItems: 'center', justifyContent: 'space-between', display: 'flex'}}>
            <Button onClick={() => handleSubmit()}>
              {signup 
                ? (loading ? 'Cadastrando...' : "Cadastrar") 
                : (loading ? "Entrando..." : "Login")}
            </Button>
            <a 
              onClick={() => setSignup(!signup)}
              className={styles.link}
            > 
              {signup ? "Já tenho uma conta" : "Não tenho uma conta"}
            </a>
          </div>
          {error.length > 0 && (
            <div>
              {!error.includes("mismatchPassword") 
                ? <p>{`Preencha todos os campos`}</p>
                : <p>{`As senhas devem ser iguais`}</p>
              }
            </div>
          )}
      </div>
      <SuccessDialog 
        isOpen={showSuccessDialog}
        onClose={handleCreatedUser}
        message={message}
      />
    </div>
  );
}

export default LoginPage;