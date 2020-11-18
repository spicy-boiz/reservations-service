import React, { useState } from 'react';
import styles from './Calendar.css';

function Calendar() {
  const [dateLeft, setDateLeft] = useState(new Date());
  let oneMonthUp = (new Date(dateLeft)).setMonth(dateLeft.getMonth() + 1);
  const [dateRight, setDateRight] = useState(new Date(oneMonthUp));

  return (
    <div id={styles.calendarContainer}>
      <div id={styles.calendarBar}>
        <span>{'<'}</span>
        <span>{`${dateLeft.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <span>{`${dateRight.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</span>
        <span>{'>'}</span>
      </div>
    </div>
  );
}
export default Calendar;
