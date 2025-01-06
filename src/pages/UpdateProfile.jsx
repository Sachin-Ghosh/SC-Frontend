import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'
// import { useToast } from "@/components/ui/use-toast"

const UpdateProfile = () => {
//   const { toast } = useToast()
const [profile, setProfile]=useState()
const accessToken = localStorage.getItem('access-token');
const user=JSON.parse(localStorage.getItem('user'))
const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    department: '',
    gender: '',
    division: '',
    year_of_study: '',
    phone: '',
    bio: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile/update/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        toast.error(`${data.message}`)
        throw new Error('Failed to update profile')
      }else{

          const data=await response.json();
          console.log(data)
          toast.success(`${data.message}`);
          navigate('/events/sports')
          
      }
    //   toast({
    //     title: "Success",
    //     description: "Profile updated successfully",
    //   })
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to update profile. Please try again.",
    //     variant: "destructive",
    //   })
    console.log(error)
    toast.error(`${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const getProfile = async () => {
    if (!accessToken) {
      console.error('No access token found');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      console.log(data)
      setProfile(data);
      setFormData({
    first_name: user.first_name,
    last_name: user.last_name,
    department: data.profile.department,
    gender: data.profile.gender,
    division: data.profile.division,
    year_of_study: data.profile.year_of_study,
    phone: data.profile.phone,
    bio: data.profile.bio
      })

    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  useEffect(() => {
    getProfile();
  }, [])
  

  return (
    <>

    <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
    <div className="flex items-center justify-center w-full min-h-screen top-20 sm:top-0 relative z-20">

    <form onSubmit={handleSubmit} className='w-full flex justify-center items-center'>
      <Card className="w-full max-w-4xl border-none">
        <CardHeader>
          <CardTitle className="text-center">Update Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input 
                id="first_name" 
                placeholder="Enter your first name"
                value={formData.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input 
                id="last_name" 
                placeholder="Enter your last name"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleInputChange('department', value)}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center">
                  <SelectItem value="COMPUTER">COMPUTER</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="AIML">AIML</SelectItem>
                  <SelectItem value="DATA">DATA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger >
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center">
                  <SelectItem value="MALE">MALE</SelectItem>
                  <SelectItem value="FEMALE">FEMALE</SelectItem>
                  <SelectItem value="OTHERS">OTHERS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="division">Division</Label>
              <Select
                value={formData.division}
                onValueChange={(value) => handleInputChange('division', value)}
              >
                <SelectTrigger id="division">
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')] bg-cover bg-center">
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="E">E</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year_of_study">Year of Study</Label>
              <Select
                value={formData.year_of_study}
                onValueChange={(value) => handleInputChange('year_of_study', value)}
              >
                <SelectTrigger id="year_of_study">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-[url('/event-background.jpg')]  bg-center" >
                  <SelectItem value="FE">FE</SelectItem>
                  <SelectItem value="SE">SE</SelectItem>
                  <SelectItem value="TE">TE</SelectItem>
                  <SelectItem value="BE">BE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              placeholder="Enter your phone number" 
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Write something about yourself" 
              className="min-h-[100px]"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="btn bg-amber-900 hover:bg-amber-800  text-white w-full disabled:bg-amber-700 disabled:text-black" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </CardContent>
      </Card>
    </form>
            
    </div>
    <Toaster position='top-right'/>
    </>
  )
}

export default UpdateProfile

