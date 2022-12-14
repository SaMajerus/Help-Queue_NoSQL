import React from "react";
import PropTypes from "prop-types"; 
// import { v4 } from 'uuid'; 
import ReusableForm from "./ReusableForm";
import { serverTimestamp } from "firebase/firestore"; // new import!

//Firestore will now auto-generate an ID for a new document in the Ticket collection. 
function NewTicketForm(props){
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({
      names: event.target.names.value, 
      location: event.target.location.value, 
      issue: event.target.issue.value,
      //id: v4(),
      timeOpen: serverTimestamp()  // new property!
    });
  }
  
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}


NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};


export default NewTicketForm;