import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CalendarDates from './CalendarDates.jsx';
import styles from './Calendar.css';

function Calendar({ setCheckInDate, setCheckOutDate }) {
  const [dateLeft, setDateLeft] = useState(new Date());
  const oneMonthUp = (new Date(dateLeft)).setMonth(dateLeft.getMonth() + 1);
  const [dateRight, setDateRight] = useState(new Date(oneMonthUp));
  function decreaseMonth() {
    const today = new Date();
    console.log("current: ", today.getYear(), "actual: ", dateLeft.getYear());
    if (dateLeft.getMonth() > today.getMonth() || dateLeft.getYear() > today.getYear()) {
      setDateLeft(new Date(dateLeft.setMonth(dateLeft.getMonth() - 1)));
      setDateRight(new Date(dateRight.setMonth(dateRight.getMonth() - 1)));
    }
  }
  function increaseMonth() {
    setDateLeft(new Date(dateLeft.setMonth(dateLeft.getMonth() + 1)));
    setDateRight(new Date(dateRight.setMonth(dateRight.getMonth() + 1)));
  }
  function createDatesArray(dateObj) {
    //create new array with 35 elements
    const dates = new Array(35);
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
        <button type="button" onClick={decreaseMonth}>{'<'}</button>
        <span>{`${dateLeft.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <span>{`${dateRight.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <button type="button" onClick={increaseMonth}>{'>'}</button>
      </div>
      <div id={styles.calendarDates}>
        <CalendarDates currMonth={dateLeft.getMonth()} dates={createDatesArray(dateLeft)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate}/>
        <CalendarDates currMonth={dateRight.getMonth()} dates={createDatesArray(dateRight)} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate}/>
      </div>
    </div>
  );
}
CalendarDates.propTypes = {
  setCheckInDate: PropTypes.func.isRequired,
  setCheckOutDate: PropTypes.func.isRequired,
};
export default Calendar;