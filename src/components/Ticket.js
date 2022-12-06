import React from "react";
import PropTypes from "prop-types";

function Ticket(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenTicketClicked(props.id)}>
        { /* We add a div with an onClick function. Don't forget to close out the div below! */}
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
  id: PropTypes.string, // new PropType
  whenTicketClicked: PropTypes.func // new PropType
};

export default Ticket;
