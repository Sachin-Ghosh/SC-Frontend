import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast, Toaster } from 'sonner';
import { Loader } from 'lucide-react';
import { Trash2, Plus } from 'lucide-react';
import { Combobox } from '@/components/TeamCombobox';
// import { Combobox } from "@/components/ui/combobox";

// import { useToast } from "@/components/ui/use-toast"

const ScoresForm = () => {
  const { eventId } = useParams();
  const [eventDetail, setEventDetail] = useState(null);
  const [heatDetails, setHeatDetails] = useState(null);
  const [scoringCriteria, setScoringCriteria] = useState(null);
  const accessToken = localStorage.getItem('access-token');
  const form = useForm();
  const sportsForm = useForm({
    defaultValues: {
      heat: '',
      results: [{ registration_id: '', position: '' }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control: sportsForm.control,
    name: "results"
  });
  // const { toast } = useToast();

  const { watch: formWatch } = form;
  const { watch: sportsWatch } = sportsForm;
  const selectedHeat = formWatch('heat');
  const selectedSportHeat=sportsWatch('heat');
  const navigate=useNavigate()

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/sub-events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        // //console.log('event detail', response.data)
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
        // //console.log('Criteria',criteriaResponse.data);
        setScoringCriteria(criteriaResponse.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    getEventDetails();
  }, [eventId, accessToken]);

  useEffect(() => {
    if (selectedHeat||selectedSportHeat) {
      const getHeatDetails = async () => {
        const heatId=selectedHeat ? selectedHeat:selectedSportHeat
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/heats/${heatId}/get_heat_details`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
          // //console.log(response.data);
          setHeatDetails(response.data);
        } catch (error) {
          console.error('Error fetching heat details:', error);
        }
      };

      getHeatDetails();
    }
  }, [selectedHeat, accessToken, selectedSportHeat]);

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

      //console.log(formattedData)

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
        toast.success("Scores submitted successfully");
        navigate('/faculty-dashboard')
        form.reset();
      }
    } catch (error) {
      console.error('Error submitting scores:', error);
      toast.error({
        title: "Error submitting scores",
        description: error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
      });
    }
  };

  const onSubmitSports = async (data) => {
    try {
      const formattedData = {
        heat: data.heat,
        results: data.results.map(result => ({
          registration_id: parseInt(result.registration_id),
          position: parseInt(result.position)
        }))
      };

      //console.log(formattedData)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/scores/record_sports_results/`,
        formattedData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Sports results submitted successfully");
        navigate('/faculty-dashboard')
        sportsForm.reset();
      }
    } catch (error) {
      console.error('Error submitting sports results:', error);
      toast({
        title: "Error submitting sports results",
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
      {eventDetail?.category === 'CULTURAL'?(
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
                      {/* <Select onValueChange={field.onChange} disabled={!selectedHeat} defaultValue={field.value}> */}
                      <Combobox
                          disabled={!selectedHeat}
                            options={heatDetails?.participants?.map(p => ({
                              value: p.registration_id.toString(),
                              label: p.participant_name ? p.participant_name : p.team_name
                            })) || []}
                            {...field}
                          />
                    </FormItem>
                  )}
                />
         

              {scoringCriteria && (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Scoring Criteria</h3>
                  <ScrollArea className="h-[370px] rounded bg-white bg-opacity-40 border p-4">
                    <div className="space-y-4">
                      {Object.entries(scoringCriteria?.criteria).map(([criterion, details]) => (
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
                              value: details?.max_score,
                              message: `${criterion} score must not exceed ${details?.max_score}`
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel>{criterion}</FormLabel>
                                <span className="text-sm text-muted-foreground">
                                  Weight: {details?.weight * 100}%
                                </span>
                              </div>
                              <FormControl>
                                <div className='flex gap-2 items-center'>

                                <Input
                                  {...field}
                                  type="number"
                                  className=""
                                  step="0.1"
                                  min="0"
                                  max={details?.max_score}
                                  placeholder={`Enter score (max: ${details?.max_score})`}
                                />
                                <span>/{details?.max_score}</span>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}

                    <FormField
                      key="Negative Marking"
                      control={form.control}
                      name="scores.Negative Marking"
                      rules={{
                        required: "Negative Marking score is required",
                        min: {
                          value: 0,
                          message: "Negative Marking score must be at least 0"
                        },
                        max: {
                          value: 10,
                          message: "Negative Marking score must not exceed 10"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Negative Marking</FormLabel>
                            <span className="text-sm text-muted-foreground">
                              Default: 0
                            </span>
                          </div>
                          <FormControl>
                            <div className='flex gap-2 items-center'>
                              <Input
                                {...field}
                                type="number"
                                className=""
                                step="0.1"
                                min="0"
                                max={10}
                                placeholder="Enter Negative Marking (max: 10)"
                                defaultValue="0"
                              />
                              <span>/10</span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    </div>
                  </ScrollArea>
                </div>
              )}

              <Button type="submit" className="w-full bg-amber-950 rounded text-white" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Submit Scores"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
        </>
      ):(
        <Card className="relative z-20 max-w-5xl w-full bg-white bg-opacity-35 top-5 sm:top-0 mx-auto mt-10 mb-10">
          <CardHeader>
            <CardTitle>Sports Results Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...sportsForm}>
              <form onSubmit={sportsForm.handleSubmit(onSubmitSports)} className="space-y-6">
              <FormField
                control={sportsForm.control}
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
                        {eventDetail?.recent_heats?.map((heat) => (
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

                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col md:flex-row items-center md:items-end space-x-4">
                    <FormField
                      control={sportsForm.control}
                      name={`results.${index}.registration_id`}
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Participant</FormLabel>
                          <Combobox
                          disabled={!selectedSportHeat}
                            options={heatDetails?.participants?.map(p => ({
                              value: p.registration_id.toString(),
                              label: p.participant_name ? p.participant_name : p.team_name
                            })) || []}
                            {...field}
                          />
                        </FormItem>
                      )}
                    />
                    <div className='flex gap-2 items-end justify-start'>
                    <FormField
                      control={sportsForm.control}
                      name={`results.${index}.position`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Position</FormLabel>
                          <Select onValueChange={field.onChange} disabled={!selectedSportHeat} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Position" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[url('/vintage.jpg')] bg-cover bg-center">
                              {[1, 2, 3].map((pos) => (
                                <SelectItem key={pos} value={pos.toString()}>
                                  {pos}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="ghost" disabled={!selectedSportHeat} size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4 text-red-700" />
                    </Button>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-amber-900 text-white rounded"
                  onClick={() => append({ registration_id: '', position: '' })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Participant
                </Button>

                <Button type="submit" className="w-full bg-amber-900 text-white rounded"  disabled={sportsForm.formState.isSubmitting}>
                  {sportsForm.formState.isSubmitting ? "Submitting..." : "Submit Sports Results"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      <Toaster richColors position='top-right'/>
    </>
  );
};

export default ScoresForm;

