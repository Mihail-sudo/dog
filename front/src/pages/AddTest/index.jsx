import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import 'easymde/dist/easymde.min.css';
import styles from './AddTest.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

export const AddTest = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isAuth = useSelector(selectIsAuth)
  const [, setIsLoading] = React.useState(false);

  const [title, setTitle] = React.useState('')
  const [question, setQuestion] = React.useState('')
  const [questions, setQuestions] = React.useState([]);

  const isEditing = false //Boolean(id)

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const testFields = {
        title,
        questions: questions ? questions : []
      }

      const { data } = isEditing
        ? await axios.patch(`/test/${id}`, testFields)
        : await axios.post(`/test`, testFields)

      if (!isEditing) {
        const postData = await axios.get(`/posts/${id}`)

        const postFields = {
          title: postData.data.title,
          imageUrl: postData.data.imageUrl,
          tags: postData.data.tags.join(','),
          text: postData.data.text,
          testUrl: data._id
        }
        
        await axios.patch(`/posts/${id}`, postFields)
      }

      navigate(`/posts/${id}`)
    } catch (err) {
      console.warn(err)
      return alert('errora when upload file')
    }
  }

  React.useEffect(() => {
    if (isEditing) {
      axios
      .get(`/test/${id}`)
      .then(({ data }) => {
        setTitle(data.title)
        setQuestion(data.questions)
      }).catch(err => {
        console.log(err)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/'/>
  }


  const addQuestion = () => {
    setQuestions([question, ...questions])
    setQuestion("")
  }

  return (
    <Paper style={{ padding: 30 }}>
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Название теста"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      <TextField
        // classes={{ root: styles.title }}
        variant="standard"
        placeholder="enter a question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        fullWidth
      />
      <ol>
        {questions.map(question => (
          <li>{question}</li>
        ))}
      </ol>
      <br />
      <br />
      {/* //// */}
      <Button onClick={addQuestion} variant="outlined" size="large">
        Добавить вопрос
      </Button>
      {/* //// */}
      <br />
      <br />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing? "Сохранить изменения" : "Создать тест"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};


// В каком из нижеперечисленных молочных напитков меньше всего молока?#Флэт уайт#Кортадо#Эсперессо-макиато#Капучино#3
// Какая из стран является родиной кофе?#Бразилия#Эфиопия#Конго#Йемен#2
// Какой из способов приготовления кофе самый быстрый?#Комекс#Эспрессо#Латте#Сифон#2
// Какая страна является лидером по потреблению кофе на душу населения?#Италия#США#Россия#Финляндия#4
// Какой из перечисленных приспособлений для заваривания является самым современным?#Френч-пресс#Hario V60#Турка#Aeropress#4
// Какая страна является лидером по количеству производимого кофе?#Бразилия#Эфиопия#Колумбия#Въетнам#1
// Чем отличается кофе для эспрессо от кофе для фильтровых способов заваривания?#Разная обработка зерна#Разное время сбора#Разная обжарка#Ничем#3
