import React, { useState } from 'react';

function Guests({ dropdown, guestNum }) {
  return (
    <button className="guests" onClick={dropdown} type="button">
      <div>Guests</div>
      <div>{`${guestNum} ${guestNum > 1 ? 'guests' : 'guest'}`}</div>
    </button>
  );
}

export default Guests;
