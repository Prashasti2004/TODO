import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import Controls from './Controls';
import "./App.css";

// Fetch tickets and users from the API
const fetchTickets = async () => {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const data = await response.json();
    return data.tickets || [];  // Ensure data.tickets is returned
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
};

const fetchUsers = async () => {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const data = await response.json();
    return data.users || [];  // Ensure data.users is returned
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status'); // default group by status
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority'); // default sort by priority

  // Fetch data when component mounts
  useEffect(() => {
    const getData = async () => {
      const ticketsData = await fetchTickets();
      const usersData = await fetchUsers();
      setTickets(ticketsData);
      setUsers(usersData);
    };
    getData();
  }, []);

  // Save the state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      
      {/* Pass state and set functions to Controls */}
      <Controls groupBy={groupBy} setGroupBy={setGroupBy} sortBy={sortBy} setSortBy={setSortBy} />
      
      {/* Pass tickets, users, groupBy, and sortBy to KanbanBoard */}
      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;
