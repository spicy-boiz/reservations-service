import React from 'react';
import PropTypes from 'prop-types';
import styles from './DateSelection.css';

function DateSelection({ onDropdown, checkingDates }) {
  let checkInDefined = Boolean(checkingDates[0]);
  let checkOutDefined = Boolean(checkingDates[1]);
  // console.log('Inside DateSelection: ', checkInDefined, checkOutDefined);
  const checkInDate = checkingDates[0];
  const checkOutDate = checkingDates[1];
  let checkInDateStr = '';
  let checkOutDateStr = '';
  if (checkInDefined) {
    checkInDateStr = `${checkInDate.getMonth() + 1}/${checkInDate.getDate()}/${checkInDate.getFullYear()}`;
  }
  if (checkOutDefined) {
    checkOutDateStr = `${checkOutDate.getMonth() + 1}/${checkOutDate.getDate()}/${checkOutDate.getFullYear()}`;
  }
  return (
    <div className={`${styles.checkingContainer} ${onDropdown ? styles.dropdown : styles.notDropdown}`}>
      <span className={`${styles.checkIn} ${styles.box}`}>
        <div>Check-In</div>
        <div>{checkInDefined ? checkInDateStr : 'Add date'}</div>
      </span>
      <span className={`${styles.checkOut} ${styles.box}`}>
        <div>Check-Out</div>
        <div>{checkOutDefined ? checkOutDateStr : 'Add date'}</div>
      </span>
    </div>
  );
}

DateSelection.propTypes = {
  onDropdown: PropTypes.bool.isRequired,
  checkingDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};
export default DateSelection;
