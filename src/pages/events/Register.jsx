'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
import { registerSchema } from './schema/register'
import {motion} from 'motion/react'
// import { registerSchema } from "./schemas/register-schema"

const Register = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      department: "",
      year: "",
    },
  })

  function onSubmit(values) {
    //console.log(values)
    // Here you would typically send the data to your backend
  }

  return (
    <motion.div initial={{y:100 , opacity: 0 }} animate={{y:0, opacity:1, transitionDelay: 1.5}} className=" flex items-center relative mx-12 md:mx-28 justify-center md:w-[58rem]  backdrop-blur-sm">
      <div className="w-full flex-grow p-8 shadow-xl shadow-cyan-600 border rounded-xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-600">Registration Counter</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} className="text-lg p-3 md:w-96 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your department" {...field} className="text-lg p-3 md:w-96 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Year</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} className="rounded-xl">
                    <FormControl>
                      <SelectTrigger className="text-lg p-3">
                        <SelectValue placeholder="Select a year" className='rounded-xl'/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-black w-full rounded-xl">
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-center'>
        <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px  font-semibold leading-6 text-md   text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
          <span>{`Register`}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.75 8.75L14.25 12L10.75 15.25"
            ></path>
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </button>
      </div>
            {/* <Button type="submit" className="w-full text-lg py-6 "></Button> */}
          </form>
        </Form>
      </div>
    </motion.div>
  )
}

export default Register

