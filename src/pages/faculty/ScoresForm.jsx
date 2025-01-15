import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

const ScoresForm = () => {
  const { eventId } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const [heatDetails, setHeatDetails] = useState(null);
  const accessToken = localStorage.getItem('access-token');
  const form = useForm();

  const { watch } = form;
  const selectedHeat = watch('heat');

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setEventDetail(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    getEventDetails();
  }, [eventId, accessToken]);

  useEffect(() => {
    if (selectedHeat) {
      const getHeatDetails = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/heats/${selectedHeat}/get_heat_details`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
          setHeatDetails(response.data);
        } catch (error) {
          console.error('Error fetching heat details:', error);
        }
      };

      getHeatDetails();
    }
  }, [selectedHeat, accessToken]);

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the form data to your API
  };

  if (!eventDetail || eventDetail.category !== 'CULTURAL') {
    return <div>Loading or not a cultural event...</div>;
  }

  return (
    <>
      <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
      <Card className="relative z-20 max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Scores Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="heat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heat</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Heat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eventDetail.recent_heats?.map((heat) => (
                          <SelectItem 
                            key={heat.id} 
                            value={heat.id.toString()}
                          >
                            Heat {heat.heat_number} - {heat.stage} ({heat.status})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {heatDetails && (
                <FormField
                  control={form.control}
                  name="participant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participant</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Participant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {heatDetails.participants.map((participant) => (
                            <SelectItem 
                              key={participant.registration_id} 
                              value={participant.registration_id.toString()}
                            >
                              {participant.participant_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ScoresForm;

