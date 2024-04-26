import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import clsx from 'clsx';
import styles from "../components/Post/Post.module.scss"

import { Navigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Post } from "../components/Post";

import axios from '../axios';

export const TestPass = () => {
  const isAuth = useSelector(selectIsAuth)
  const { id } = useParams()
  const [isLoading, setLoading] = React.useState(true)

  const [data, setData] = React.useState()

  const { handleSubmit, formState: {errors, isValid} } = useForm({ mode: 'onChange' })

  const isFullPost = true


  React.useEffect(() => {
    axios.get(`/test/${id}`).then(res => {
      console.log(id, res.data)
      setData(res.data)
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
    return <Post isLoading={isLoading} isFullPost/>
  }

  function parseParams(params) {
    const keys = Object.keys(params)
    let options = ''
  
    keys.forEach((key) => {
      const isParamTypeObject = typeof params[key] === 'object'
      const isParamTypeArray = isParamTypeObject && params[key].length >= 0
  
      if (!isParamTypeObject) {
        options += `${key}=${params[key]}&`
      }
  
      if (isParamTypeObject && isParamTypeArray) {
        params[key].forEach((element) => {
          options += `${key}=${element}&`
        })
      }
    })
  
    return options ? options.slice(0, -1) : options
  }

  const onSubmit = async () => {
    const answers = Array(data.questions.length).fill(-1)
    const radios = document.querySelectorAll('input[type="radio"]');
    for (var radio of radios) {
      if (radio.checked) {
        answers[Number(radio.name.split('_')[1])] = radio.value
      }
    }
    if (answers.includes(-1)) { 
      window.confirm('Необходимо ответить на все вопросы')
    } else {
      const fields = {id, answers}
      const result = await axios.get('/check', { 
        params: fields, 
        paramsSerializer: (fields) => parseParams(fields)})
      window.confirm(`Вы набрали ${result.data.result} из ${result.data.max} баллов`)
    }
  }

  return (
    <>
      <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? data.title : <Link to={`/posts/${data.id}`}>{data.title}</Link>}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            {data.questions.map((elem, questIdx) => (
              <div>
                <div>
                  <h3>{elem.title}</h3>

                  {elem.questions.map((elem, index) => (
                    <div className="radio">
                    <label>
                      <input type="radio" value={index} name={`question_${questIdx}`}/>
                      {elem}
                    </label>
                  </div>
                  ))}
                </div>
                <br />
              </div>
            ))}
            <Button type='submit' variant="outlined">
              Отправить ответы
            </Button>
          </form>
        </div>
      </div>
      
    </div>


      <br />
      <br />
    </>
  );
};
