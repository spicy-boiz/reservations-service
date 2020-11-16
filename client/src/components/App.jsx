import React, { useState } from 'react';
import Guests from './Guests.jsx';
import DateSelection from './DateSelection.jsx';
import GuestsDropDown from './GuestsDropDown.jsx';
import styles from './App.css';

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
    <div className={styles.mainContainer}>
      <span className={styles.mainPrice}>
        $135/night
      </span>
      <span className={styles.calendarReviews}>
        4.96
      </span>
      <DateSelection />
      <Guests dropdown={dropDownToggle} guestNum={guestsNum} dropBool={dropBool} />
      {dropBool && (
        <GuestsDropDown dropdown={dropDownToggle} changeGuests={changeGuests} />
      )}
      <button className={styles.reserveButton} type="submit">Check availability</button>
    </div>
  );
}
export default App;
