'use client'

import React, { useState } from 'react';
import axios from 'axios';

export default function Settings() {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const handleVisibilityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newVisibility = event.target.value === 'Public';

        try {
          const response = await axios.post('http://localhost:8000/api/about-you/updateVisibility', {
            is_visible: newVisibility,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
            setIsVisible(newVisibility);
        } catch (error) {
            console.error('Error updating visibility:', error);
            alert('Failed to update visibility. Please try again.');
        }
    };

    return (
        <main>
            <h3>Profile Visibility</h3>
            <p>Who can see your profile?</p>
            <select value={isVisible ? 'Public' : 'Private'} onChange={handleVisibilityChange}>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
            </select>
        </main>
    );
}
