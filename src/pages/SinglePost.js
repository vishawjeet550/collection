/* eslint-disable no-use-before-define */
// prettier-ignore
/* eslint-disable no-console */
import React, { useContext, useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Form, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import Tooltip from '../util/Tooltip';
import { useHistory } from 'react-router-dom';

function SinglePost(props) {
  const { postId } = props.match.params;
  const { user } = useContext(AuthContext);
  const history = useHistory();
  // TODO: look up docs for useRef
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const { id, heading, image, createdAt, username, likes, comments, likeCount, commentCount } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Image src={image} />
                <Card.Description>{heading}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Tooltip content="Comment on this post">
                  <Button as="div" labelPosition="right" onClick={() => user ? commentInputRef?.current?.focus() : history.push('/login')}>
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </Tooltip>
                {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a Comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim('') === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((userComment) => (
              <Card fluid key={userComment.id}>
                <Card.Content>
                  {user && user.username === userComment.username && (
                    <DeleteButton postId={id} commentId={userComment.id} />
                  )}
                  <Card.Header>{userComment.username}</Card.Header>
                  <Card.Meta>{moment(userComment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{userComment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      heading
      image
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
