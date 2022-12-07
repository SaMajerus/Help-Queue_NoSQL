import React, { useEffect, useState } from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import db from './../firebase.js';

function TicketControl() {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);

  // new code!
  const [error, setError] = useState(null);

  useEffect(() => { 
    const unSubscribe = onSnapshot(
      collection(db, "tickets"), 

      //This callback function handles creating an array of Tickets. 
      (collectionSnapshot) => {    //'collectionSnapshot' represents the returned collection from our Firebase DB. (Lsn 13). 
        const tickets = [];
        collectionSnapshot.forEach((doc) => {    //"...We're actually calling a QuerySnapshot method..." (Lsn 13). 
          tickets.push({
            names: doc.data().names, 
            location: doc.data().location, 
            issue: doc.data().issue, 
            id: doc.id    //A given Ticket's Id prop is created, and is set to the auto-generated ID from Firestore. (Lsn 13). 
          });
        });
        setMainTicketList(tickets);
      }, 
      (error) => {
        // new code!
        setError(error.message);
      }
    );

    return () => unSubscribe();  //"Unsubscribe" in this context means to "stop the database listener" (Lsn 13).  
  }, []); 



  
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
  const handleAddingNewTicketToList = async (newTicketData) => {
    //await addDoc(collection(db, "tickets"), newTicketData);  //(One-line version of the next two lines) 
    const collectionRef = collection(db, "tickets");
    await addDoc(collectionRef, newTicketData);

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
  const handleDeletingTicket = async (id) => {
    await deleteDoc(doc(db, "tickets", id));
    setSelectedTicket(null);
  } 

  /* Handles showing the Edit form for a given ticket. */ 
  const handleEditClick = () => {
    // new code!
    setEditing(true);
  }

  /* This method allows a given ticket to be Updated/Edited using the Edit form. */
  const handleEditingTicketInList = async (ticketToEdit) => {
    const ticketRef = doc(db, "tickets", ticketToEdit.id);
    await updateDoc(ticketRef, ticketToEdit);
    setEditing(false);
    setSelectedTicket(null);
  }

  let currentlyVisibleState = null;
  let buttonText = null; 
  
  // new code!
  if (error) {
    currentlyVisibleState = <p>There was an error: {error}</p>;
  } else if (editing) {         
    currentlyVisibleState = 
      <EditTicketForm     
        ticket = {selectedTicket} 
        onEditTicket = {handleEditingTicketInList} />;
    buttonText = "Return to Ticket List";

  } else if (selectedTicket != null) {
    currentlyVisibleState = 
      <TicketDetail 
        ticket={selectedTicket} 
        onClickingDelete={handleDeletingTicket}
        onClickingEdit = {handleEditClick} />;
    buttonText = "Return to Ticket List";

  } else if (formVisibleOnPage) {
    currentlyVisibleState = <NewTicketForm onNewTicketCreation={handleAddingNewTicketToList}  />;
    buttonText = "Return to Ticket List";

  } else {
    currentlyVisibleState = 
      <TicketList 
        onTicketSelection={handleChangingSelectedTicket} 
        // new code!
        ticketList={mainTicketList} />;
    buttonText = "Add Ticket"; 
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      {/* New code below! */}
      {error ? null : <button onClick={handleClick}>{buttonText}</button>}
    </React.Fragment>
  );

}

export default TicketControl;
