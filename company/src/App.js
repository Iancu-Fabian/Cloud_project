import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        country: '',
        city: ''
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get('/api/members');
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching members', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/members', form);
            fetchMembers();
            setForm({
                firstName: '',
                lastName: '',
                birthDate: '',
                country: '',
                city: ''
            });
        } catch (error) {
            console.error('Error adding member', error);
            alert(error.response.data.message);
        }
    };

    return (
        <div className="App">
            <h1>Company Members</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
                <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} required />
                <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Country" required />
                <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" required />
                <button type="submit">Add Member</button>
            </form>
            <h2>Member List</h2>
            <ul>
                {members.map((member, index) => (
                    <li key={index}>
                        {member.firstName} {member.lastName} - {member.birthDate} - {member.city}, {member.country}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;