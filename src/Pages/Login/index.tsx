import React, { useState, useEffect } from 'react';
import { Grid, Paper, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";

import Cookies from 'js-cookie';

import './styles.css';

interface User {
  email: string;
  password: string;
}

interface LoginProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);
    const url = 'https://apimocha.com/elanto/users';
    try {
      const response = await fetch(url);
      const data = await response.json();
      const parsedUsers = data.ctRoot as User[];
      const foundUser = parsedUsers.find(user => user.email === email && user.password === password);
      if (!foundUser) {
        setIsLoggedIn(false);
        toast.error("Email ou senha invalidos!")
      } else {
        setIsLoggedIn(true);
        Cookies.set('authToken', 'myAuthToken');
        navigate('/dashboard');
        toast.success('Login bem sucedido!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    const authToken = Cookies.get('authToken'); // recupera o token de autenticação do cookie
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Grid className='gridLogin'>
      <Paper elevation={15} className="paperStyle">
        <h1 className="titleLogin">BEM VINDO</h1>
        <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)} fullWidth required margin='normal' style={{ marginBottom: '20px' }} />
        <TextField label='Senha' type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} fullWidth required margin='normal' style={{ marginBottom: '20px' }} />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={handleShowPassword}
              name="checkedB"
              color="primary"
            />
          }
          label='Ver senha'
          style={{ marginBottom: '20px' }}
        />
        <Button type='submit' color='primary' variant='contained' fullWidth onClick={handleLogin} disabled={isLoading}>{isLoading ? (
    <ClipLoader
      size={20}
      color={"#303F9F;"}
      loading={isLoading}
    />
  ) : (
    "Entrar"
  )}
        </Button>

      </Paper>
    </Grid>
  );
}
