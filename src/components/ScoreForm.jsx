import React, { useState, useEffect } from 'react';

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
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        {isUpdate ? 'Update' : 'Add'} Score for {event.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score</label>
          <input
            id="score"
            name="score"
            type="number"
            required
            value={scoreData.score}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            required
            value={scoreData.feedback}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isUpdate ? 'Update' : 'Add'} Score
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScoreForm;