import React, { useState } from 'react';
import Guests from './Guests.jsx';
import DateSelection from './DateSelection.jsx';
import GuestsDropDown from './GuestsDropDown.jsx';

function App(props) {
  const [dropBool, setDropBool] = useState(false);
  const [guestsNum, setGuests] = useState(1);

  function dropDownToggle() {
    setDropBool(!dropBool);
    console.log(dropBool);
  }
  function changeGuests(operation) {
    if (operation === 'decrease') {
      setGuests(guestsNum - 1);
    }
    if (operation === 'increase') {
      setGuests(guestsNum + 1);
    }
  }
  return (
    <div className="main-container">
      <span className="main-price">
        $135/night
      </span>
      <span className="calendar-reviews">
        4.96
      </span>
      <DateSelection />
      <Guests dropdown={dropDownToggle} guestNum={guestsNum} />
      {dropBool && (
        <GuestsDropDown dropdown={dropDownToggle} changeGuests={changeGuests} />
      )}
      <button className="reserve-button" type="submit">Check availability</button>
    </div>
  );
}
export default App;
