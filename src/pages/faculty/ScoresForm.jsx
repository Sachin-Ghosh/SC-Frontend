import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast, Toaster } from 'sonner';
import { Loader } from 'lucide-react';
// import { useToast } from "@/components/ui/use-toast"

const ScoresForm = () => {
  const { eventId } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const [heatDetails, setHeatDetails] = useState(null);
  const [scoringCriteria, setScoringCriteria] = useState(null);
  const accessToken = localStorage.getItem('access-token');
  const form = useForm();
  // const { toast } = useToast();

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
        
        // Fetch scoring criteria
        const criteriaResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events/sub-events/${eventId}/get_scoring_criteria/`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
        setScoringCriteria(criteriaResponse.data);
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

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        heat_id: data.heat,
        scores: [{
          registration_id: parseInt(data.participant),
          criteria_scores: Object.entries(data.scores).reduce((acc, [key, value]) => {
            acc[key] = parseFloat(value);
            return acc;
          }, {})
        }]
      };

      console.log(formattedData)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/scores/submit_cultural_scores/`,
        formattedData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast("Scores submitted successfully");
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting scores:', error);
      toast({
        title: "Error submitting scores",
        description: error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
      });
    }
  };

  if (!eventDetail) {
    return (
      <>
      <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
      
      <span className='text-black flex justify-center items-center min-h-screen gap-5'>
      <Loader className='animate-spin' size={30} />
      <h1 className='relative z-50'>Loading....</h1>
    </span>
    </>
  );
  }

  return (
    <>
      <img src='/registration-back.jpg' className='fixed object-cover h-full w-full' alt="Background" />
      {eventDetail.category === 'CULTURAL'?(
        <>
        <Card className="relative z-20 max-w-5xl w-full bg-white bg-opacity-35 top-5 sm:top-0 mx-auto mt-10 mb-10">
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
                      <SelectContent className="bg-[url('/vintage.jpg')] bg-cover bg-center">
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

         
                <FormField
                  control={form.control}
                  name="participant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participant</FormLabel>
                      <Select onValueChange={field.onChange} disabled={!selectedHeat} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Participant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[url('/vintage.jpg')] bg-cover bg-center">
                          {heatDetails?.participants?.map((participant) => (
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
         

              {scoringCriteria && (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Scoring Criteria</h3>
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    <div className="space-y-4">
                      {Object.entries(scoringCriteria.criteria).map(([criterion, details]) => (
                        <FormField
                          key={criterion}
                          control={form.control}
                          name={`scores.${criterion}`}
                          rules={{
                            required: `${criterion} score is required`,
                            min: {
                              value: 0,
                              message: `${criterion} score must be at least 0`
                            },
                            max: {
                              value: details.max_score,
                              message: `${criterion} score must not exceed ${details.max_score}`
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel>{criterion}</FormLabel>
                                <span className="text-sm text-muted-foreground">
                                  Weight: {details.weight * 100}%
                                </span>
                              </div>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max={details.max_score}
                                  placeholder={`Enter score (max: ${details.max_score})`}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Submit Scores"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
        </>
      ):(
        <>
        </>

      )}
      
      <Toaster position='top-right'/>
    </>
  );
};

export default ScoresForm;

