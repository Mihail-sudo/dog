import React from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth);

  const userData = useSelector(state => state.auth.data)
  console.log(userData)

  const onClickLogout = () => {
    if (window.confirm('are you sure you want to logout?')) {
      dispatch(logout())
      navigate('/')
      window.localStorage.removeItem('token')
    }
  };

  const account = () => {
    navigate(`/account/${userData._id}`)
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Coffee network</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                { userData.role === "admin" ? (
                  <Link to="/add-post">
                    <Button variant="contained">Создать курс</Button>
                  </Link>
                ) : ('')
                }
                <Button onClick={account} variant="contained">
                  Профиль
                </Button>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
