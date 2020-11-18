import React, { useState } from 'react';
import styles from './Calendar.css';

function Calendar() {
  const [dateLeft, setDateLeft] = useState(new Date());
  const oneMonthUp = (new Date(dateLeft)).setMonth(dateLeft.getMonth() + 1);
  const [dateRight, setDateRight] = useState(new Date(oneMonthUp));
  function decreaseMonth() {
    setDateLeft(new Date(dateLeft.setMonth(dateLeft.getMonth() - 1)));
    setDateRight(new Date(dateRight.setMonth(dateRight.getMonth() - 1)));
  }
  function increaseMonth() {
    setDateLeft(new Date(dateLeft.setMonth(dateLeft.getMonth() + 1)));
    setDateRight(new Date(dateRight.setMonth(dateRight.getMonth() + 1)));
  }
  return (
    <div id={styles.calendarContainer}>
      <div id={styles.calendarBar}>
        <button type="button" onClick={decreaseMonth}>{'<'}</button>
        <span>{`${dateLeft.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <span>{`${dateRight.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <button type="button" onClick={increaseMonth}>{'>'}</button>
      </div>
    </div>
  );
}
export default Calendar;
