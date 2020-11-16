import React, { useState } from 'react';

function Guests({ dropdown, guestNum }) {
  return (
    <button className="guests" onClick={dropdown} type="button">
      <div>Guests</div>
      <div>{`${guestNum} guest`}</div>
    </button>
  );
}

export default Guests;
