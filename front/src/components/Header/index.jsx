import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth);

  const userData = useSelector(state => state.auth.data)

  const onClickLogout = () => {
    if (window.confirm('are you sure you want to logout?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };

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
