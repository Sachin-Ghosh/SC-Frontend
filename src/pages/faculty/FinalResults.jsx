import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TbError404, TbPlayerRecord } from 'react-icons/tb';
import { MdError } from 'react-icons/md';
import { Trophy } from 'lucide-react';

const FinalResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchFinalResults = async () => {
    try {
      const accessToken = localStorage.getItem('access-token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/heats/${id}/view_final_results/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) throw new Error('Final Results not yet decided');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Error fetching final results:', err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFinalResults();
  }, [id]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />
        <div className='flex flex-col gap-2 items-center'>

        {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div> */}
        <MdError className='relative z-10 text-red-500' size={40}/>
        <span className='relative font-semibold text-xl'>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />

      <div className="min-h-screen relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">Final Results</h1>
          <Card className="w-full max-w-4xl mx-auto bg-white bg-opacity-90">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[60vh]">
                {/* Event Details Table */}
                {/* <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/2">Field</TableHead>
                      <TableHead className="w-1/2">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Sub Event</TableCell>
                      <TableCell>{results.sub_event}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Stage</TableCell>
                      <TableCell>{results.stage}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Round Number</TableCell>
                      <TableCell>{results.round_number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Heat Number</TableCell>
                      <TableCell>{results.heat_number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Status</TableCell>
                      <TableCell>{results.status}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table> */}

                {/* Participants Results */}
                {results.results.map((result, index) => (
                  <div key={index} className="mt-6">
                    <h3 className="text-lg font-semibold flex flex-col items-center mb-2">
                    <span className='flex flex-col items-center text-yellow-400'>{result.position}<Trophy/></span>  
                    <span className='text-amber-800'>{result.participant_name ? result.participant_name:result.team_name} </span></h3>
                    <Table>
                      <TableHeader>
                        {/* <TableRow>
                          <TableHead className="w-1/2">Field</TableHead>
                          <TableHead className="w-1/2">Value</TableHead>
                        </TableRow> */}
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Participant Name</TableCell>
                          <TableCell>{result.participant_name ? result.participant_name:result.team_name}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Position</TableCell>
                          <TableCell>{result.position}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Registration ID</TableCell>
                          <TableCell>{result.registration_id}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Department</TableCell>
                          <TableCell>{result.department}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Division</TableCell>
                          <TableCell>{result.division}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Year</TableCell>
                          <TableCell>{result.year}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Average Score</TableCell>
                          <TableCell>{result.average_score || 'N/A'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Aura Points</TableCell>
                          <TableCell>{result.aura_points}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Team Name</TableCell>
                          <TableCell>{result.team_name || 'N/A'}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <div className="mt-8 text-center">
            <Button
              className="bg-amber-800 hover:bg-amber-700 text-white"
              onClick={() => navigate(-1)}
            >
              Back to Heats
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalResults;

