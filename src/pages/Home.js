/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY, NEW_POST_SUBSCRIPTION } from '../util/graphql';

function Home() {
  const [allPost, setAllPost] = useState([])
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const newPost = useSubscription(NEW_POST_SUBSCRIPTION);


  useEffect(() => {
    if (newPost && newPost.data && newPost.data.newPost) {
      setAllPost([newPost.data.newPost, ...allPost])
    }
  }, [newPost])

  useEffect(() => {
    if (data?.getPosts) {
      setAllPost(data?.getPosts)
    }
  }, [data])

  const { user } = useContext(AuthContext);

  return (
    <Grid width={12}>
      <Grid.Row width={12} className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row width={12}>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
      <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Grid.Row>
            <Transition.Group>
              {allPost &&
                allPost.map((post) => (
                  <Grid.Row  key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Row>
                ))}
            </Transition.Group>
          </Grid.Row>
        )}
      </div>
    </Grid>
  );
}

export default Home;
