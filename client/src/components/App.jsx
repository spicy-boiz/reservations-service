import React, { useState, useEffect } from 'react';
import Guests from './Guests.jsx';
import DateSelection from './DateSelection.jsx';
import GuestsDropDown from './GuestsDropDown.jsx';
import CheckingDropDown from './CheckingDropDown.jsx'
import styles from './App.css';

function App(props) {
  const [guestsBool, setGuestsBool] = useState(false);
  const [guestsNum, setGuests] = useState(1);
  const [checkingBool, setCheckingBool] = useState(true);
  const [checkInDate, setCheckInDate] = useState(undefined);
  const [checkOutDate, setCheckOutDate] = useState(undefined);

  function dropDownGuestsToggle() {
    setGuestsBool(!guestsBool);
  }
  function changeGuests(operation) {
    if (operation === 'decrease') {
      setGuests(guestsNum - 1);
    }
    if (operation === 'increase') {
      setGuests(guestsNum + 1);
    }
  }
  function dropDownCheckingToggle() {
    setCheckingBool(!checkingBool);
  }
  useEffect(() => {
    console.log('UseEffect: ', checkInDate);
    console.log('UseEffect: ', checkOutDate);
  }, [checkInDate, checkOutDate]);
  return (
    <div className={styles.mainContainer}>
      <span className={styles.mainPrice}>
        $135/night
      </span>
      <span className={styles.calendarReviews}>
        4.96
      </span>
      <DateSelection onDropdown={false} checkingDates={[checkInDate, checkOutDate]} />
      {checkingBool
      && (<CheckingDropDown DateSelection={<DateSelection onDropdown checkingDates={[checkInDate, checkOutDate]} />} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate}/>)}
      <Guests dropdown={dropDownGuestsToggle} guestNum={guestsNum} guestsBool={guestsBool} />
      {guestsBool && (
        <GuestsDropDown dropdown={dropDownGuestsToggle} changeGuests={changeGuests} />
      )}
      <button className={styles.reserveButton} type="submit">Check availability</button>
    </div>
  );
}
export default App;
