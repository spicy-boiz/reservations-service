import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckingDropDown.css';
import Calendar from './Calendar.jsx';

function CheckingDropDown({ DateSelection, setCheckInDate, setCheckOutDate, checkingDates}) {
  console.log("Check DropDown Rerender: ", checkingDates);
  return (
    <div className={styles.checkingDropdown}>
      <span id={styles.selectDates}>Select Dates</span>
      {DateSelection}
      <Calendar setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} />
      <div id={styles.keyboardIconCell}>Keyboard</div>
      <div id={styles.bottomButtons}>
        <buttons>Clear Dates</buttons>
        <buttons>Close</buttons>
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
