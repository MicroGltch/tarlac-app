import React, { useState, useEffect } from 'react';

const NewsForm = ({ onSubmitSuccess, newsToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        date_published: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Pre-fill form when editing
    useEffect(() => {
        if (newsToEdit) {
            setFormData({
                title: newsToEdit.title || '',
                summary: newsToEdit.summary || '',
                content: newsToEdit.content || '',
                date_published: newsToEdit.date_published?.split('T')[0] || ''
            });
        }
    }, [newsToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('summary', formData.summary);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('date_published', formData.date_published);
        if (image) {
            formDataToSend.append('image', image);
        }

        const url = newsToEdit 
            ? `http://localhost:5000/api/news/${newsToEdit.id}`
            : 'http://localhost:5000/api/news';

        const method = newsToEdit ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                body: formDataToSend
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to save news');
            }

            // Clear form
            setFormData({
                title: '',
                summary: '',
                content: '',
                date_published: ''
            });
            setImage(null);
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="news-form">
          <h2>{newsToEdit ? 'Edit News' : 'Post News'}</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    maxLength={255}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                />
            </div>

            <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData({...formData, summary: e.target.value})}
                    maxLength={1250}
                    rows={3}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={6}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="date_published">Date Published</label>
                <input
                    type="date"
                    id="date_published"
                    value={formData.date_published}
                    onChange={(e) => setFormData({...formData, date_published: e.target.value})}
                    required
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save News'}
            </button>
        </form>
    );
};

export default NewsForm;
