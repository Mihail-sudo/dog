import React from 'react';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';
import { SideBlock } from "../components/SideBlock";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export const Account = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)

  const [isLoading, setLoading] = React.useState(true)

  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(state => state.auth.data)
  console.log(userData)
  console.log(posts)

  // let userPosts = posts.filter((obj) => u)

  const isPostsLoading = posts.status === 'loading'

  React.useEffect(() => {
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <>
      <h1>Мои курсы</h1>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user ? obj.user : 'deleted account'}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id} //&& obj.user.role === "admin"}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
        <SideBlock title="Профиль">
          <List>
            <React.Fragment>
              <ListItem alignItems="flex-start">
                {isLoading ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <ListItemText
                    primary={`Имя: ${userData.fullName}`}
                    secondary={`
                    Почта: ${userData.email} \n
                    Роль: ${userData.role}`}
                  />
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          </List>
        </SideBlock>
        </Grid>
      </Grid>
    </>
  );
};
