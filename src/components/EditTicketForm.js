import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function EditTicketForm(props){
  const { ticket } = props;

  /* The following function "captures Form values and triggers the 'handleEditingTicketInList' method in 'TicketControl'. ...", (Lsn 38, "Behavior #2" -> "Add Event Handler in 'EditTicketForm' Along with Function to Capture Form Values"). */
  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onEditTicket({names: event.target.names.value, location: event.target.location.value, issue: event.target.issue.value, id: ticket.id});
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditTicketFormSubmission} /* new code */ 
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicket: PropTypes.func
};

export default EditTicketForm;