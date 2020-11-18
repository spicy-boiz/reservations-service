import React from 'react';
import PropTypes from 'prop-types';
import styles from './DateSelection.css';

function DateSelection({ onDropdown }) {
  return (
    <div className={`${styles.checkingContainer} ${onDropdown ? styles.dropdown : styles.notDropdown}`}>
      <span className={`${styles.checkIn} ${styles.box}`}>Check-In</span>
      <span className={`${styles.checkOut} ${styles.box}`}>Check-Out</span>
    </div>
  );
}

DateSelection.propTypes = {
  onDropdown: PropTypes.bool.isRequired,
};
export default DateSelection;
