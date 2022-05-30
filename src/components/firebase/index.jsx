import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../shared/users';

const Firebase = () => {
  const [users, setUsers] = useState([]);

  // const onSubmit = (data) => {
  //   console(data)
// }

  useEffect(() => {
    getAllUser().then(data => setUsers(data));
  }, []);

  const renderUser = (user, index) => {
    return (
      <li key={index}>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Email: {user.email}</p>
      </li>
    )
  }

  return (
    <div>
      <h1>Firebase database</h1>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder='name'></input>
        <input {...register('email')} placeholder='email'></input>
        <input {...register('age')} placeholder='age'></input>
        <button>Add </button>
      </form> */}
      <ul>
        {
          users.map((user, index) => renderUser(user, index))
        }
      </ul>
    </div>
  )
}

export default Firebase