import React, { useState } from 'react';
import PropTypes from 'prop-types';
import downArrow from '../../dist/images/arrowicondown.png';
import upArrow from '../../dist/images/arrowiconup.png';
import styles from './Guests.css';

function Guests({ dropdown, guestNum, dropBool }) {
  return (
    <button className={styles.guests} onClick={dropdown} type="button">
      <span>
        <div id={styles.GuestHeader}>Guests</div>
        <div id={styles.guestsString}>{`${guestNum} ${guestNum > 1 ? 'guests' : 'guest'}`}</div>
      </span>
      <span>
        <img className={styles.icon} src={dropBool === true ? upArrow : downArrow} alt="Up" />
      </span>
    </button>
  );
}
Guests.propTypes = {
  dropdown: PropTypes.func.isRequired,
  guestNum: PropTypes.number.isRequired,
  dropBool: PropTypes.bool.isRequired,
};
export default Guests;
