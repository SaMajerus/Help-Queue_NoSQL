import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

function TicketList(props){
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket) =>  //Loop thru the list passed down from 'TicketControl'. 
        <Ticket
          whenTicketClicked = {props.onTicketSelection}
          names={ticket.names}
          location={ticket.location}
          formattedWaitTime={ticket.formattedWaitTime}  // new prop!
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id}/>
      )}
    </React.Fragment>
  );
}

//Add propTypes for ticketList 
TicketList.propTypes = {
  ticketList: PropTypes.array, 
  onTicketSelection: PropTypes.func
};

export default TicketList;