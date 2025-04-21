import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext'; // Get addEvent function
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage'; // To show form-level errors

const AddEventPage = () => {
  const navigate = useNavigate();
  const { addEvent, loading: contextLoading, error: contextError } = useEvents(); // Use context state

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });
  // Validation errors state
  const [errors, setErrors] = useState({});
  // Submission error state
  const [submitError, setSubmitError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear specific field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Basic form validation
  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.';
      formIsValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
      formIsValid = false;
    }
    if (!formData.date) {
        newErrors.date = 'Date is required.';
        formIsValid = false;
    } else if (new Date(formData.date) < new Date().setHours(0,0,0,0) ) {
         // Optional: Prevent past dates
         // newErrors.date = 'Date cannot be in the past.';
         // formIsValid = false;
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setSubmitError(null); // Clear previous submission errors

    if (validateForm()) {
      try {
        // Call the addEvent function from context
        const addedEvent = await addEvent(formData);
        console.log('Event added successfully:', addedEvent);
        // Navigate to the homepage or the new event's detail page after success
        navigate('/'); // Redirect to homepage
        // Or: navigate(`/event/${addedEvent.id}`);
      } catch (error) {
         console.error('Failed to submit event:', error);
         // Display error message to the user
         // Use the error message from context if available, otherwise a generic one
         setSubmitError(contextError || 'An unexpected error occurred. Please try again.');
      }
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Event</h1>

      {/* Display submission error message */}
      {submitError && <ErrorMessage message={submitError} />}
      {/* Also display context error if it's relevant and not a submission-specific one */}
      {contextError && !submitError && <ErrorMessage message={contextError} />}


      <form onSubmit={handleSubmit} noValidate> {/* noValidate disables browser's default validation */}
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Date Field */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
             min={new Date().toISOString().split('T')[0]} // Optional: Prevent past dates via HTML5 attr
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>

        {/* Location Field */}
        <div className="mb-6">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" variant="primary" disabled={contextLoading}>
            {contextLoading ? 'Adding Event...' : 'Add Event'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEventPage;