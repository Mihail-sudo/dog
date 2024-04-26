import React from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import { Link } from 'react-router-dom'
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from '../../redux/slices/posts';

export const Test = ({
  id,
  title,
  questions,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('are u shure to delete post?'))
      dispatch(fetchRemovePost(id))
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <form action="">

            {questions.map((elem) => (
                <ol>
                  {elem.title}
                  {elem.questions.map((elem) => (
                    <li>{elem}</li>
                  ))}
                </ol>
            ))}
          
          </form>
        </div>
      </div>
    </div>
  );
};
