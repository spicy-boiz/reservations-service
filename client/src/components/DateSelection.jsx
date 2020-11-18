import React from 'react';
import PropTypes from 'prop-types';
import styles from './DateSelection.css';

function DateSelection({ onDropdown, checkingDates }) {
  let checkInDefined = Boolean(checkingDates.checkInDate);
  let checkOutDefined = Boolean(checkingDates.checkOutDate);
  // console.log('Inside DateSelection: ', checkInDefined, checkOutDefined);
  console.log('Inside DateSelection: ', checkingDates.checkInDate, checkingDates.checkOutDate);
  return (
    <div className={`${styles.checkingContainer} ${onDropdown ? styles.dropdown : styles.notDropdown}`}>
      <span className={`${styles.checkIn} ${styles.box}`}>
        <div>Check-In</div>
        <div>{checkInDefined ? checkingDates.checkInDate.toString() : 'Add date'}</div>
      </span>
      <span className={`${styles.checkOut} ${styles.box}`}>
        <div>Check-Out</div>
        <div>{checkOutDefined ? checkingDates.checkOutDate.toString() : 'Add date'}</div>
      </span>
    </div>
  );
}

DateSelection.propTypes = {
  onDropdown: PropTypes.bool.isRequired,
  checkingDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};
export default DateSelection;
