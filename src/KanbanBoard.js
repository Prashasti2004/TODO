import React from 'react';
import Card from './Card';
import { ReactComponent as BacklogIcon } from './Assets/Backlog.svg';  // Backlog Icon
import { ReactComponent as TodoIcon } from './Assets/To-do.svg';  // Todo Icon
import { ReactComponent as InProgressIcon } from './Assets/in-progress.svg';  // In-Progress Icon
import { ReactComponent as DoneIcon } from './Assets/Done.svg';  // Done Icon
import { ReactComponent as CancelledIcon } from './Assets/Cancelled.svg';  // Cancelled Icon
import { ReactComponent as Urgent } from './Assets/SVG - Urgent Priority colour.svg';  // Urgent Priority Icon
import { ReactComponent as High } from './Assets/Img - High Priority.svg';  // High Priority Icon
import { ReactComponent as Medium } from './Assets/Img - Medium Priority.svg';  // Medium Priority Icon
import { ReactComponent as Low } from './Assets/Img - Low Priority.svg';  // Low Priority Icon
import { ReactComponent as NoPriority } from './Assets/No-priority.svg';  // No Priority Icon
import { ReactComponent as PlusIcon } from './Assets/add.svg';  // Plus Icon (for adding)
import { ReactComponent as EllipsisIcon } from './Assets/3 dot menu.svg';  // Ellipsis Icon (for options)
import './kanban.css';

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  // Fixed groups for Status, Priority, and User
  const statusGroups = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
  const priorityGroups = ['0', '4', '3', '2', '1']; // Fixed priority groups
  const userGroups = users.map(user => user.id);  // Use user IDs to group tickets by user

  // Group tickets based on selected criteria (groupBy)
  const groupedTickets = tickets.reduce((groups, ticket) => {
    const groupKey = ticket[groupBy] || 'No Group'; // Default group
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(ticket);
    return groups;
  }, {});

  // Sort tickets within each group
  Object.keys(groupedTickets).forEach((group) => {
    if (sortBy === 'priority') {
      groupedTickets[group].sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      groupedTickets[group].sort((a, b) => a.title.localeCompare(b.title));
    }
  });

  // Function to render user avatar and name
  const renderUserAvatar = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? (
      <div className="user-avatar">
        <img src={user.avatar} alt={user.name} className="user-avatar-image" />
        <span>{user.name}</span>
      </div>
    ) : (
      <span>No User</span>
    );
  };

  // Function to render the correct priority group header
  const renderPriorityGroupName = (group) => {
    switch (group) {
      case '4': return 'Urgent';
      case '3': return 'High';
      case '2': return 'Medium';
      case '1': return 'Low';
      case '0': return 'No Priority';
      default: return 'No Priority';
    }
  };

  // Function to render the correct status group header
  const renderStatusGroupName = (group) => {
    switch (group) {
      case 'Backlog': return 'Backlog';
      case 'Todo': return 'To Do';
      case 'In progress': return 'In Progress';
      case 'Done': return 'Done';
      case 'Cancelled': return 'Cancelled';
      default: return group;  // In case of any other status group
    }
  };

  // Render Kanban Columns with custom icons for each group header
  return (
    <div className="kanban-board">
      {/* Render each group */}
      {(groupBy === 'status' ? statusGroups : groupBy === 'priority' ? priorityGroups : userGroups).map(group => (
        <div key={group} className="kanban-column">
          <div className="column-header">
            <div className="column-header-content">
              {/* Render the appropriate icon based on the group */}
              {group === 'Backlog' && <BacklogIcon className="group-icon row-item" />}
              {group === 'Todo' && <TodoIcon className="group-icon row-item" />}
              {group === 'In progress' && <InProgressIcon className="group-icon row-item" />}
              {group === 'Done' && <DoneIcon className="group-icon row-item" />}
              {group === 'Cancelled' && <CancelledIcon className="group-icon row-item" />}
              {group === '4' && <Urgent className="group-icon row-item" />}
              {group === '3' && <High className="group-icon row-item" />}
              {group === '2' && <Medium className="group-icon row-item" />}
              {group === '1' && <Low className="group-icon row-item" />}
              {group === '0' && <NoPriority className="group-icon row-item" />}
              {userGroups.includes(group) && renderUserAvatar(group)}  {/* Render User Avatar and Name */}
              
              {/* Group name and number of items */}
              <h3 className="row-item">
                {groupBy === 'priority' ? renderPriorityGroupName(group) : renderStatusGroupName(group)} 
                ({groupedTickets[group]?.length || 0})
              </h3>  

              {/* Add "+" and "..." icons */}
              <PlusIcon className="action-icon row-item" />
              <EllipsisIcon className="action-icon row-item" />
            </div>
          </div>

          {/* Render tickets within the group */}
          {groupedTickets[group] && groupedTickets[group].map(ticket => (
            <Card key={ticket.id} ticket={ticket} userData={users} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
