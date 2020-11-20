import React from 'react';
import PropTypes from 'prop-types';
import styles from './DateSelection.css';

function DateSelection({ onDropdown, checkingDates, dropDownCheckingToggle }) {
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
    <div className={`${styles.checkingContainer} ${onDropdown ? styles.dropdown : styles.notDropdown}`} onClick={!onDropdown ? dropDownCheckingToggle : ()=>(console.log('notthis'))}>
      <div className={styles.insideCheckingContainer}>
        <span className={`${styles.checkIn} ${styles.box}`}>
          <div className={styles.checkLargeText}>Check-In</div>
          <div className={styles.checkSmallText}>{checkInDefined ? checkInDateStr : 'Add date'}</div>
        </span>
        <span className={`${styles.checkOut} ${styles.box}`}>
          <div className={styles.checkLargeText}>CheckOut</div>
          <div className={styles.checkSmallText}>{checkOutDefined ? checkOutDateStr : 'Add date'}</div>
        </span>
      </div>
    </div>
  );
}

DateSelection.propTypes = {
  // onDropdown: PropTypes.bool.isRequired,
  // checkingDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};
export default DateSelection;
