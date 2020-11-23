import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './DateSelection.css';

function DateSelection({ onDropdown, dateSelectionProps: { checkingDates, setCheckInDate, setCheckOutDate, dropDownCheckingToggle, setCheckInDateSet } }) {
  const checkInDefined = Boolean(checkingDates[0]);
  const checkOutDefined = Boolean(checkingDates[1]);
  const checkInDate = checkingDates[0];
  const checkOutDate = checkingDates[1];
  const [focusedCheckIn, setFocusedCheckIn] = useState(false);
  const [focusedCheckOut, setFocusedCheckOut] = useState(false);
  const [checkInInput, setCheckInInput] = useState('');
  const [checkOutInput, setCheckOutInput] = useState('');
  let checkInDateStr = '';
  let checkOutDateStr = '';
  if (checkInDefined) {
    checkInDateStr = `${checkInDate.getMonth() + 1}/${checkInDate.getDate()}/${checkInDate.getFullYear()}`;
  }
  if (checkOutDefined) {
    checkOutDateStr = `${checkOutDate.getMonth() + 1}/${checkOutDate.getDate()}/${checkOutDate.getFullYear()}`;
  }
  useEffect(() => {
    if (checkInDate) {
      setCheckInInput(checkInDateStr);
    } else {
      setCheckInInput('');
    }
  }, [checkInDate]);
  function flipCheckInFocus(e) {
    setFocusedCheckIn(!focusedCheckIn);
  }
  function flipCheckOutFocus(e) {
    setFocusedCheckOut(!focusedCheckOut);
  }
  function submitCheckIn(e) {
    e.preventDefault();
    const split = e.target.checkIn.value.split('/');
    const areNums = split.filter(((ele) => Number.isNaN(ele))).length === 0;
    const inputIsDate = split.length === 3 && areNums;
    console.log('1', e.target.checkIn.value.length, '2');
    // if (e.target.checkIn.value === '') {
    //   setCheckInDate(undefined);
    //   // setCheckInDateSet(false);
    // } else
    if (!inputIsDate) {
      window.alert('Please enter a valid date');
    } else {
      const year = split[2];
      const month = split[0] === 0 ? split[0] : parseInt(split[0], 10) - 1;
      const day = split[1];
      console.log(year,',',month,',',day);
      console.log(new Date(year, month, day));
      setCheckInDate(new Date(year, month, day));
      console.log(e.target.checkIn.value);
    }
  }
  if (onDropdown) {
    return (
      <div className={`${styles.checkingContainer} ${styles.dropdown}`} >
        <div className={styles.insideCheckingContainer}>
          <span className={`${styles.checkIn} ${styles.box}`}>
            <div className={styles.checkLargeText}>Check-In</div>
            {/* <div className={styles.checkSmallText}>{checkInDefined ? checkInDateStr : 'Add date'}</div> */}
            <form onSubmit={(e) => submitCheckIn(e)}>
              <input id="checkIn" placeholder={focusedCheckIn ? "MM/DD/YYYY" : "Add date"} type="text" onFocus={flipCheckInFocus} onBlur={(e) => (flipCheckInFocus(e))} value={checkInInput} onChange={(e) => setCheckInInput(e.target.value)} autoFocus={true}></input>
            </form>
          </span>
          <span className={`${styles.checkOut} ${styles.box}`}>
            <div className={styles.checkLargeText}>CheckOut</div>
            <form>
              <input id="checkOut-input" placeholder={focusedCheckOut ? "MM/DD/YYYY" : "Add date"} type="text" onFocus={flipCheckOutFocus} onBlur={flipCheckOutFocus} onChange={(e) => SetCheckInInput(e.target.value)} />
            </form>
            {/* <div className={styles.checkSmallText}>{checkOutDefined ? checkOutDateStr : 'Add date'}</div> */}
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
