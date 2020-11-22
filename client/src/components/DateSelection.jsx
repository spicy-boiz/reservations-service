import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DateSelection.css';

function DateSelection({ onDropdown, dateSelectionProps: { checkingDates, dropDownCheckingToggle } }) {
  const [focusedCheckIn, setFocusedCheckIn] = useState(false);
  const checkInDefined = Boolean(checkingDates[0]);
  const checkOutDefined = Boolean(checkingDates[1]);
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
  if (onDropdown) {
    return (
      <div className={`${styles.checkingContainer} ${styles.dropdown}`} >
        <div className={styles.insideCheckingContainer}>
          <span className={`${styles.checkIn} ${styles.box}`}>
            <div className={styles.checkLargeText}>Check-In</div>
            {/* <div className={styles.checkSmallText}>{checkInDefined ? checkInDateStr : 'Add date'}</div> */}
            <input id="checkIn-input" placeholder={focusedCheckIn ? "MM/DD/YYYY" : "Add date"} type="text" onFocus={()=>setFocusedCheckIn(!focusedCheckIn)}></input>
          </span>
          <span className={`${styles.checkOut} ${styles.box}`}>
            <div className={styles.checkLargeText}>CheckOut</div>
            <div className={styles.checkSmallText}>{checkOutDefined ? checkOutDateStr : 'Add date'}</div>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles.checkingContainer} ${onDropdown ? styles.dropdown : styles.notDropdown}`} onClick={!onDropdown ? dropDownCheckingToggle : () => (console.log('notthis'))}>
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

  // return (
  //   <div className={`${styles.checkingContainer} ${onDropdown ? styles.dropdown : styles.notDropdown}`} onClick={!onDropdown ? dropDownCheckingToggle : ()=>(console.log('notthis'))}>
  //     <div className={styles.insideCheckingContainer}>
  //       <span className={`${styles.checkIn} ${styles.box}`}>
  //         <div className={styles.checkLargeText}>Check-In</div>
  //         <div className={styles.checkSmallText}>{checkInDefined ? checkInDateStr : 'Add date'}</div>
  //       </span>
  //       <span className={`${styles.checkOut} ${styles.box}`}>
  //         <div className={styles.checkLargeText}>CheckOut</div>
  //         <div className={styles.checkSmallText}>{checkOutDefined ? checkOutDateStr : 'Add date'}</div>
  //       </span>
  //     </div>
  //   </div>
  // );
}
DateSelection.propTypes = {
  // onDropdown: PropTypes.bool.isRequired,
  // checkingDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};
export default DateSelection;
