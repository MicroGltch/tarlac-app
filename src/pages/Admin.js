import React, { useState, useEffect } from 'react';
import NewsForm from '../components/NewsForm';
import ActivitiesForm from '../components/ActivitiesForm';

const Admin = () => {
    const [showNewsForm, setShowNewsForm] = useState(false);
    const [showActivitiesForm, setShowActivitiesForm] = useState(false);
    const [newsList, setNewsList] = useState([]);
    const [activitiesList, setActivitiesList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('news');
    const [searchTerm, setSearchTerm] = useState('');
    const [newsToEdit, setNewsToEdit] = useState(null);
    const [activityToEdit, setActivityToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedTab === 'news') {
            fetchNews();
        } else {
            fetchActivities();
        }
    }, [selectedTab]);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/news');
            
            if (!response.ok) {
                throw new Error(`Failed to fetch news (${response.status})`);
            }

            const data = await response.json();
            setNewsList(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to load news items. Please try again later.');
            setNewsList([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchActivities = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/activities');
            
            if (!response.ok) {
                throw new Error(`Failed to fetch activities (${response.status})`);
            }

            const data = await response.json();
            setActivitiesList(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching activities:', error);
            setError('Failed to load activities. Please try again later.');
            setActivitiesList([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:5000/api/${type}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete ${type}`);
            }

            if (type === 'news') {
                await fetchNews();
            } else {
                await fetchActivities();
            }
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
            setError(`Failed to delete ${type}. Please try again later.`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item, type) => {
        if (type === 'news') {
            setNewsToEdit(item);
            setShowNewsForm(true);
        } else {
            setActivityToEdit(item);
            setShowActivitiesForm(true);
        }
    };

    const resetForms = () => {
        setShowNewsForm(false);
        setShowActivitiesForm(false);
        setNewsToEdit(null);
        setActivityToEdit(null);
        setError(null);
    };

    const filteredItems = React.useMemo(() => {
        const items = selectedTab === 'news' ? newsList : activitiesList;
        if (!searchTerm) return items;
        
        return items.filter(item =>
            (item.title || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [selectedTab, newsList, activitiesList, searchTerm]);

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Manage website content and activities</p>
            </div>
            
            <div className="dashboard-container">
                <div className="sidebar">
                    <button 
                        className={`nav-item ${selectedTab === 'news' ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedTab('news');
                            resetForms();
                        }}
                    >
                        News Management
                    </button>
                    <button 
                        className={`nav-item ${selectedTab === 'activities' ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedTab('activities');
                            resetForms();
                        }}
                    >
                        Activities Management
                    </button>
                </div>

                <div className="main-content">
                    <div className="content-header">
                        <button 
                            className="add-button" 
                            onClick={() => {
                                if (selectedTab === 'news') {
                                    setShowNewsForm(!showNewsForm);
                                    setNewsToEdit(null);
                                } else {
                                    setShowActivitiesForm(!showActivitiesForm);
                                    setActivityToEdit(null);
                                }
                                setError(null);
                            }}
                            disabled={loading}
                        >
                            {(showNewsForm || showActivitiesForm) ? '← Back' : `+ Add ${selectedTab === 'news' ? 'News' : 'Activity'}`}
                        </button>
                        {!showNewsForm && !showActivitiesForm && (
                            <input 
                                type="search" 
                                placeholder={`Search ${selectedTab}...`}
                                className="search-box"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        )}
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : (
                        <>
                            {selectedTab === 'news' ? (
                                showNewsForm ? (
                                    <NewsForm 
                                        onSubmitSuccess={() => {
                                            resetForms();
                                            fetchNews();
                                        }}
                                        newsToEdit={newsToEdit}
                                    />
                                ) : (
                                    <div className="news-items">
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map((news) => (
                                                <div key={news.id} className="news-item">
                                                    <div className="news-title">
                                                        {news.title}
                                                        <small className="news-date">
                                                            {new Date(news.date_published).toLocaleDateString()}
                                                        </small>
                                                    </div>
                                                    <div className="item-actions">
                                                        <button 
                                                            className="action-btn edit"
                                                            onClick={() => handleEdit(news, 'news')}
                                                            disabled={loading}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            className="action-btn delete"
                                                            onClick={() => handleDelete(news.id, 'news')}
                                                            disabled={loading}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-items">
                                                {searchTerm ? 'No matching news items found' : 'No news items available'}
                                            </div>
                                        )}
                                    </div>
                                )
                            ) : (
                                showActivitiesForm ? (
                                    <ActivitiesForm 
                                        onSubmitSuccess={() => {
                                            resetForms();
                                            fetchActivities();
                                        }}
                                        activityToEdit={activityToEdit}
                                    />
                                ) : (
                                    <div className="activities-items">
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map((activity) => (
                                                <div key={activity.id} className="news-item"> {/* Using news-item class for consistency */}
                                                    <div className="news-title">
                                                        {activity.title}
                                                        <small className="news-date">
                                                            {new Date(activity.date).toLocaleDateString()} at {activity.time}
                                                        </small>
                                                        <div className="activity-subtitle">
                                                            <span>{activity.organizer} • {activity.venue}</span>
                                                        </div>
                                                    </div>
                                                    <div className="item-actions">
                                                        <button 
                                                            className="action-btn edit"
                                                            onClick={() => handleEdit(activity, 'activities')}
                                                            disabled={loading}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button 
                                                            className="action-btn delete"
                                                            onClick={() => handleDelete(activity.id, 'activities')}
                                                            disabled={loading}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-items">
                                                {searchTerm ? 'No matching activities found' : 'No activities available'}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;