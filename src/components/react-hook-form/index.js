import React, { forwardRef, useState } from 'react';
import { useForm, useFrom } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  email: yup.string().required('error.email_required')
    .email('error.email_invalid')
    .test('maxLength', 'error.email_invalid', (val) => val.length <= 128),
  password: yup.string().required('error.password_required'),
}).required();

const Input = forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  console.log(value)
  const handleChange = (e) => {
    console.log('handle change', e.target.value)
    setValue(e.target.value);
  }
  return <input ref={ref} {...props} onChange={handleChange} value={value}></input>
})

const ReactForm = () => {
  const { register, handleSubmit, formState: {isDirty, isValid}} = useForm({mode: 'onBlur', resolver: yupResolver(schema)});

  return (
    <div>
      <form>
        <Input type={'email'} {...register("email")} />
        <Input type={'password'} {...register("password")} />

        <button disabled={!isDirty || !isValid}>Submit</button>
      </form>
    </div>
  )
}

export default ReactForm