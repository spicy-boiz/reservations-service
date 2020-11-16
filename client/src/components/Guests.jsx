import React, { useState } from 'react';
import downArrow from '../../dist/images/arrowicondown.png';
import upArrow from '../../dist/images/arrowiconup.png';
import styles from './Guests.css';

function Guests({ dropdown, guestNum, dropBool }) {
  return (
    <button className={styles.guests} onClick={dropdown} type="button">
      <span>
        <div>Guests</div>
        <div>{`${guestNum} ${guestNum > 1 ? 'guests' : 'guest'}`}</div>
      </span>
      <span>
        <img className={styles.icon} src={dropBool === true ? upArrow : downArrow} alt="Up" />
      </span>
    </button>
  );
}

export default Guests;
