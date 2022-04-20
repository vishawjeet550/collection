/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import '../style/pages/Register.scss'

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // success
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    // failure
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} noValidate className={`main_forrm ${loading ? 'loading' : ''}`}>
        <h1 className='main_heading' onClick={() => { props.history.push('/') }}>Register with Huddle</h1>
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
            className='main_form_input'
            name="username"
            value={values.username}
            onChange={onChange}
          />
          <div className='input_label'>Email</div>
          <input
            type="email"
            label="Email"
            placeholder="Email..."
            className='main_form_input'
            name="email"
            value={values.email}
            onChange={onChange}
          />
          <div className='input_label'>Password</div>
          <input
            type="password"
            label="Password"
            placeholder="Password..."
            className='main_form_input'
            name="password"
            value={values.password}
            onChange={onChange}
          />
          <div className='input_label'>Confirm Password</div>
          <input
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password..."
            className='main_form_input'
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={onChange}
          />
          <Button type="submit" primary>
            Register
          </Button>
        </div>
        <div className='register_component'>
          Already have an Account? <span onClick={() => { props.history.push('/login') }}>Sign in here.</span>
        </div>
      </form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(
      registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
