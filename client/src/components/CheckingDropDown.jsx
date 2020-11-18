import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CheckingDropDown.css';
import Calendar from './Calendar.jsx';

function CheckingDropDown({ DateSelection, setCheckInDate, setCheckOutDate, setCheckingDatesSet, checkingDatesSet, checkingDates }) {
  const [checkInDateSet, setCheckInDateSet] = useState(false);
  let lengthOfStay;
  let checkInDateStr;
  let checkOutDateStr;
  console.log(checkingDatesSet);
  if (checkingDatesSet) {
    lengthOfStay = (new Date(checkingDates[1] - checkingDates[0])).getDate();
    checkInDateStr = `${checkingDates[0].toLocaleString('default', {month: 'short'})}
      ${checkingDates[0].getDate()}, ${checkingDates[0].getFullYear()}`;
    checkOutDateStr = `${checkingDates[1].toLocaleString('default', {month: 'short'})}
    ${checkingDates[1].getDate()}, ${checkingDates[1].getFullYear()}`;
  }
  function clearDates() {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setCheckInDateSet(false);
    setCheckingDatesSet(false);
  }
  return (
    <div className={styles.checkingDropdown}>
      <span id={styles.selectDates}>
        <div>
          {checkingDatesSet ? `${lengthOfStay} ${lengthOfStay > 1 ? 'nights' : 'night'}` : 'Select Dates'}
        </div>
        <div>
          {checkingDatesSet ? `${checkInDateStr} - ${checkOutDateStr}` : 'Add travel dates for exact pricing'}
        </div>
      </span>
      {DateSelection}
      <Calendar setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} setCheckInDateSet={setCheckInDateSet} checkInDateSet={checkInDateSet} setCheckingDatesSet={setCheckingDatesSet} />
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
