import React, { useState, useEffect } from 'react';
import {motion} from 'motion/react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const ScoreForm = ({ event, onClose }) => {
  const [scoreData, setScoreData] = useState({
    score: '',
    feedback: ''
  });
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const existingData = localStorage.getItem(`event_${event.id}`);
    if (existingData) {
      setScoreData(JSON.parse(existingData));
      setIsUpdate(true);
    }
  }, [event.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(`event_${event.id}`, JSON.stringify(scoreData));
    alert(isUpdate ? 'Score updated successfully!' : 'Score added successfully!');
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScoreData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
    
     className=" rounded-lg sm:p-6">
      <h2 className="text-xl font-bold mb-4">
        {isUpdate ? 'Update' : 'Add'} Score for {event.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score</label>
          <Input
            id="score"
            name="score"
            type="number"
            required
            value={scoreData.score}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-amber-800 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
          <Textarea
            id="feedback"
            name="feedback"
            required
            value={scoreData.feedback}
            onChange={handleChange}
            className="mt-1 block w-full border rounded border-amber-800 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            rows={4}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border bg-white border-gray-300  text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 rounded bg-amber-800 text-white  hover:bg-amber-700"
          >
            {isUpdate ? 'Update' : 'Add'} Score
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ScoreForm;