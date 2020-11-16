import React, { useState } from 'react';
import Guests from './Guests.jsx';
import DateSelection from './DateSelection.jsx';
import GuestsDropDown from './GuestsDropDown.jsx';

function App(props) {
  const [dropBool, setDropBool] = useState(false);
  const [adultsNum, setAdultsNum] = useState(1);
  const [childrenNum, setChildrenNum] = useState(0);

  function dropDownToggle() {
    setDropBool(!dropBool);
    console.log(dropBool);
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
      <Guests dropdown={dropDownToggle} guestNum={adultsNum + childrenNum} />
      {dropBool && (
        <GuestsDropDown />
      )}
      <button className="reserve-button" type="submit">Check availability</button>
    </div>
  );
}
export default App;
