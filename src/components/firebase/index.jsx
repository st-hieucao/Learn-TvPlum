import React, { useEffect, useState } from 'react';
import { addUser, getAllUser } from '../../shared/users';
import { useForm } from 'react-hook-form';
import style from './style.module.scss';
import db from "../../service/firebase/index";
import { off, onChildAdded, onChildChanged, onChildRemoved, push, query, startAt } from 'firebase/database';

const Firebase = () => {
  const [users, setUsers] = useState([]);
  const { register, handleSubmit} = useForm();

  const onSubmit = (data) => {
    console.log(data)
    addUser(data)
  }

  const childAddedCallback = async (data) => {
    console.log(data)
  };

  useEffect(() => {
    getAllUser().then(data => setUsers(data));
  }, []);

  useEffect(() => {
    console.log(db)
    // db.child('invites').on('child_added', snapshot => {
    //   console.log(snapshot)
    // })
    onChildAdded(null,
      childAddedCallback
    );
  }, [])

  const renderUser = (user, index) => {
    return (
      <li key={index}>
        <span>{index + 1}</span>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Email: {user.email}</p>
      </li>
    )
  }

  return (
    <div className={style.firebase}>
      <h1>Firebase database</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <input {...register('name')} placeholder='name'></input>
        <input {...register('email')} placeholder='email'></input>
        <input {...register('age')} placeholder='age'></input>
        <button>Add </button>
      </form>
      <ul>
        {
          users.map((user, index) => renderUser(user, index))
        }
      </ul>
    </div>
  )
}

export default Firebase;
