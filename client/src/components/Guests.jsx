import React from 'react';
import PropTypes from 'prop-types';
import styles from './Guests.css';

function Guests({ dropdown, guestNum, infantsNum, guestsBool }) {
  const combinedGuests = `${guestNum} ${guestNum > 1 ? 'guests' : 'guest'}`;
  const infants = `${infantsNum > 0 ? infantsNum > 1 ? `, ${infantsNum} infants` : `, ${infantsNum} infant` : ''}`
  const combinedStr = `${combinedGuests}${infants}`;
  return (
    <button className={styles.guests} onClick={dropdown} type="button">
      <span>
        <div id={styles.GuestHeader}>Guests</div>
        <div id={styles.guestsString}>{combinedStr}</div>
      </span>
      <span>
        {guestsBool ?
          (
            <svg className={styles.icon} viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
              <path d="m1.71 13.71a1 1 0 1 1 -1.42-1.42l8-8a1 1 0 0 1 1.41 0l8 8a1 1 0 1 1 -1.41 1.42l-7.29-7.29z" fill-rule="evenodd"></path>
            </svg>
          ) :
          (
            <svg className={styles.icon} viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false">
              <path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path>
            </svg>
          )}
      </span>
    </button>
  );
}
Guests.propTypes = {
  dropdown: PropTypes.func.isRequired,
  guestNum: PropTypes.number.isRequired,
  guestsBool: PropTypes.bool.isRequired,
};
export default Guests;
