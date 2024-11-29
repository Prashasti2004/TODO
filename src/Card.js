import React from 'react';
import { ReactComponent as PriorityIcon4 } from './Assets/SVG - Urgent Priority colour.svg';
import { ReactComponent as PriorityIcon3 } from './Assets/Img - High Priority.svg';
import { ReactComponent as PriorityIcon2 } from './Assets/Img - Medium Priority.svg';
import { ReactComponent as PriorityIcon1 } from './Assets/Img - Low Priority.svg';
import { ReactComponent as PriorityIcon0 } from './Assets/No-priority.svg';
import "./card.css";

const Card = ({ ticket, userData }) => {
  const priorityIcons = [
    <PriorityIcon0 />, // Priority 0- No Priority
    <PriorityIcon1 />, // Priority 1- Low
    <PriorityIcon2 />, // Priority 2- Medium
    <PriorityIcon3 />, // Priority 3- High
    <PriorityIcon4 />  // Priority 4- Urgent
  ];

  // Get the user's image (placeholder for now, replace with actual user images as per `userId`)
  const user = userData.find(user => user.id === ticket.userId);

  return (
    <div className="card">
      {/* Ticket ID */}
      <div className="ticket-id">{ticket.id}</div>

      {/* Ticket Title */}
      <h4 className="card-title">{ticket.title}</h4>

      {/* User Image - Top right corner */}
      <div className="user-image">
        <img src={`https://i.pravatar.cc/150?img=${user.id.slice(-1)}`} alt={user.name} />
      </div>

      {/* Priority & Tags Container */}
      <div className="priority-tags-container">
        {/* Priority Icon */}
        <div className="priority">
          {priorityIcons[ticket.priority] || <PriorityIcon0 />}
        </div>

        {/* Tags */}
        <div className="tags">
          {ticket.tag && ticket.tag.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
