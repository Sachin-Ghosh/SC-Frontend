'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast, Toaster } from 'sonner'
import { OTPForm } from '@/components/OTPform'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import OTPInput from 'react-otp-input'

// Modified schema to make bio, photo ID, and profile picture optional for faculty
const formSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  department: z.string().min(1, { message: "Please select a department." }),
  gender: z.string().min(1, { message: "Please select a gender." }),
  bio: z.string().optional(),
  id_card_document: z.string().optional(),
  profile_picture: z.string().optional(),
  year_of_study: z.string().optional(),
  division: z.string().optional(),
  roll_number: z.string().optional(),
  designation: z.string().optional(),
  position: z.string().optional(),
  term_start: z.string().optional(),
  term_end: z.string().optional(),
})

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const isFileSizeValid = (file) => {
  return file && file.size <= MAX_FILE_SIZE;
};

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('STUDENT');
  const [registrationData, setRegistrationData] = useState({});
  const [email, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [photoIdFile, setPhotoIdFile] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      department: "",
      gender: "",
      bio: "",
      id_card_document: "",
      profile_picture: "",
      ...(activeTab === 'STUDENT' && {
        year_of_study: "",
        division: "",
        roll_number: "",
      }),
      ...(activeTab === 'FACULTY' && {
        designation: "",
      }),
      ...(activeTab === 'COUNCIL' && {
        year_of_study: "",
        division: "",
        roll_number: "",
        position: "",
        term_start: "",
        term_end: "",
      }),
    },
  })

  const onSubmit = async (data) => {

    if((!photoIdFile||!profilePicFile)&&(activeTab==='STUDENT'||activeTab==='COUNCIL')){
      toast.error('Upload Your Photo Id')
      return;
    }
    if(!data.year_of_study && activeTab==='STUDENT' ){
      toast.error('Please Select Year of study')
      return;

    }
    if(!data.division && activeTab==='STUDENT' ){
      toast.error('Please Select Division')
      return;

    }
    if(!data.roll_number && activeTab==='STUDENT' ){
      toast.error('Please Fill your roll no.')
      return;

    }
    if(!data.designation && activeTab==='FACULTY' ){
      toast.error('Please enter your designation')
      return;

    }
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key !== 'id_card_document' && key !== 'profile_picture') {
        formData.append(key, data[key]);
      }
    });
    formData.append('user_type', activeTab);
    
    // Only append files for non-faculty users or if files are provided for faculty
    if (activeTab !== 'FACULTY' || photoIdFile) {
      if (photoIdFile) formData.append('id_card_document', photoIdFile);
    }
    if (activeTab !== 'FACULTY' || profilePicFile) {
      if (profilePicFile) formData.append('profile_picture', profilePicFile);
    }

    const registrationPayload = {
      ...data,
      user_type: activeTab,
      id_card_document: photoIdFile,
      profile_picture: profilePicFile,
    };

    toast.promise(
      fetch(`${import.meta.env.VITE_API_URL}/api/users/register/`, {
        method: 'POST',
        body: formData
      }).then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          throw new Error(errorData.error || 'Registration failed');
        }
        return response.json();
      }),
      {
        loading: 'Registering...',
        success: (data) => {
          console.log('Registration successful:', data);
          setEmail(data.email);
          setRegistrationData(registrationPayload);
          setShowOTP(true);
          return `${data.message}`;
        },
        error: (err) => {
          console.error('Registration error:', err);
          return `Registration failed: ${err.message}`;
        }
      }
    );
  };
// console.log(first)
  const Login = async () => {
    try {
      const loginResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login/`, {
        email: registrationData.email,
        password: registrationData.password
      });

      if (loginResponse.data) {
        localStorage.setItem('access-token', loginResponse.data.tokens.access);
        localStorage.setItem('refresh-token', loginResponse.data.tokens.refresh);
        localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
        toast.success('Login successful');
        navigate('/events/sports');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('OTP verification or login error:', error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  }

  const handleOTPVerification = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return;
    }

    const verificationPayload = {
      otp,
      user_type: activeTab,
      email: registrationData.email,
      bio: registrationData.bio,
      gender: registrationData.gender,
      id_card_document: photoIdFile,
      profile_picture: profilePicFile,
      first_name: registrationData.first_name,
      last_name: registrationData.last_name,
      phone: registrationData.phone,
      password: registrationData.password,
      department: registrationData.department,
      ...(activeTab === 'STUDENT' && {
        year_of_study: registrationData.year_of_study || '',
        division: registrationData.division || '',
        roll_number: registrationData.roll_number || '',
      }),
      ...(activeTab === 'FACULTY' && {
        designation: registrationData.designation || '',
      }),
      ...(activeTab === 'COUNCIL' && {
        year_of_study: registrationData.year_of_study,
        division: registrationData.division,
        roll_number: registrationData.roll_number,
        position: registrationData.position,
        term_start: registrationData.term_start,
        term_end: registrationData.term_end,
      }),
    }

    toast.promise(
      axios.post(`${import.meta.env.VITE_API_URL}/api/users/register/verify/`, verificationPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        // console.log('OTP verification successful:', response.data)
        Login();
        return response.data
      }),
      {
        loading: 'Verifying OTP...',
        success: (data) => `${data.message}`,
        error: (err) => `OTP verification failed: ${err.response?.data?.message || err.message}`
      }
    )
  }

  const handleResendOtp = async () => {
    try {
      const payload = {
        email: registrationData.email
      }
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/resend-otp/`, payload);
      const data = await response.data
      toast.success(`${data.message}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <img src='/home-background.jpg' className='fixed w-full h-full object-cover z-0' alt="Background" />
      <div className='fixed inset-0 bg-amber-900 opacity-40 z-10 backdrop-blur-sm bg-opacity-40'></div>
      <div className="min-h-screen rounded flex items-center justify-center relative z-10 bg-cover bg-center bg-blend-overlay">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-3 md:p-8 rounded w-full max-w-4xl relative top-20 backdrop-blur-md border-2 border-amber-900 mx-3 mb-2"
        >
          <div className='relative z-20'>
            <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center text-[#291b11] font-serif">Aurora 2025</h2>
            <h3 className="text-lg sm:text-2xl font-semibold mb-6 text-center text-[#442914]">Athlete's Registration</h3>
            {!showOTP ? (
              <>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
                  <TabsList className="grid w-full grid-cols-3 bg-amber-800 rounded bg-opacity-40">
                    <TabsTrigger value="STUDENT" className="data-[state=active]:bg-amber-900 rounded data-[state=active]:text-white">Student</TabsTrigger>
                    <TabsTrigger value="FACULTY" className="data-[state=active]:bg-amber-900 rounded data-[state=active]:text-white">Faculty</TabsTrigger>
                    <TabsTrigger value="COUNCIL" className="data-[state=active]:bg-amber-900 rounded data-[state=active]:text-white">Council</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email" {...field} />
                          </FormControl>
                          <FormDescription>Enter Your college email id</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Phone" {...field} />
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
                          <FormLabel className="">Password</FormLabel>
                          <FormControl>
                            <div className='flex gap-2 border border-black focus:ring-2 focus:ring-[#8b4513] '>
                              <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" {...field} className="border-none" />
                              <button type='button' className='px-2' onClick={() => { setShowPassword(!showPassword) }}>{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</button>
                            </div>
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
                          <FormLabel>Department</FormLabel>
                          <Select onValueChange={field.onChange}  defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[url('/event-background.jpg')] bg-center bg-cover">
                              <SelectItem value="AS&H">AS&H</SelectItem>
                              <SelectItem value="COMPUTER">Computer Engineering</SelectItem>
                              <SelectItem value="IT">IT</SelectItem>
                              <SelectItem value="AIML">AI/ML</SelectItem>
                              <SelectItem value="DE">Data Engineering</SelectItem>
                              <SelectItem value="CIVIL">Civil</SelectItem>
                              {activeTab==='FACULTY' &&  <SelectItem value="OTHERS">Non-Teaching Staff</SelectItem>}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[url('/event-background.jpg')] bg-center bg-cover">
                              <SelectItem value="MALE">Male</SelectItem>
                              <SelectItem value="FEMALE">Female</SelectItem>
                              <SelectItem value="OTHER">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {activeTab === 'STUDENT' && (
                      <>
                        <FormField
                          control={form.control}
                          name="year_of_study"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year of Study</FormLabel>
                              <Select onValueChange={field.onChange} required={activeTab==='STUDENT'} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Year of Study" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[url('/event-background.jpg')] bg-center bg-cover">
                                  <SelectItem value="FE">FE</SelectItem>
                                  <SelectItem value="SE">SE</SelectItem>
                                  <SelectItem value="TE">TE</SelectItem>
                                  <SelectItem value="BE">BE</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="division"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Division</FormLabel>
                              <Select onValueChange={field.onChange} required={activeTab==='STUDENT'} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Division" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[url('/event-background.jpg')] bg-center bg-cover">
                                  <SelectItem value="A">A</SelectItem>
                                  <SelectItem value="B">B</SelectItem>
                                  <SelectItem value="C">C</SelectItem>
                                  <SelectItem value="D">D</SelectItem>
                                  <SelectItem value="E">E</SelectItem>
                                  <SelectItem value="F">F</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="roll_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Roll Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Roll Number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    {activeTab === 'FACULTY' && (
                      <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <FormControl>
                              <Input placeholder="Designation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {activeTab === 'COUNCIL' && (
                      <>
                        <FormField
                          control={form.control}
                          name="year_of_study"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year of Study</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Year of Study" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[url('/event-background.jpg')] bg-center">
                                  <SelectItem value="FE">FE</SelectItem>
                                  <SelectItem value="SE">SE</SelectItem>
                                  <SelectItem value="TE">TE</SelectItem>
                                  <SelectItem value="BE">BE</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="division"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Division</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Division" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-[url('/event-background.jpg')] bg-center">
                                  <SelectItem value="A">A</SelectItem>
                                  <SelectItem value="B">B</SelectItem>
                                  <SelectItem value="C">C</SelectItem>
                                  <SelectItem value="D">D</SelectItem>
                                  <SelectItem value="E">E</SelectItem>
                                  <SelectItem value="F">F</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="roll_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Roll Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Roll Number" required {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position</FormLabel>
                              <FormControl>
                                <Input placeholder="Position" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="term_start"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Term Start</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="term_end"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Term End</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    {activeTab !== 'FACULTY' && (
                      <>
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Tell us about yourself" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="id_card_document"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upload College ID photo</FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (isFileSizeValid(file)) {
                                      field.onChange(file.name);
                                      setPhotoIdFile(file);
                                    } else {
                                      toast.error("Photo ID file size must be 1MB or less");
                                      e.target.value = "";
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormDescription>Upload a photo of college ID card</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="profile_picture"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Profile Picture</FormLabel>
                              <FormControl>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (isFileSizeValid(file)) {
                                      field.onChange(file.name);
                                      setProfilePicFile(file);
                                    } else {
                                      toast.error("Profile picture file size must be 1MB or less");
                                      e.target.value = "";
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormDescription>Upload a profile picture</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    <Button type="submit" className="w-full bg-[#8b4513] text-white hover:bg-[#a0522d]">Sign Up</Button>
                  </form>
                </Form>
              </>
            ) : (
              <div className='flex flex-col sm:gap-4 items-center justify-center'>
                <h4 className="text-xl font-semibold text-center mb-2">Enter OTP</h4>
                <Input type="text" className="text-center" value={otp} onChange={e => setOtp(e.target.value)} />
                <Button variant="link" onClick={handleResendOtp}>Resend Otp</Button>
                <Button
                  className="w-fit bg-[#8b4513] rounded text-white hover:bg-[#a0522d] mt-4"
                  onClick={handleOTPVerification}
                >
                  Verify OTP
                </Button>
                <span>The Otp has been sent  to your universal email</span>
              </div>
            )}
            <div className="mt-6 text-center">
              <Link to="/auth/login" className="text-[#120a05] hover:underline">Already have an account? Sign In</Link>
            </div>
          </div>
        </motion.div>
        <Toaster position="top-right" />
      </div>
    </>
  )
}

export default SignUp

