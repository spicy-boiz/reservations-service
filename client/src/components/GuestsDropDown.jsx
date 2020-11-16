import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './GuestsDropDown.css';

function GuestsDropDown({ dropdown, changeGuests }) {
  const [adultsNum, setAdultsNum] = useState(1);
  const [childrenNum, setChildrenNum] = useState(0);
  const [infantsNum, setInfantsNum] = useState(0);

  function incNum(func, num) {
    func(num + 1);
    if (func !== setInfantsNum) {
      changeGuests('increase');
    }
  }
  function decNum(func, num) {
    func(num - 1);
    if (func !== setInfantsNum) {
      changeGuests('decrease');
    }
  }
  return (
    <div className={styles.guestDropdown}>
      <div id={styles.adultsTextCell}>Adults</div>
      <div id={styles.adultsButton}>
        <button className={`${styles.minusButton} ${adultsNum < 2 ? styles.disabledButton : ''}`} disabled={!(adultsNum - 1)} type="button" onClick={() => decNum(setAdultsNum, adultsNum)}>-</button>
        <text>{` ${adultsNum} `}</text>
        <button className={styles.addButton} type="button" onClick={() => incNum(setAdultsNum, adultsNum)}>+</button>
      </div>
      <div id={styles.childrenTextCell}>
        <div>Children</div>
        <div>Ages 2-12</div>
      </div>
      <div id={styles.childrenButton}>
        <button className={`${styles.minusButton} ${childrenNum < 2 ? styles.disabledButton : ''}`} disabled={!(childrenNum)} type="button" onClick={() => decNum(setChildrenNum, childrenNum)}>-</button>
        <text>{` ${childrenNum} `}</text>
        <button className={styles.addButton} type="button" onClick={() => incNum(setChildrenNum, childrenNum)}>+</button>
      </div>
      <div id={styles.infantsTextCell}>
        <div>Infants</div>
        <div>Under 2</div>
      </div>
      <div id={styles.infantButton}>
        <button className={`${styles.minusButton} ${infantsNum < 2 ? styles.disabledButton : ''}`} disabled={!(infantsNum)} type="button" onClick={() => decNum(setInfantsNum, infantsNum)}>-</button>
        <text>{` ${infantsNum} `}</text>
        <button className={styles.addButton} type="button" onClick={() => incNum(setInfantsNum, infantsNum)}>+</button>
      </div>
      <div id={styles.dropdownBottomText}>
        <text>{'6 guests maximum. Infants don\'t count toward the number of guests'}</text>
      </div>
      <button id={styles.closeButton} type="button" onClick={dropdown}>Close</button>
    </div>
  );
}
GuestsDropDown.propTypes = {
  dropdown: PropTypes.func.isRequired,
  changeGuests: PropTypes.func.isRequired,
};
export default GuestsDropDown;
