import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

import Button from "@mui/material/Button";
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';
import { useNavigate } from "react-router-dom";

export const FullPost = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(state => state.auth.data)

  const [data, setData] = React.useState()
  const [isLoading, setLoading] = React.useState(true)
  const { id } = useParams()

  React.useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data)
      setLoading(false)
    }).catch(err => {
      console.warn(err)
      alert('error when gets the post')
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addCourse = async () => {
    if (!isAuth) {
      window.confirm("sign up to complite the course")
      navigate('/login')
    }
    await axios.post(`/addCourse/${id}`)
    window.confirm("Вы успешно записаны!")
    window.location.reload();
  }

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text}/>

        { isAuth && data.testUrl ? (
          <Link to={`/test/${data.testUrl}`}>
            <Button variant="outlined">Пройти тест</Button>
          </Link>
          ) : ('')
        }
        { isAuth && userData.role === 'admin' ? (
          data.testUrl ? (            
            <Link to={`/test/${data.testUrl}/edit`}>
              <Button variant="outlined">Изменить тест</Button>
            </Link>)
            : (
            <Link to={`/posts/${data._id}/add-test`}>
              <Button variant="outlined">Создать тест</Button>
            </Link>
            )
          ) : ('')
        }

      </Post>
      {console.log(userData)}
      { userData.courses.includes(id) ? (
        <Button  variant="outlined">Вы записаны на курс</Button>
      ) : <Button onClick={addCourse} variant="outlined">Записаться на курс</Button>
      }
      <br />
      <br />
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
      <Index />
      </CommentsBlock>
    </>
  );
};
