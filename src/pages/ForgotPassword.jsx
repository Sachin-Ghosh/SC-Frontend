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
import { toast, Toaster } from 'sonner';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const formSchema = z.object({
  email: z.string()
    .email({
      message: "Please enter a valid email address.",
    })
    .refine((email) => email.endsWith("@universal.edu.in"), {
      message: "Please use your Universal Education email address (@universal.edu.in)",
    }),
})

const resetSchema = z.object({
  // email: z.string()
  //   .email({
  //     message: "Please enter a valid email address.",
  //   })
  //   .refine((email) => email.endsWith("@universal.edu.in"), {
  //     message: "Please use your Universal Education email address (@universal.edu.in)",
  //   }),
  token: z.string().min(1, {
    message: "Please enter a valid token",
  }),
  new_password: z.string().min(8, {
    message: "Please enter a 8-character password",
  }),
})

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [email, setEmail]=useState('')

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      token: "",
      new_password: "",
    },
  })

  function onSubmit(values) {
    console.log('Password reset requested for:', { email: values.email });
    setEmail(values.email)
    toast.promise(
      fetch(`${import.meta.env.VITE_API_URL}/api/users/request-password-reset/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: values.email })
      }).then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Password reset request failed');
        }
        return data;
      }),
      {
        loading: 'Sending reset email...',
        success: (data) => {
          console.log('Password reset email sent:', data);
          setMessageSent(true);
          return `${data.message}`;
        },
        error: (err) => {
          console.error('Password reset request error:', err);
          return `${err.message}`;
        }
      }
    );
  }

  const handlePasswordReset = (values) => {
    // const  email=form.getValues('email');
    console.log(email)
    console.log('Password reset attempted with:', { email: email, token: values.token, new_password: values.new_password });
    toast.promise(
      fetch(`${import.meta.env.VITE_API_URL}/api/users/reset-password/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, token: values.token, new_password: values.new_password })
      }).then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Password reset failed');
        }
        return data;
      }),
      {
        loading: 'Resetting password...',
        success: (data) => {
          console.log('Password reset successful', data);
          navigate('/auth/login');
          return `${data.message}`;
        },
        error: (err) => {
          console.error('Password reset error:', err);
          return `${err.message}`;
        }
      }
    );
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
            
            {!messageSent ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} className="border-[#d2b48c] focus:ring-2 focus:ring-[#8b4513]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full btn bg-[#8b4513] text-white py-2 px-4 rounded-md hover:bg-[#a0522d] transition-colors duration-300 font-semibold text-lg">
                    Request Password Reset
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(handlePasswordReset)} className="space-y-6">
                  <FormField
                    control={resetForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                           value={form.getValues('email')}
                           type="email" placeholder="Enter your email" {...field} className="border-[#d2b48c] focus:ring-2 focus:ring-[#8b4513]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resetForm.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Reset Token</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your reset token" {...field} className="border-[#d2b48c] focus:ring-2 focus:ring-[#8b4513]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resetForm.control}
                    name="new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">New Password</FormLabel>
                        <FormControl>
                          <div className='flex gap-2 border border-[#d2b48c] focus-within:ring-2 focus-within:ring-[#8b4513] rounded-md'>
                            <Input 
                              type={showPassword ? 'text' : 'password'} 
                              placeholder="Enter your new password" 
                              {...field} 
                              className="border-none flex-grow" 
                            />
                            <button 
                              type='button' 
                              className='px-2 text-[#8b4513]' 
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full btn bg-[#8b4513] text-white py-2 px-4 rounded-md hover:bg-[#a0522d] transition-colors duration-300 font-semibold text-lg">
                    Reset Password
                  </Button>
                </form>
              </Form>
            )}
            <div className="mt-6 text-center">
              <Link to="/auth/login" className="text-[#120a05] hover:underline">Go To Login</Link>
            </div>
          </div>
        </motion.div>
        <Toaster position='top-right'/>
      </div>
    </>
  );
};

export default ForgotPassword;

