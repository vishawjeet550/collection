/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {
  const [errMsg, setErrMsg] = useState('')
  const { values, onChange, onSubmit, imgChangeHandler } = useForm(createPostCallback, {
    heading: '',
    image: '',
  });
  const [file, setFile] = useState({})
  const [mutate] = useMutation(UPLOAD_IMAGE);

  const onChangeFile = ({ target: { validity, files: [file] } }) => {
    if (validity.valid) {
      setFile(file)
    }
  }

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
    },
    onError(err) {
      console.log('=============>', err)
      return err;
    },
  });

  function createPostCallback() {
    if (values.image && values.heading) {
      mutate({ variables: { file } })
        .then(res => {
          imgChangeHandler(res.data.singleUpload.Location)
          createPost();
        }).catch(err => {
          setErrMsg('Upload failed, please try again or choose another image')
        })
    } else {
      setErrMsg('All field is Required')
    }
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a Post</h2>
        <Form.Field>
          <Form.Input placeholder="Post a new caption!!!" name="heading" onChange={onChange} value={values.heading} error={!!error} />
          <input type='file' placeholder="Add Image" name="file" onChange={onChangeFile} />
          <Button style={{ marginTop: '20px' }} type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {(error || errMsg) && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            {error && <li>{error.graphQLErrors[0].message}</li>}
            {errMsg && <li>{errMsg}</li>}
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($heading: String!, $image: String!) {
    createPost(heading: $heading, image: $image) {
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

const UPLOAD_IMAGE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      ETag
      Location
      Key
      Bucket
    }
  }
`

export default PostForm;
