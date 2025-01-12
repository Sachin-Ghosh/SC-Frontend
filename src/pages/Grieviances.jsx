'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubeventCombobox } from '@/components/SubeventsComboBox'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import axios from 'axios'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const formSchema = z.object({
  grievance_type: z.string().min(1, { message: "Please select a type" }),
  title: z.string().min(1, {
    message: "Subject must be at least 1 character.",
  }),
  event: z.number({
    required_error: "Please select a subevent",
  }),
  description: z.string().min(1, {
    message: "Description must be at least 1 character.",
  }),
  evidence_files: z
    .array(
      z.object({
        file: z
          .any()
          .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
          .refine(
            (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png, .webp and .pdf formats are supported."
          ),
      })
    )
    .optional(),
})

export default function Grievance() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subevents, setSubevents] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const [evidenceFiles, setEvidenceFiles] = useState([])
  const accessToken = localStorage.getItem('access-token')
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const fetchSubEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/sub-events/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if(response.ok){
        console.log(data)
        setSubevents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchSubEvents();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grievance_type: "",
      title: "",
      event: undefined,
      description: "",
      evidence_files: [],
    },
  })

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const updatedEvidence = [];
    
    files.forEach((file) => {
      updatedEvidence.push({ file });
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrls((prev) => [...prev, e.target?.result]);
        };
        reader.readAsDataURL(file);
      }
    });

    form.setValue('evidence_files', updatedEvidence);
    setEvidenceFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    const updatedEvidence = form.getValues('evidence_files').filter((_, i) => i !== index);
    form.setValue('evidence_files', updatedEvidence);
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setEvidenceFiles((prev) => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(values) {
    setIsSubmitting(true)
    const formData = new FormData()
    
    // Append basic form fields
    formData.append('grievance_type', values.grievance_type)
    formData.append('title', values.title)
    formData.append('event', values.event.toString())
    formData.append('description', values.description)
    formData.append('submitted_by', user.id.toString())
    
    // Append files
    evidenceFiles.forEach((file, index) => {
      formData.append(`evidence_files`, file)
    })

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/grievances/create/`, formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Grievance submitted successfully');
        toast.success('Grievance submitted successfully');
        navigate('/my-grievances');
      } else {
        console.error('Failed to submit grievance');
        toast.error('Failed to submit grievance');
      }
    } catch (error) {
      console.error('Error submitting grievance:', error);
      toast.error('Error submitting grievance');
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
      <div className='px-2 sm:px-72 py-10 flex flex-col relative min-h-screen z-20 top-12'>
        <h1 className="text-3xl font-bold mb-6 text-center ysabeau-sc text-amber-900">Submit a Grievance</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="grievance_type"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Grievance Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Grievance Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                      <SelectItem value="CHEATING">Cheating</SelectItem>
                      <SelectItem value="MISCONDUCT">Misconduct</SelectItem>
                      <SelectItem value="RULES_VIOLATION">Rules Violation</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Subject" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please specify the subject of your grievance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subevent</FormLabel>
                  <FormControl>
                    <SubeventCombobox
                      subevents={subevents}
                      onSelect={(id) => field.onChange(id)}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>
                    Select the subevent related to your grievance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
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
            <FormField
              control={form.control}
              name="evidence_files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proof</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept={ACCEPTED_FILE_TYPES.join(',')}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload one or more files as evidence for your grievance. Max file size: 5MB. Accepted formats: .jpg, .jpeg, .png, .webp, .pdf
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Button type="submit" className="w-full bg-amber-900 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Grievance"}
            </Button>
          </form>
        </Form>
        <Toaster position='top-right'/>
      </div>
    </>
  )
}

