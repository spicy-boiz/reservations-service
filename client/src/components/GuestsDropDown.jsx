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
      <div className={`${styles.adults} ${styles.cell}`}>Adults</div>
      <div className={`${styles.adultsButton} ${styles.cell}`}>
        <button className={`${styles.minusButton} ${adultsNum < 2 ? styles.disabledButton : ''}`} disabled={!(adultsNum - 1)} type="button" onClick={() => decNum(setAdultsNum, adultsNum)}>-</button>
        <text>{` ${adultsNum} `}</text>
        <button className={styles.addButton} type="button" onClick={() => incNum(setAdultsNum, adultsNum)}>+</button>
      </div>
      <div className={`${styles.children} ${styles.cell}`}>
        <div>Children</div>
        <div className={styles.ages}>Ages 2-12</div>
      </div>
      <div className={`${styles.childrenButton} ${styles.cell}`}>
        <button className={`${styles.minusButton} ${childrenNum < 2 ? styles.disabledButton : ''}`} disabled={!(childrenNum)} type="button" onClick={() => decNum(setChildrenNum, childrenNum)}>-</button>
        <text>{` ${childrenNum} `}</text>
        <button className={styles.addButton} type="button" onClick={() => incNum(setChildrenNum, childrenNum)}>+</button>
      </div>
      <div className={`${styles.infants} ${styles.cell}`}>
        <div>Infants</div>
        <div className={styles.ages}>Under 2</div>
      </div>
      <div className={`${styles.infantsButton} ${styles.cell}`}>
        <button className={`${styles.minusButton} ${infantsNum < 2 ? styles.disabledButton : ''}`} disabled={!(infantsNum)} type="button" onClick={() => decNum(setInfantsNum, infantsNum)}>-</button>
        <text>{` ${infantsNum} `}</text>
        <button className={styles.addButton} type="button" onClick={() => incNum(setInfantsNum, infantsNum)}>+</button>
      </div>
      <div className={`${styles.dropdownBottomText} ${styles.cell}`}>
        <text>{'6 guests maximum. Infants don\'t count toward the number of guests.'}</text>
      </div>
      <div className={`${styles.close} ${styles.cell}`}>
        <button id={styles.closeButton} type="button" onClick={dropdown}>Close</button>
      </div>
    </div>
  );
}
GuestsDropDown.propTypes = {
  dropdown: PropTypes.func.isRequired,
  changeGuests: PropTypes.func.isRequired,
};
export default GuestsDropDown;
