import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button'; // Assuming Button component exists

const EventCard = ({ event }) => {
  if (!event) {
    return null; // Don't render if event data is missing
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Optional Image Placeholder */}
      {/* <img src={`https://via.placeholder.com/400x200?text=Event+${event.id}`} alt={event.title} className="w-full h-48 object-cover"/> */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-700">{event.title || 'Untitled Event'}</h3>
        <p className="text-sm text-gray-600 mb-1">Date: {event.date || 'N/A'}</p>
        <p className="text-sm text-gray-600 mb-3">Location: {event.location || 'N/A'}</p>
        <p className="text-gray-700 text-sm mb-4">{event.description || 'No description available.'}</p>
        <Link to={`/event/${event.id}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;