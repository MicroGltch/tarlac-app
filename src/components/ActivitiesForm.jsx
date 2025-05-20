import React, { useState, useEffect } from 'react';

const ActivitiesForm = ({ onSubmitSuccess, activityToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '', 
        organizer: '',
        venue: ''
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [previewUrls, setPreviewUrls] = useState([]);

    useEffect(() => {
        if (activityToEdit) {
            setFormData({
                title: activityToEdit.title || '',
                date: activityToEdit.date?.split('T')[0] || '',
                time: activityToEdit.time || '', 
                organizer: activityToEdit.organizer || '',
                venue: activityToEdit.venue || ''
            });
            // If there are existing images, you might want to show them
            if (activityToEdit.images) {
                setPreviewUrls(activityToEdit.images.map(img => 
                    `http://localhost:5000/uploads/${img}`
                ));
            }
        }
    }, [activityToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);

        // Create preview URLs for the new images
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('date', formData.date);
        formDataToSend.append('time', formData.time); 
        formDataToSend.append('organizer', formData.organizer);
        formDataToSend.append('venue', formData.venue);

        // Append multiple images
        images.forEach((image, index) => {
            formDataToSend.append('images', image);
        });

        const url = activityToEdit 
            ? `http://localhost:5000/api/activities/${activityToEdit.id}`
            : 'http://localhost:5000/api/activities';

        const method = activityToEdit ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                body: formDataToSend
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to save activity');
            }

            // Clear form
            setFormData({
                title: '',
                date: '',
                time: '', 
                organizer: '',
                venue: ''
            });
            setImages([]);
            setPreviewUrls([]);
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="activities-form">
            <h2>{activityToEdit ? 'Edit Activity' : 'Add New Activity'}</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                />
            </div>

            {/* Add time input field */}
            <div className="form-group">
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="organizer">Organizer:</label>
                <input
                    type="text"
                    id="organizer"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="venue">Venue:</label>
                <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="images">Images:</label>
                <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                />
            </div>

            {previewUrls.length > 0 && (
                <div className="image-previews">
                    {previewUrls.map((url, index) => (
                        <div key={index} className="preview-container">
                            <img src={url} alt={`Preview ${index + 1}`} />
                            <button 
                                type="button" 
                                onClick={() => removeImage(index)}
                                className="remove-image"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="submit-button"
            >
                {loading ? 'Saving...' : (activityToEdit ? 'Update Activity' : 'Add Activity')}
            </button>
        </form>
    );
};

export default ActivitiesForm;