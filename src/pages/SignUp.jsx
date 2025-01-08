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

const formSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }).regex(/@universal\.edu\.in$/, "Email must belong to universal.edu.in domain"),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  department: z.string().min(1, { message: "Please select a department." }),
  gender: z.string().min(1, { message: "Please select a gender." }),
  bio: z.string().optional(),
  id_card_document: z.string().min(1, { message: "Please upload a photo ID." }),
  profile_picture: z.string(File).min(1, { message: "Please upload a profile picture." }),
  year_of_study: z.string().optional(),
  division: z.string().optional(),
  roll_number: z.string().optional(),
  designation: z.string().optional(),
  subjects: z.string().optional(),
  position: z.string().optional(),
  term_start: z.string().optional(),
  term_end: z.string().optional(),
})

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
        subjects: "",
      }),
      ...(activeTab === 'COUNCIL' && {
        position: "",
        term_start: "",
        term_end: "",
      }),
    },
  })

  const onSubmit = async (data) => {
    // First, verify the ID card
    // if (!photoIdFile) {
    //   toast.error('Please upload a photo ID');
    //   return;
    // }

    // const idCardFormData = new FormData();
    // idCardFormData.append('id_card_document', photoIdFile);

    try {
      // const verificationResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/users/verify-id-card`, {
      //   method: 'POST',
      //   body: idCardFormData
      // });

      // const verificationText = await verificationResponse.text();
      // console.log('Verification response:', verificationText);

      // let verificationData;
      // try {
      //   verificationData = JSON.parse(verificationText);
      // } catch (e) {
      //   console.error('Error parsing verification response:', e);
      //   throw new Error('Invalid response from server during ID verification');
      // }

      // if (!verificationResponse.ok) {
      //   throw new Error(verificationData.error || 'ID card verification failed');
      // }

      // If ID card verification is successful, proceed with the main form submission
      // if(data.email.includes('@universal.edu.in')){
      //   toast.error
      // }
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key !== 'id_card_document' && key !== 'profile_picture') {
          formData.append(key, data[key]);
        }
      });
      formData.append('user_type', activeTab);
      if (photoIdFile) formData.append('id_card_document', photoIdFile);
      if (profilePicFile) formData.append('profile_picture', profilePicFile);

      // Store the complete form data
      const registrationPayload = {
        ...data,
        user_type: activeTab,
        // Convert File objects to null since they can't be serialized
        id_card_document: photoIdFile,
        profile_picture: profilePicFile,
      };

      const registrationResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register/`, {
        method: 'POST',
        body: formData
      });

      const registrationText = await registrationResponse.text();
      console.log('Registration response:', registrationText);

      let responseData;
      try {
        responseData = JSON.parse(registrationText);
      } catch (e) {
        console.error('Error parsing registration response:', e);
        throw new Error('Invalid response from server during registration');
      }

      if (!registrationResponse.ok) {
        throw new Error(responseData.error || 'Registration failed');
      }

      console.log('Registration successful:', responseData);
      setEmail(responseData.email);
      setRegistrationData(registrationPayload);
      setShowOTP(true);
      toast.success(responseData.message);
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleOTPVerification = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }

    // Ensure all required fields are included
    const verificationPayload = {
      otp,
      // This now contains all the form fields
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
      // Include specific fields that might be required for STUDENTs
      ...(activeTab === 'STUDENT' && {
        year_of_study: registrationData.year_of_study || '',
        division: registrationData.division || '',
        roll_number: registrationData.roll_number || '',
      }),
      // Include specific fields for FACULTY
      ...(activeTab === 'FACULTY' && {
        designation: registrationData.designation || '',
        subjects: registrationData.subjects || '',
      }),
      // Include specific fields for COUNCIL
      ...(activeTab === 'COUNCIL' && {
        position: registrationData.position || '',
        term_start: registrationData.term_start || '',
        term_end: registrationData.term_end || '',
      }),
    }

    console.log('Sending verification payload:', verificationPayload)

    try {
      const verificationResponse = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register/verify/`, verificationPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('OTP verification successful:', verificationResponse.data);
      toast.success(verificationResponse.data.message);
  
      // Proceed with automatic login
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

  const handleResendOtp=async()=>{
    try {
      const payload={
        email: registrationData.email
      }
      const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/users/resend-otp/`,payload);
      const data=await response.data
      console.log(await response.data);
      toast.success(`${data.message}`)
      // if(!response.ok){
      // }else{
      //   toast.error(`${data.message}`)
      // }
    } catch (error) {

      console.log(error)
      
    }
  }



  return (
    <>
      <img src='/register.jpg' className='fixed w-full h-full object-cover z-0' alt="Background" />
      <div className='fixed inset-0 bg-amber-900 opacity-40 z-10 backdrop-blur-sm bg-opacity-40'></div>
      <div className="min-h-screen rounded flex items-center justify-center relative z-10 bg-cover bg-center bg-blend-overlay">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded w-full max-w-4xl relative top-20 backdrop-blur-md border-2 border-amber-900 mx-3 mb-2"
        >
          <div className='relative z-20'>
            <h2 className="text-4xl font-bold mb-6 text-center text-[#291b11] font-serif">Aurora 2025</h2>
            <h3 className="text-2xl font-semibold mb-6 text-center text-[#442914]">Athlete's Registration</h3>
            {!showOTP ? (
              <>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="STUDENT" className="data-[state=active]:bg-amber-900 data-[state=active]:text-white">STUDENT</TabsTrigger>
                    <TabsTrigger value="FACULTY" className="data-[state=active]:bg-amber-900 data-[state=active]:text-white">FACULTY</TabsTrigger>
                    <TabsTrigger value="COUNCIL" className="data-[state=active]:bg-amber-900 data-[state=active]:text-white">COUNCIL</TabsTrigger>
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
                        <Input type={showPassword ? 'text':'password'} placeholder="Enter your password" {...field} className="border-none" />
                        <button type='button' className='px-2' onClick={()=>{setShowPassword(!showPassword)}}>{showPassword ? <FaEyeSlash size={20}/>:<FaEye size={20}/>}</button>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[url('/event-background.jpg')] bg-center bg-cover">
                              <SelectItem value="COMPUTER">Computer Engineering</SelectItem>
                              <SelectItem value="IT">IT</SelectItem>
                              <SelectItem value="AIML">AI/ML</SelectItem>
                              <SelectItem value="DATA">Data Engineering</SelectItem>
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
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <>
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
                        <FormField
                          control={form.control}
                          name="subjects"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subjects</FormLabel>
                              <FormControl>
                                <Input placeholder="Subjects" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    {activeTab === 'COUNCIL' && (
                      <>
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
                          <FormLabel>Photo ID</FormLabel>
                          <FormControl>
                            <Input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => {
                                field.onChange(e.target.files[0].name);
                                setPhotoIdFile(e.target.files[0]);
                              }}
                            />
                          </FormControl>
                          <FormDescription>Upload a photo of your ID card</FormDescription>
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
                                field.onChange(e.target.files[0].name);
                                setProfilePicFile(e.target.files[0]);
                              }}
                            />
                          </FormControl>
                          <FormDescription>Upload a profile picture</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-[#8b4513] text-white hover:bg-[#a0522d]">Sign Up</Button>
                  </form>
                </Form>
              </>
            ) : (
              <div className='flex flex-col gap-4 items-center justify-center'>
              <h4 className="text-xl font-semibold mb-2">Enter OTP</h4>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="w-2"></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: '40px',
                  height: '40px',
                  margin: '0 4px',
                  fontSize: '1.5rem',
                  borderRadius: '4px',
                  border: '1px solid #8b4513',
                }}
                focusStyle={{
                  border: '2px solid #a0522d',
                  outline: 'none'
                }}
              />

              <Button variant="link" onClick={()=>{handleResendOtp()}}>Resend Otp</Button>
              <Button 
                className="w-fit bg-[#8b4513] text-white hover:bg-[#a0522d] mt-4" 
                onClick={handleOTPVerification}
              >
                Verify OTP
              </Button>
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

