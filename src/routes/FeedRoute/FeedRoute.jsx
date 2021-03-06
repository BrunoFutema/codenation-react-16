import React, { useState, useEffect } from 'react';

import Stories from '../../containers/Stories';
import Loading from '../../components/Loading';

import Posts from '../../containers/Posts';

import './FeedRoute.scss';

import {baseURL} from '../../constants';

const FeedRoute = () => {
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [usersFetched, setUsersFetched] = useState(0);

  const getUserPostById = postUserId => users.find(user => postUserId === user.id);

  useEffect(() => {
    fetch(`${baseURL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    if (usersFetched === users.length) return;

    fetch(`${baseURL}/users/${users[usersFetched].id}/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts([...posts, ...data]);
        setUsersFetched(usersFetched + 1);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, usersFetched]);

  useEffect(() => {
    fetch(`${baseURL}/stories`)
      .then(res => res.json())
      .then(data => setStories(data));
  }, [users]);

  return (
    <div data-testid="feed-route">
      {
        (users.length > 0 && stories.length > 0) &&
        <Stories stories={stories} getUserHandler={getUserPostById}/>
      }
      {
        users.length !== usersFetched
        ? <Loading/>
        : <Posts posts={posts} getUserHandler={getUserPostById}/>
      }
    </div>
  );
};

export default FeedRoute;
