/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import '../style/pages/Login.scss'

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // success
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push('/home');
    },
    // failure
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className={`main_forrm ${loading ? 'loading' : ''}`}>
        <h1 className='main_heading' onClick={() => { props.history.push('/') }}>Sign in to Huddle</h1>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
        <div className='input_container'>
          <div className='input_label'>Username</div>
          <input
            type="text"
            label="Username"
            placeholder="Username..."
            name="username"
            className='main_form_input'
            autoComplete='false'
            value={values.username}
            onChange={onChange}
          />
          <div className='input_label'>Password</div>
          <input
            type="password"
            label="Password"
            placeholder="Password..."
            name="password"
            autoComplete='false'
            className='main_form_input'
            value={values.password}
            onChange={onChange}
          />
          <button type="submit" className='button'>
            Sign in
          </button>
        </div>
        <div className='register_component'>
          New to Huddle? <span onClick={() => { props.history.push('/register') }}>Create an Account.</span>
        </div>
      </form>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
