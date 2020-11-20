import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CalendarDates.css';

function CalendarDates({ dates, setCheckInDate, setCheckOutDate,
  setCheckInDateSet, checkInDateSet, setCheckingDatesSet, side }) {
  function setCheckDate(date) {
    if (!checkInDateSet) {
      setCheckInDate(date);
      setCheckInDateSet(true);
    } else {
      setCheckOutDate(date);
      setCheckingDatesSet(true);
    }
  }
  const datesToHTML = dates.map((dateObj) => {
    if (dateObj !== '') {
      return (
        <td onClick={() => setCheckDate(dateObj)} className={styles.days}>{dateObj.getDate()}</td>
      );
    }
    return <td />;
  });
  console.log(side);
  return (
    <span className={`${styles.calendarDaysSpan} ${styles[side]}`}>
      <table className={`${styles.calendarDaysTable} ${styles[side]}`}>
        <tr className={styles.dayNames}>
          <th>Su</th>
          <th>Mo</th>
          <th>Tu</th>
          <th>We</th>
          <th>Th</th>
          <th>Fr</th>
          <th>Sa</th>
        </tr>
        <tr>
          {datesToHTML.slice(0, 7)}
        </tr>
        <tr>
          {datesToHTML.slice(7, 14)}
        </tr>
        <tr>
          {datesToHTML.slice(14, 21)}
        </tr>
        <tr>
          {datesToHTML.slice(21, 28)}
        </tr>
        <tr>
          {datesToHTML.slice(28, 35)}
        </tr>
        {(datesToHTML[35] !== undefined)
          && (
            <tr>
              {datesToHTML.slice(35, 41)}
            </tr>
          )}
      </table>
    </span>
  );
}
CalendarDates.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  setCheckInDate: PropTypes.func.isRequired,
  setCheckOutDate: PropTypes.func.isRequired,
};
export default CalendarDates;
