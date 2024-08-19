import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { signup } from '../../api/userApi';


const Signup = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (data) => {
    const response = await signup(data)
    if(response?.status === 200){
      toast.success('Signup successful')
      localStorage.setItem('usertoken', response?.data?.usertoken);
      navigate('/home')
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-white'>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal md:w-full ">
          Nice to meet you! <br className='md:hidden' /> Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register('name', {
                required: 'Name is required',
                validate: value => value.trim() !== ''  || 'Name cannot be empty'
              })}
            />
            {errors.name ? (<div className='text-red-500'>{errors.name.message}</div>) : <br/>}

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
            {errors.email ? (<div className='text-red-500'>{errors.email.message}</div>) : <br/>}

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
                required: 'Password is required',
                // pattern: /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g,
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 charecters'
                }
              })}
            />
            {errors.password ? (<div className='text-red-500'>{errors.password.message}</div>) : <br/>}

          </div>
          <Button type='submit' className="mt-9" fullWidth>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to={'/'} className="font-medium text-gray-900">
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  )
}

export default Signup