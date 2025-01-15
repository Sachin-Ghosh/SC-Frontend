import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const FinalResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (location.state && location.state.results) {
      setResults(location.state.results);
    }
  }, [location.state]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-900"></div>
      </div>
    );
  }

  return (
    <>
      <img src='/vintage.jpg' className='fixed object-cover h-full w-full' alt="Event background" />


    <div className="min-h-screen relative z-10 pt-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">Final Results</h1>
        <Card className="w-full max-w-4xl mx-auto bg-white bg-opacity-40">
          <CardHeader>
            <CardTitle>{results.sub_event} - {results.stage}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Status: {results.status}</p>
            <ScrollArea className="h-[60vh]">
              {results.results.map((result, index) => (
                <Card key={index} className="mb-4">
                  <CardContent>
                    <h3 className="text-xl font-semibold">{result.participant_name}</h3>
                    <p>Position: {result.position}</p>
                    <p>Registration ID: {result.registration_id}</p>
                    <p>Department: {result.department}</p>
                    <p>Year: {result.year}</p>
                    <p>Division: {result.division}</p>
                    <p>Average Score: {result.average_score}</p>
                    <p>Aura Points: {result.aura_points}</p>
                  </CardContent>
                </Card>
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

