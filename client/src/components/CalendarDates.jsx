import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CalendarDates.css';

function CalendarDates({ dates, setCheckInDate, setCheckOutDate,
  setCheckInDateSet, checkInDateSet, setCheckingDatesSet, side, checkInDate, checkOutDate }) {
  const [focusedDate, setFocusedDate] = useState(undefined);
  const datesToHTML = dates.map((dateObj, index) => {
    if (dateObj !== '') {
      const checkInSecs = Boolean(checkInDate) ? checkInDate.getTime() : undefined;
      const checkOutSecs = Boolean(checkOutDate) ? checkOutDate.getTime() : undefined;
      // Fill in selected dates in black
      if (dateObj.getTime() === checkInSecs) {
        // console.log('Filled In');
        return (
          <td className={`${styles.days} ${styles.highlight} ${styles.checkIn}`} onMouseMove={(e) => setHighlightDates(dateObj)}>
            <div className={`${styles.innerCell} ${styles.filled}`}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      if (dateObj.getTime() === checkOutSecs) {
        return (
          <td className={`${styles.days} ${styles.highlight} ${styles.checkOut}`} onMouseMove={(e) => setHighlightDates(dateObj)}>
            <div className={`${styles.innerCell} ${styles.filled}`}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      // Make dates between checkIn and check out dates permanently highlight
      if (dateObj > checkInDate && dateObj < checkOutDate) {
        return (
          <td className={`${styles.days} ${styles.highlight}`} onClick={(event) => setCheckDate(dateObj, index, event)} >
            <div className={styles.innerCell}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      // Disable dates before check-in date, dates larger than 4 days after check-in date, or dates > check-out
      const fourDaysMS = 4 * 24 * 3600 * 1000;
      const datePlusFour = Boolean(checkInDate) ? new Date(checkInDate.getTime() + fourDaysMS) : undefined;
      const afterCheckOut = dateObj.getTime() > checkOutSecs
      if (dateObj < checkInDate || (dateObj.getTime() > datePlusFour) || afterCheckOut) {
        // console.log('Disabled before and larger than 4')
        return (
          <td className={`${styles.days} ${styles.blocked}`} >
            <div className={styles.innerCell}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      if (dateObj === focusedDate) {
        console.log('highlight dates');
        return (
          <td className={`${styles.days} ${styles.highlight} ${styles.focused}`} onClick={(event) => setCheckDate(dateObj, index, event)} onMouseMove={(e) => setHighlightDates(dateObj)}>
            <div className={styles.innerCell}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      if (dateObj > checkInDate && dateObj < focusedDate) {
        console.log('highlight dates');
        return (
          <td className={`${styles.days} ${styles.highlight}`} onClick={(event) => setCheckDate(dateObj, index, event)} onMouseMove={(e) => setHighlightDates(dateObj)}>
            <div className={styles.innerCell}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      // Make dates after checkIn date be able to set the highlight
      if (dateObj > checkInDate) {
        console.log('allow highlight');
        return (
          <td className={`${styles.days} ${styles.allow}`} onClick={(event) => setCheckDate(dateObj, index, event)} onMouseMove={(e) => setHighlightDates(dateObj)}>
            <div className={styles.innerCell}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      return (
        <td onClick={(event) => setCheckDate(dateObj, index, event)} className={styles.days} >
          <div className={styles.innerCell}>
            {dateObj.getDate()}
          </div>
        </td>
      );
    }
    return <td />;
  });
  function setHighlightDates(date) {
    // set dates between check-in date and moused over date to grey
    setFocusedDate(date);
  }
  function setCheckDate(date, index, event) {
    if (!checkInDateSet) {
      setCheckInDate(date);
      setCheckInDateSet(true);
    } else {
      setCheckOutDate(date);
      setCheckingDatesSet(true);
    }
  }
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
