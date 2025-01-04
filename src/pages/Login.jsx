'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast, Toaster } from 'sonner';

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  user_type: z.enum(["student", "council", "faculty"], {
    required_error: "Please select a user type.",
  }),
})

const Login = () => {
  const navigate = useNavigate();
  const[token, setToken]=useState('')
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      user_type: "",
    },
  })

  function onSubmit(values) {
    console.log('Login attempted with:',{email:values.email, password: values.password});
    toast.promise(
      fetch('https://student-council-backend.onrender.com/api/users/login/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: values.email, password: values.password})
      }).then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json()
          console.log(errorData);
          throw new Error(errorData.message || 'Login failed')
        }
        return response.json()
      }),
      {
        loading: 'Loading...',
        success: (data) => {
          console.log('Login successful:', data)
          console.log(data.tokens.access);
          console.log(data.tokens.refresh);
          console.log(JSON.stringify(data.users));
          setToken(data.tokens);
          const accesstoken=localStorage.setItem('access-token',data.tokens.access);
          const refreshtoken=localStorage.setItem('refresh-token', data.tokens.refresh);
          const user=localStorage.setItem('user', data.users);
          if(values.user_type='student'){
            navigate('/events/sports');
          }else if (values.user_type='faculty') {
            navigate('/');
          }else{
            navigate('/');
          }
          return `${data.message}`
        },
        error: (err) => {
          console.error('login error:', err)
          return `Login failed: ${err.message}`
        }
      }
    )
  }

  

  

  return (
    <>
      <img src='/login.jpg' className='fixed h-full w-full object-cover z-0' alt="Background" />
      <div className="min-h-screen rounded flex items-center justify-center bg-amber-800 bg-opacity-40 relative z-10 bg-cover bg-center bg-blend-overlay">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded w-full max-w-lg relative backdrop-blur-md border-amber-900 border-2 mx-2"
        >
          <div className='relative z-20'>
            <h2 className="text-4xl font-bold mb-6 text-center text-[#291b11] font-serif">Aurora 2025</h2>
            <h3 className="text-2xl font-semibold mb-6 text-center text-[#442914]">Athlete's Portal</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} className="border-[#d2b48c] focus:ring-2 focus:ring-[#8b4513]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} className="border-[#d2b48c] focus:ring-2 focus:ring-[#8b4513]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">User Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-[#d2b48c] focus:ring-2 focus:ring-[#8b4513]">
                            <SelectValue placeholder="Select user type"  />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[url('/event-background.jpg')] bg-center">
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="council">Council</SelectItem>
                          <SelectItem value="faculty">Faculty</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full btn bg-[#8b4513] text-white py-2 px-4 rounded-md hover:bg-[#a0522d] transition-colors duration-300 font-semibold text-lg">
                  Log In
                </Button>
              </form>
            </Form>
            <div className="mt-6 text-center">
              <Link to="/forgot-password" className="text-[#120a05] hover:underline">Forgot password?</Link>
            </div>
            <div className="mt-8 border-t border-[#d2b48c] pt-6">
              <p className="text-center text-white">New to Renaissance Sports?</p>
              <Button
                className="mt-2 btn w-full bg-[#4a3728] text-white py-2 px-4 rounded-md hover:bg-[#5a4738] transition-colors duration-300 font-semibold"
                onClick={() => navigate('/auth/register')}
              >
                Create an Account
              </Button>
            </div>
          </div>
        </motion.div>
        <Toaster position='top-right'/>
      </div>
    </>
  );
};

export default Login;

