'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, Toaster } from 'sonner'
import { OTPForm } from '@/components/OTPform'
import { RegistrationForm } from '@/components/RegistrationForm'
// import { RegistrationForm } from './RegistrationForm'
// import { OTPForm } from './OTPForm'

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('student')
  const [showOTP, setShowOTP] = useState(false)
  const [email, setEmail] = useState('')
  const navigate=useNavigate()

  const handleRegistrationSuccess = (email) => {
    setEmail(email)
    setShowOTP(true)
  }

  const handleOTPVerification = async (otp) => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    console.log({email,otp});

    toast.promise(
      fetch('https://student-council-backend.onrender.com/api/users/register/verify/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      }).then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'OTP verification failed')
        }
        return response.json()
      }),
      {
        loading: 'Verifying OTP...',
        success: (data) => {
          console.log('OTP verification successful:', data)
          navigate('/auth/login')
          return `${data.message}`
        },
        error: (err) => {
          console.error('OTP verification error:', err)
          return `OTP verification failed: ${err.message}`
        }
      }
    )
  }

  return (
    <>
      <img src='/register.jpg' className='fixed w-full h-full object-cover z-0 ' alt="Background" />
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
                    <TabsTrigger value="student" className="data-[state=active]:bg-amber-900 data-[state=active]:text-white">Student</TabsTrigger>
                    <TabsTrigger value="faculty" className="data-[state=active]:bg-amber-900 data-[state=active]:text-white">Faculty</TabsTrigger>
                    <TabsTrigger value="council" className="data-[state=active]:bg-amber-900 data-[state=active]:text-white">Council</TabsTrigger>
                  </TabsList>
                </Tabs>
                <RegistrationForm userType={activeTab} onSuccess={handleRegistrationSuccess} />
                {/* <OTPForm onVerify={handleOTPVerification} /> */}
              </>
            ) : (
              <div className='flex justify-center items-center'>

                <OTPForm onVerify={handleOTPVerification} />
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

