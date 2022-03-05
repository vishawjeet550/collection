import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Icon, Label } from 'semantic-ui-react';
import Tooltip from '../util/Tooltip';

// eslint-disable-next-line react/prop-types
function LikeButton({ user, post: { id, likeCount, likes } }) {
  const history =  useHistory()
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  // eslint-disable-next-line no-use-before-define
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError: (err) => {
      history.push('/login')
    }
  });

  // eslint-disable-next-line no-nested-ternary
  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <Tooltip content={liked ? 'Unlike' : 'Like'}>{likeButton}</Tooltip>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
