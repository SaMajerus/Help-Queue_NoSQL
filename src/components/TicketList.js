import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

/*
const mainTicketList = [
  {
    names: 'Thato and Haley',
    location: '3A',
    issue: 'Firebase won\'t save record. Halp.'
  },
  {
    names: 'Sleater and Kinney',
    location: '4B',
    issue: 'Prop types are throwing an error.'
  },
  {
    names: 'Imani & Jacob',
    location: '9F',
    issue: 'Child component isn\'t rendering.'
  }
];   */

function TicketList(props){
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket) =>  //Loop thru the list passed down from 'TicketControl'. 
        <Ticket
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
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