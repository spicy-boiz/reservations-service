import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CheckingDropDown.css';
import Calendar from './Calendar.jsx';

function CheckingDropDown({ DateSelection, setCheckInDate, setCheckOutDate }) {
  const [checkInDateSet, setCheckInDateSet] = useState(false);
  function clearDates() {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setCheckInDateSet(false);
  }
  return (
    <div className={styles.checkingDropdown}>
      <span id={styles.selectDates}>Select Dates</span>
      {DateSelection}
      <Calendar setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} setCheckInDateSet={setCheckInDateSet}checkInDateSet={checkInDateSet}/>
      <div id={styles.keyboardIconCell}>Keyboard</div>
      <div id={styles.bottomButtons}>
        <button type="button" onClick={clearDates}>Clear Dates</button>
        <button type="button">Close</button>
      </div>
    </div>
  );
}

CheckingDropDown.propTypes = {
  DateSelection: PropTypes.elementType.isRequired,
  setCheckInDate: PropTypes.func.isRequired,
  setCheckOutDate: PropTypes.func.isRequired,
};
export default CheckingDropDown;
