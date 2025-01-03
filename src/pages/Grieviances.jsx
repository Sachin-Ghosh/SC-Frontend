'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  grievanceType: z.string().min(1, {
    message: "Please select a grievance type.",
  }),
  details: z.string().min(10, {
    message: "Details must be at least 10 characters.",
  }),
})

export default function Grievance() {
//   const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      grievanceType: "",
      details: "",
    },
  })

  function onSubmit(values) {
    setIsSubmitting(true)
    // In a real application, you would send this data to your server
    console.log(values)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
    //   toast({
    //     title: "Grievance Submitted",
    //     description: "We have received your grievance and will review it shortly.",
    //   })
      form.reset()
    }, 1000)
  }

  return (
    <>
    <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
    <div className='px-2 sm:px-72 py-10 flex flex-col relative min-h-screen z-20 top-12'>
      <h1 className="text-3xl font-bold mb-6 text-center ysabeau-sc text-amber-900 ">Submit a Grievance</h1>


    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                Please enter your full name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We'll use this email to contact you about your grievance.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between flex-wrap gap-2">
        <div className="">
              <label htmlFor="department" className="block text-[#4a3728] ">Department</label>
              <Select onValueChange={(value) => handleSelectChange('department', value)}>
                <SelectTrigger className="w-96 border-b">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                  <SelectItem value="computer">Computer Engineering</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="aiml">AI/ML</SelectItem>
                  <SelectItem value="data">Data Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <label htmlFor="division" className="block text-[#4a3728] ">Division</label>
              <Select onValueChange={(value) => handleSelectChange('division', value)}>
                <SelectTrigger className="w-96 border-b">
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                  <SelectItem value="a">A</SelectItem>
                  <SelectItem value="b">B</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="d">D</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
        <FormField
          control={form.control}
          name="grievanceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Subject" {...field} />
              </FormControl>
              <FormDescription>
                Please specify the type of your grievance.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grievanceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proof of Cheating</FormLabel>
              <FormControl>
              <Input id="picture" type="file" />
              </FormControl>
              <FormDescription>
                Proof of cheating is must orelse it wont be considered
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grievance Details</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please provide details about your grievance..." 
                  className="h-32"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Provide as much detail as possible about your grievance.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className='btn bg-amber-900 text-white' disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Grievance"}
        </button>
      </form>
    </Form>
    </div>
    </>
  )
}

