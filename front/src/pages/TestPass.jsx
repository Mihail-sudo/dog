import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Test } from "../components";
import { Link } from "react-router-dom";

import { Navigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";

import axios from '../axios';

export const TestPass = () => {
  const isAuth = useSelector(selectIsAuth)
  const { id } = useParams()

  const [data, setData] = React.useState()
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    axios.get(`/test/${id}`).then(res => {
      setData(res.data)
      console.log(res.data)
      setLoading(false)
    }).catch(err => {
      console.warn(err)
      alert('error when gets the post')
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isAuth) {
    return <Navigate to="/login" />
  }

  if (isLoading) {
    return <Test isLoading={isLoading} isFullPost/>
  }

  return (
    <>
      <Test
      id={data.id}
      title={data.title}
      questions={data.questions}
      isFullPost
      >
      </Test>
      <Link to={`/`}>
        <Button variant="outlined">Отправить ответы</Button>
      </Link>
    </>
  );
};
