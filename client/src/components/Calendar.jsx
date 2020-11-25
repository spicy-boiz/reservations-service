import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import CalendarDates from './CalendarDates.jsx';
import styles from './Calendar.css';

function Calendar({ props: { setCheckInDate, setCheckOutDate, checkInDateSet, setCheckInDateSet, setCheckingDatesSet, checkInDate, checkOutDate, focusedDate, setFocusedDate } }) {
  const firstRender = useRef(true);
  const startingDate = checkInDate || new Date();
  const [dateLeft, setDateLeft] = useState(startingDate);
  const [forwardRender, setForwardRender] = useState(false);
  const [backRender, setBackRender] = useState(false);
  const dateRight = getPlusOneMonth(dateLeft);
  const offGridRightDate = getPlusOneMonth(dateRight);
  const offGridLeftDate = getMinusOneMonth(dateLeft);
  console.log('date left: ', dateLeft.toLocaleString('default', { month: 'long', year: 'numeric' }));
  useEffect(() => {
    firstRender.current = false;
  }, [dateLeft]);
  function decreaseMonth() {
    const today = new Date();
    const nextLeftDate = forwardRender ? dateRight : offGridLeftDate;
    if (offGridLeftDate.getMonth() > today.getMonth() || offGridLeftDate.getYear() > today.getYear()) {
      // setDateLeft(offGridLeftDate);
      setDateLeft(new Date(nextLeftDate));
      setBackRender(true);
      setForwardRender(false);
      // setDateRight(new Date(dateRight.setMonth(dateRight.getMonth() - 1)));
    }
  }
  function increaseMonth(bool) {
    // console.log('inside increase month: ', firstRender.current);
    // const nextLeftDate = firstRender.current ? dateRight : dateLeft;
    // setBackRender(false);
    // setForwardRender(true);
    // setDateLeft(new Date(nextLeftDate));
    // setDateLeft(new Date(dateLeft.setMonth(dateLeft.getMonth() + 1)));
    // setDateRight(new Date(dateRight.setMonth(dateRight.getMonth() + 1)));
    return () => {
      const nextLeftDate = bool ? dateLeft : dateRight;
      setBackRender(false);
      setForwardRender(true);
      setDateLeft(new Date(nextLeftDate));
    };
  }
  function getPlusOneMonth(date) {
    const tempDate = new Date(date);
    return new Date(tempDate.setMonth(date.getMonth() + 1));
  }
  function getMinusOneMonth(date) {
    const tempDate = new Date(date);
    return new Date(tempDate.setMonth(date.getMonth() - 1));
  }
  function createDatesArray(dateObj) {
    //create new array with 35 elements
    const dates = new Array(41);
    //set the date obj to the first day of the month
    const firstDayObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
    //get the day of the week of the first day of the month
    const firstDay = firstDayObj.getDay();
    //fill in the previous dates before that with empty strings
    dates.fill('', 0, firstDay);
    //set the first date to the index in the array that correponds off the day of the week
    //loop through all of the days of the month and fill in the array
    let dayCount = 1;
    let arrayIndex = firstDay;
    let movingDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dayCount);
    while (movingDate.getMonth() === dateObj.getMonth()) {
      dates[arrayIndex] = movingDate;
      arrayIndex += 1;
      movingDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dayCount += 1);
    }
    return dates;
  }
  return (
    <div id={styles.calendarContainer}>
      <div id={styles.calendarBar}>
        <button type="button" onClick={decreaseMonth}>
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
            <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd" />
          </svg>
        </button>
        <span className={`${styles.leftMonthSpan} ${backRender ? styles.animateBack : ''} ${forwardRender ? styles.animateForward : ''}`} key={Math.floor(Math.random() * 10000)}>{`${dateLeft.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <span className={`${styles.rightMonthSpan} ${backRender ? styles.animateBack : ''} ${forwardRender ? styles.animateForward : ''}`} key={Math.floor(Math.random() * 10000)}>{`${dateRight.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <button type="button" onClick={increaseMonth(firstRender.current)}>
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
            <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" />
          </svg>
        </button>
      </div>

      <div id={styles.offGridLeftBar}>
        <span className={`${styles.offGridLeftSpan} ${backRender ? styles.animateBack : ''}`} key={Math.floor(Math.random() * 10000)}>{`${offGridLeftDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
      </div>
      {!(firstRender.current)
        && <CalendarDates key={offGridLeftDate.getTime() + (new Date()).getTime()} side="offGridLeft" currMonth={offGridLeftDate.getMonth()} dates={createDatesArray(offGridLeftDate)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} checkInDateSet={checkInDateSet} setCheckInDateSet={setCheckInDateSet} setCheckingDatesSet={setCheckingDatesSet} checkInDate={checkInDate} checkOutDate={checkOutDate} focusedDate={focusedDate} setFocusedDate={setFocusedDate} firstRender={firstRender.current} forwardRender={forwardRender} backRender={backRender} />}

      <CalendarDates key={dateLeft.getTime() + (new Date()).getTime()} side="left" currMonth={dateLeft.getMonth()} dates={createDatesArray(dateLeft)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} checkInDateSet={checkInDateSet} setCheckInDateSet={setCheckInDateSet} setCheckingDatesSet={setCheckingDatesSet} checkInDate={checkInDate} checkOutDate={checkOutDate} focusedDate={focusedDate} setFocusedDate={setFocusedDate} firstRender={firstRender.current} forwardRender={forwardRender} backRender={backRender} />
      <CalendarDates key={dateRight.getTime() + (new Date()).getTime()} side="right" currMonth={dateRight.getMonth()} dates={createDatesArray(dateRight)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} checkInDateSet={checkInDateSet} setCheckInDateSet={setCheckInDateSet} setCheckingDatesSet={setCheckingDatesSet} checkInDate={checkInDate} checkOutDate={checkOutDate} focusedDate={focusedDate} setFocusedDate={setFocusedDate} firstRender={firstRender.current} forwardRender={forwardRender} backRender={backRender} />
      <div id={styles.offGridRightBar}>
        <span className={`${styles.offGridRightSpan} ${forwardRender ? styles.animateForward : ''}`} key={Math.floor(Math.random() * 10000)}>{`${offGridRightDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
      </div>
      {!(firstRender.current)
        && <CalendarDates key={offGridRightDate.getTime() + (new Date()).getTime()} side="offGridRight" currMonth={offGridRightDate.getMonth()} dates={createDatesArray(offGridRightDate)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} checkInDateSet={checkInDateSet} setCheckInDateSet={setCheckInDateSet} setCheckingDatesSet={setCheckingDatesSet} checkInDate={checkInDate} checkOutDate={checkOutDate} focusedDate={focusedDate} setFocusedDate={setFocusedDate} firstRender={firstRender.current} forwardRender={forwardRender} backRender={backRender} />}
    </div>
  );
}
CalendarDates.propTypes = {
  // setCheckInDate: PropTypes.func.isRequired,
  // setCheckOutDate: PropTypes.func.isRequired,
};
export default Calendar;
