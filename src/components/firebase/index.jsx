import React, { useEffect, useState } from 'react';
import { addUser, deleteUser, getAllUser, updateUser } from '../../shared/users';
import { useForm } from 'react-hook-form';
import './style.scss';
import { useRef } from 'react';

const Firebase = () => {
  const [users, setUsers] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const idUser = useRef(null)
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (isUpdate) {
      handelUpdateUser(idUser.current, data);
      setIsUpdate(false);
    } else {
      addUser(data);
    }
    reset({
      name: '',
      email: '',
      age: ''
    });
  }

  const handleDeleteUser = (id) => {
    deleteUser(id);
  }

  const handelUpdateUser = (id, data) => {
    updateUser(id, data);
  }

  const handleActionUpdate = (user) => {
    reset(user);
    idUser.current = user.id;
    setIsUpdate(true);
  }

  useEffect(() => {
    getAllUser().then(data => setUsers(data));
  }, []);

  const renderUser = (user, index) => {
    return (
      <li key={index} className='user-item'>
        <p className='user- name'>id: {user.id}</p>
        <p className='user- name'>Name: {user.name}</p>
        <p className='user-email'>Email: {user.email}</p>
        <p className='user-age'>Age: {user.age}</p>
        <div className="user-action">
          <button className="delete-user" onClick={() => handleDeleteUser(user.id)}>
            Delete
          </button>

          <button className="delete-user" onClick={() => handleActionUpdate(user)}>
            Update
          </button>
        </div>
      </li>
    )
  }

  return (
    <div className='firebase'>
      <h1>Firebase database CRUD</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <input {...register('name')} placeholder='name'></input>
        <input {...register('email')} placeholder='email'></input>
        <input {...register('age')} placeholder='age'></input>
        <button>{isUpdate ? 'Save' : 'Add'} </button>
      </form>
      <ul className='list-user'>
        {
          users.map((user, index) => renderUser(user, index))
        }
      </ul>
    </div>
  )
}

export default Firebase;
