/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CalendarDates.css';

function CalendarDates({ dates, setCheckInDate, setCheckOutDate,
  setCheckInDateSet, checkInDateSet, setCheckingDatesSet, side, checkInDate, checkOutDate, focusedDate, setFocusedDate, firstRender, backRender, forwardRender }) {
  const datesToHTML = dates.map((dateObj, index) => {
    if (dateObj !== '') {
      const checkInSecs = Boolean(checkInDate) ? checkInDate.getTime() : undefined;
      const checkOutSecs = Boolean(checkOutDate) ? checkOutDate.getTime() : undefined;
      const focusedDateSecs = Boolean(focusedDate) ? focusedDate.getTime() : undefined;
      const focusedCheckIn = focusedDateSecs === checkInSecs ? styles.focused : '';
      const bothDatesSet = Boolean(checkInDate) && Boolean(checkOutDate);
      // Fill in selected dates in black && allow them to be highlighted
      if (dateObj.getTime() === checkInSecs) {
        const days_highlight_checkIn = `${styles.days} ${styles.highlight} ${styles.checkIn} ${focusedCheckIn}`;
        return (
          <td className={days_highlight_checkIn} onMouseOver={bothDatesSet ? '' : () => setHighlightDates(dateObj)} onMouseLeave={bothDatesSet ? '': () => setFocusedDate(checkInDate)}>
            <div className={`${styles.innerCell} ${styles.filled}`}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      if (dateObj.getTime() === checkOutSecs) {
        const days_highlight_checkOut = `${styles.days} ${styles.highlight} ${styles.checkOut}`;
        return (
          <td className={days_highlight_checkOut} onMouseOver={() => setHighlightDates(dateObj)} onMouseLeave={bothDatesSet ? '' :() => setFocusedDate(checkInDate)}>
            <div className={`${styles.innerCell} ${styles.filled}`}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      // Make dates between checkIn and check out dates permanently highlight
      if (dateObj > checkInDate && dateObj < checkOutDate) {
        const days_highlight = `${styles.days} ${styles.highlight}`;
        return (
          <td className={days_highlight} onClick={() => setCheckDate(dateObj)}>
            <div className={styles.innerCell}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      // Disable dates before check-in date, dates > 4 days after check-in date, or dates > check-out
      const fourDaysMS = 4 * 24 * 3600 * 1000;
      const datePlusFour = Boolean(checkInDate) ? new Date(checkInDate.getTime() + fourDaysMS) : undefined;
      const afterCheckOut = dateObj.getTime() > checkOutSecs;
      if (dateObj < checkInDate || (dateObj.getTime() > datePlusFour) || afterCheckOut) {
        return (
          <td className={styles.days} >
            <div className={`${styles.innerCell} ${styles.blocked}`}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      // Make the focused date have a unique class
      if (dateObj.getTime() === focusedDateSecs) {
        return (
          <td className={`${styles.days} ${styles.highlight} ${styles.endFocus}`} onClick={() => setCheckDate(dateObj)} onMouseOver={() => setHighlightDates(dateObj)} onMouseLeave={() => setFocusedDate(checkInDate)}>
            <div className={styles.innerCell}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      // Highlight all the dates between the focused date and the checkin date
      if (dateObj > checkInDate && dateObj < focusedDate) {
        return (
          <td className={`${styles.days} ${styles.highlight}`} onClick={() => setCheckDate(dateObj)} onMouseOver={() => setHighlightDates(dateObj)} onMouseLeave={() => setFocusedDate(checkInDate)}>
            <div className={styles.innerCell}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      // Make dates after checkIn date be able to be set as the focused date
      if (dateObj > checkInDate) {
        return (
          <td className={`${styles.days} ${styles.allow}`} onClick={() => setCheckDate(dateObj)} onMouseOver={() => setHighlightDates(dateObj)} onMouseLeave={() => setFocusedDate(checkInDate)}>
            <div className={styles.innerCell}>
              {dateObj.getDate()}
            </div>
          </td>
        );
      }
      return (
        <td onClick={() => setCheckDate(dateObj)} className={styles.days} >
          <div className={styles.innerCell}>
            {dateObj.getDate()}
          </div>
        </td>
      );
    }
    return <td />;
  });
  // useEffect(() => console.log(focusedDate, 'checkin: ', checkInDate), [focusedDate]);
  function setHighlightDates(date) {
    // set dates between check-in date and moused over date to grey
    setFocusedDate(date);
  }
  function setCheckDate(date) {
    if (!checkInDateSet) {
      setFocusedDate(date);
      setCheckInDate(date);
      setCheckInDateSet(true);
    } else {
      setCheckOutDate(date);
      setCheckingDatesSet(true);
    }
  }
  return (
    <span className={`${styles.calendarDaysSpan} ${styles[side]} ${backRender ? styles.animateBack : ''} ${forwardRender ? styles.animateForward : ''}`}>
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
