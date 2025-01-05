import { useState } from 'react'
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
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const fileUploadSchema = z.object({
  proof: z.instanceof(FileList).refine((files) => files.length > 0, "File is required"),
  file_type: z.enum(['IMAGE', 'VIDEO'], {
    required_error: "Please select a file type",
  }),
  description: z.string().min(1, "Description is required").max(500, "Description must be 500 characters or less"),
})

export default function FileUploadForm({ grievanceId }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('access-token')
  const user = JSON.parse(localStorage.getItem('user'))

  const form = useForm({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      proof: undefined,
      file_type: undefined,
      description: "",
    },
  })
console.log(grievanceId)
  const calculateFileSize = (file) => {
    // Convert file size to MB and round to 2 decimal places
    return (file.size / (1024 * 1024)).toFixed(0)
  }

  async function onSubmit(values) {
    setIsSubmitting(true)
    const formData = new FormData()
    const file = values.proof[0]
    
    formData.append('file', file)
    formData.append('file_type', values.file_type)
    formData.append('description', values.description)
    formData.append('event', grievanceId)
    formData.append('is_public', 'true')
    formData.append('uploaded_by', user.id)
    formData.append('size', calculateFileSize(file))

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/grievances/media/upload/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      })

      if (response.ok) {
        console.log('Proof uploaded successfully')
       
        toast.success('Proof uploaded successfully')
        navigate('/events/sports') ;
        // Adjust this route as needed
      } else {
        console.error('Failed to upload proof')
        console.log(await response.json())
        toast.error('Failed to upload proof')
      }
    } catch (error) {
      console.error('Error uploading proof:', error)
      toast.error('Error uploading proof')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">Upload Proof</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="proof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proof</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    onChange={(e) => field.onChange(e.target.files)}
                    accept="image/*,video/*"
                  />
                </FormControl>
                <FormDescription>
                  Upload proof for your grievance (image or video).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="file_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select file type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center bg-no-repeat border-none rounded">
                    <SelectItem value="IMAGE">Image</SelectItem>
                    <SelectItem value="VIDEO">Video</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the type of file you are uploading.
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the proof you are uploading..." 
                    className="h-32"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Provide a brief description of the proof you are uploading (max 500 characters).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-amber-900 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload Proof"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

