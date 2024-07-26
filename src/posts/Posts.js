import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from './postsSlice';

const Posts = () => {
  const { list, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts({ userId: 1 }));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading.....</div>;
  }

  return (
    <div>
      <ul>
        {list?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
