import Container from "@mui/material/Container";
import { Routes, Route } from 'react-router-dom'
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, AddTest, TestPass, Account } from "./pages";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import React from "react";

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} /> 

          <Route path='/posts/:id/add-test' element={<AddTest />} />
          <Route path='/test/:id/edit' element={<AddTest />} />
          <Route path='/test/:id' element={<TestPass />} /> 
          <Route path='/account/:id' element={<Account />} /> 
        </Routes>
      </Container>
    </>
  );
}

export default App;
