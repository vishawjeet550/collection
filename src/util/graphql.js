import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      heading
      image
      createdAt
      username
      likeCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const NEW_POST_SUBSCRIPTION = gql`
subscription newPost {
  newPost {
    id
    heading
    image
    createdAt
    username
    likes {
      id
      username
      createdAt
    }
    likeCount
    comments {
      id
      body
      username
      createdAt
    }
    commentCount
  }
}
`;
