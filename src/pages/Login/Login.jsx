import React from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { login } from '../../api/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (data) => {
    const response = await login(data)
    if(response?.status === 200){
      toast.success('Signup successful')
      localStorage.setItem('usertoken', response?.data?.usertoken);
      const userData = response?.data?.userData;
        dispatch(
          setUser({
            user: userData,
          })
        );
      navigate('/home')
    }
  }
  return (
    <div className='flex justify-center items-center h-screen bg-white'>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('email', {
                required: 'Email is required',
                validate: (value) => {
                  if (!value.includes('@')) {
                    return 'Email must include @'
                  }
                  return true
                }
              })}
            />
            {errors.email ? (<div className='text-red-500'>{errors.email.message}</div>) : <br />}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('password', {
                required: 'Enter your password',
                validate: value => value.trim() !== '' || 'Password cannot be empty'
              })}
            />
            {errors.password ? (<div className='text-red-500'>{errors.password.message}</div>) : <br />}
          </div>
          <Button type='submit' className="mt-9" fullWidth>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Create your account{" "}
            <Link to={'/signup'} className="font-medium text-gray-900">
              Signup
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  )
}

export default Login