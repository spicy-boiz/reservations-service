import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <div className="guest-dropdown">
      <div id="adult-dropdown-entry">Adults</div>
      <div id="adult-dropdown-button">
        <button className={`minus button ${adultsNum < 2 ? 'disabled' : ''}`} disabled={!(adultsNum - 1)} type="button" onClick={() => decNum(setAdultsNum, adultsNum)}>-</button>
        <text>{` ${adultsNum} `}</text>
        <button className="add button" type="button" onClick={() => incNum(setAdultsNum, adultsNum)}>+</button>
      </div>
      <div id="children-dropdown-entry">
        <div>Children</div>
        <div>Ages 2-12</div>
      </div>
      <div id="children-dropdown-button">
        <button className={`minus button ${childrenNum < 1 ? 'disabled' : ''}`} disabled={!(childrenNum)} type="button" onClick={() => decNum(setChildrenNum, childrenNum)}>-</button>
        <text>{` ${childrenNum} `}</text>
        <button className="add button" type="button" onClick={() => incNum(setChildrenNum, childrenNum)}>+</button>
      </div>
      <div id="infant-dropdown-entry">
        <div>Infants</div>
        <div>Under 2</div>
      </div>
      <div id="infant-dropdown-button">
        <button className={`minus button ${infantsNum < 1 ? 'disabled' : ''}`} disabled={!(infantsNum)} type="button" onClick={() => decNum(setInfantsNum, infantsNum)}>-</button>
        <text>{` ${infantsNum} `}</text>
        <button className="add button" type="button" onClick={() => incNum(setInfantsNum, infantsNum)}>+</button>
      </div>
      <div id="max-dropdown-text">
        <text>{'6 guests maximum. Infants don\'t count toward the number of guests'}</text>
      </div>
      <button id="dropdown-close-button" type="button" onClick={dropdown}>Close</button>
    </div>
  );
}
GuestsDropDown.propTypes = {
  dropdown: PropTypes.func.isRequired,
  changeGuests: PropTypes.func.isRequired,
};
export default GuestsDropDown;
