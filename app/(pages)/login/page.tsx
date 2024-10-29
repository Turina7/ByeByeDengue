"use client";
import { useRef, useState } from "react";
import styles from "./login.module.css";
import Button from "@/app/components/button/button";
 
const LoginPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string[]>([]);
  const [signup, setSignup] = useState(true);
  
  async function handleSubmit() {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    const newError: string[] = [];

    if (signup && !name) newError.push("name");
    if (!email) newError.push("email");
    if (!password) newError.push("password");
    if (signup && !confirmPassword) newError.push("confirmPassword");

    if (signup) {
      if ( password == confirmPassword) {
        // logica para criar usuario
  
      } else {
        newError.push("mismatchPassword");
      }
    } else {
      // logica de autenticacao de usuario existente
    }
     
    setError(newError);
 
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
          {signup && <><label>Nome</label><div className={styles.formGroup}>
          <input
            type="text"
            placeholder='João da Silva'
            ref={nameRef}
            className={error.includes("name") ? styles.errorInput : ''} />
        </div></>
          }
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
          {signup && <><label>Confirme a senha</label><div className={styles.formGroup}>
          <input
            type="password"
            placeholder='Senha'
            ref={confirmPasswordRef}
            className={error.includes("confirmPassword") || error.includes("mismatchPassword") ?
              styles.errorInput : ''} />
        </div></>
          }
          <div style={{ alignItems: 'center', justifyContent: 'space-between', display: 'flex'}}>
            <Button onClick={() => handleSubmit()}>{signup ? "Cadastrar" : "Login"}</Button>
            <a onClick={() => setSignup(!signup)}
               className={styles.link}> {signup ? "Já tenho uma conta" : "Não tenho uma conta"}</a>
          </div>
          {error.length > 0 && (
          <div>
              {!error.includes("mismatchPassword") ? 
              <p>{`Preencha todos os campos`}</p> :
              <p>{`As senhas devem ser iguais`}</p>
              }
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;