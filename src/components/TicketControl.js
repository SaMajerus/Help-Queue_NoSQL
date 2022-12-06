//New import!
import React, { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import EditTicketForm from './EditTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail'; 

function TicketControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formVisibleOnPage: false,
  //     mainTicketList: [],
  //     selectedTicket: null,
  //     editing: false // new code
  //   };  
  // }

  /* Handles mouse-click events. */
  const handleClick = () => {  
    if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      // new code!
      setSelectedTicket(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  /* Handles the form submission process (for adding a new ticket to the list). */
  const handleAddingNewTicketToList = (newTicket) => {   
    // new code!
    const newMainTicketList = mainTicketList.concat(newTicket);
    // new code!
    setMainTicketList(newMainTicketList);
    setFormVisibleOnPage(false);
  }

  /* Handles selection of a ticket with a given ID. */
  const handleChangingSelectedTicket = (id) => {
    // new code: updated variable name to 'selection'
    // so there's no clash with the state variable 'selectedTicket'
    const selection = mainTicketList.filter(ticket => ticket.id === id)[0];
    // new code!
    setSelectedTicket(selection);
  }

  /* Handles deletion of a given ticket. */
  const handleDeletingTicket = (id) => {
    const newMainTicketList = mainTicketList.filter(ticket => ticket.id !== id);
    setMainTicketList(newMainTicketList);
    // new code!
    setSelectedTicket(null);
  }

  /* Handles showing the Edit form for a given ticket. */ 
  const handleEditClick = () => {
    // new code!
    setEditing(true);
  }

  /* This method allows a given ticket to be Updated/Edited using the Edit form. */
  const handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = mainTicketList
    // new code: selectedTicket.id
    .filter(ticket => ticket.id !== selectedTicket.id)
    .concat(ticketToEdit);
    setMainTicketList(editedMainTicketList);
    // new code!
    setEditing(false);
    setSelectedTicket(null);
  }

  let currentlyVisibleState = null;
  let buttonText = null; 
  
  if (editing) {      
    currentlyVisibleState = 
      <EditTicketForm     
        ticket = {selectedTicket} 
        onEditTicket = {.handleEditingTicketInList} />;
    buttonText = "Return to Ticket List";

  } else if (selectedTicket != null) {
    currentlyVisibleState = 
      <TicketDetail 
        ticket={selectedTicket} 
        onClickingDelete={.handleDeletingTicket}
        onClickingEdit = {.handleEditClick} />;
    buttonText = "Return to Ticket List";

  } else if (formVisibleOnPage) {
    currentlyVisibleState = <NewTicketForm onNewTicketCreation={.handleAddingNewTicketToList}  />;
    buttonText = "Return to Ticket List";

  } else {
    currentlyVisibleState = 
      <TicketList 
        onTicketSelection={.handleChangingSelectedTicket} 
        // new code!
        ticketList={mainTicketList} />;
    buttonText = "Add Ticket"; 
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={.handleClick}>{buttonText}</button>
    </React.Fragment>
  );

}

export default TicketControl;
