//New import!
import React, { useState } from 'react';
import NewTicketForm from './NewTicketForm';
import EditTicketForm from './EditTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail'; 

function TicketControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);

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
    if (this.state.selectedTicket != null) {
      //New code!
      setFormVisibleOnPage(false);
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
      }); 
    } else {
      //New code!
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
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  /* Handles deletion of a given ticket. */
  const handleDeletingTicket = (id) => {
    // new code!
    const newMainTicketList = mainTicketList.filter(ticket => ticket.id !== id);
    setMainTicketList(newMainTicketList);
    // this.setState({
    //   mainTicketList: newMainTicketList,
    //   selectedTicket: null
    // });
  }

  /* Handles showing the Edit form for a given ticket. */ 
  const handleEditClick = () => {
    this.setState({editing: true});
  }

  /* This method allows a given ticket to be Updated/Edited using the Edit form. */
  const handleEditingTicketInList = (ticketToEdit) => {
    // new code!
    const editedMainTicketList = mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    // new code!
    setMainTicketList(editedMainTicketList);
    // this.setState({
    //   mainTicketList: editedMainTicketList,
    //   editing: false,
    //   selectedTicket: null
    // });
  }

  let currentlyVisibleState = null;
  let buttonText = null; 
  
  if (this.state.editing ) {      
    currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />  //Passes methods down to 'EditTicketForm' component as Props. 
    buttonText = "Return to Ticket List";
  } else if (this.state.selectedTicket != null) {
    currentlyVisibleState = 
    <TicketDetail 
      ticket = {this.state.selectedTicket} 
      onClickingDelete = {this.handleDeletingTicket} 
      onClickingEdit = {this.handleEditClick} />
    buttonText = "Return to Ticket List";
  //Removed 'this.state'
  } else if (formVisibleOnPage) {
    currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
    buttonText = "Return to Ticket List";
  } else {
    currentlyVisibleState = 
      <TicketList 
        onTicketSelection={this.handleChangingSelectedTicket} 
        // new code!
        ticketList={mainTicketList} />;
    buttonText = "Add Ticket"; 
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={this.handleClick}>{buttonText}</button>
    </React.Fragment>
  );

}

export default TicketControl;
