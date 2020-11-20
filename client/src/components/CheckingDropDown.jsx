import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CheckingDropDown.css';
import Calendar from './Calendar.jsx';

function CheckingDropDown({ DateSelection, setCheckInDate, setCheckOutDate, setCheckingDatesSet, checkingDatesSet, checkingDates, dropDownCheckingToggle }) {
  const [checkInDateSet, setCheckInDateSet] = useState(false);
  let lengthOfStay;
  let checkInDateStr;
  let checkOutDateStr;
  console.log(checkingDatesSet);
  if (checkingDatesSet) {
    lengthOfStay = (new Date(checkingDates[1] - checkingDates[0])).getDate();
    checkInDateStr = `${checkingDates[0].toLocaleString('default', { month: 'short' })}
      ${checkingDates[0].getDate()}, ${checkingDates[0].getFullYear()}`;
    checkOutDateStr = `${checkingDates[1].toLocaleString('default', { month: 'short' })}
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
        <div id={styles.headerTop}>
          {checkingDatesSet ? `${lengthOfStay} ${lengthOfStay > 1 ? 'nights' : 'night'}` : 'Select dates'}
        </div>
        <div id={styles.headerBottom}>
          {checkingDatesSet ? `${checkInDateStr} - ${checkOutDateStr}` : 'Add your travel dates for exact pricing'}
        </div>
      </span>
      {DateSelection}
      <Calendar setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} setCheckInDateSet={setCheckInDateSet} checkInDateSet={checkInDateSet} setCheckingDatesSet={setCheckingDatesSet} />
      <div id={styles.keyboardIconCell}>
        <div id={styles.keyboardIconContainer}>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" height="24px" width="24px">
            <path d="M29 5a2 2 0 0 1 1.995 1.85L31 7v18a2 2 0 0 1-1.85 1.995L29 27H3a2 2 0 0 1-1.995-1.85L1 25V7a2 2 0 0 1 1.85-1.995L3 5zm0 2H3v18h26zm-8 13v2H11v-2zm3-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm16-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        </div>
      </div>
      <div id={styles.bottomButtons}>
        <button id={styles.clearDatesButton} type="button" onClick={clearDates}>Clear Dates</button>
        <button id={styles.closeButton} type="button" onClick={dropDownCheckingToggle}>Close</button>
      </div>
    </div>
  );
}

CheckingDropDown.propTypes = {
  // DateSelection: PropTypes.elementType.isRequired,
  setCheckInDate: PropTypes.func.isRequired,
  setCheckOutDate: PropTypes.func.isRequired,
};
export default CheckingDropDown;
