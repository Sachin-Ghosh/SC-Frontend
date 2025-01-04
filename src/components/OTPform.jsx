'use client'

import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import OtpInput from 'react-otp-input'

export function OTPForm({ onVerify }) {
  const [otp, setOtp] = useState('')
  const form = useForm({
    defaultValues: {
      otp: "",
    },
  })

  function onSubmit(values) {
    onVerify(otp)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <div>

                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className=""></span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: '3rem',
                    height: '3rem',
                    margin: '0 0.5rem',
                    fontSize: '1.5rem',
                    borderRadius: '4px',
                    border: '1px solid #d2b48c',
                  }}
                />
                </div>
              </FormControl>
              <FormDescription>
                Please enter the 6-digit code sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#8b4513] text-white hover:bg-[#a0522d]">Verify OTP</Button>
      </form>
    </Form>
  )
}

