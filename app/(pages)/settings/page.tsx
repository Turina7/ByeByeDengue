"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./settings.module.css";
import userIcon from "../../images/user-icon.jpg";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { updateUser, getUserPic } from "@/actions/actions";

const UserSettings: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState<{
    type: 'success' | 'error',
    message: string
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);

  useEffect(() => {
    async function loadUserPic() {
      try {
        if (user) {
          const response = await getUserPic(user.id);
          setProfilePic(response as string);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      }
    }

    loadUserPic();
  }, [user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProfilePic(e.target.files[0]);
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !isAuthenticated) {
      console.error("Usuário não autenticado");
      router.push('/login');
      return;
    }

    if (!name?.trim() && !password.trim() && !newProfilePic) {
      setResponseMessage({
        type: 'error',
        message: 'Por favor, preencha algum dado antes de enviar.'
      });
      return;
    }

    try {
      setLoading(true);
      setResponseMessage(null);
      
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      formData.append("imageFile", newProfilePic || '');
      formData.append("userId", user.id.toString());

      await updateUser(formData);
      setResponseMessage({
        type: 'success',
        message: 'Alterações concluídas'
      });
    } catch (error) {
      console.error("Error updating user:", error);
      setResponseMessage({
        type: 'error',
        message: 'Erro ao salvar alterações. Por favor, tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Configurações</h2>
      
      <div className={styles.profilePicSection}>
        <Image
          src={profilePic || userIcon}
          alt="Foto de Perfil"
          width={120}
          height={120}
          className={styles.profilePic}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className={styles.fileInput}
        />
      </div>

      <form onSubmit={handleSaveSettings} className={styles.form}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          placeholder={user?.name}
          value={name}
          onChange={handleNameChange}
          className={styles.input}
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          placeholder="******"
          value={password}
          onChange={handlePasswordChange}
          className={styles.input}
        />

        {responseMessage && (
          <div className={`${styles.responseMessage} ${styles[responseMessage.type]}`}>
            {responseMessage.message}
          </div>
        )}

        <button type="submit" className={styles.saveButton}>
          {loading ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
