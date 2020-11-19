import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Guests from './Guests.jsx';
import DateSelection from './DateSelection.jsx';
import GuestsDropDown from './GuestsDropDown.jsx';
import CheckingDropDown from './CheckingDropDown.jsx'
import Fees from './Fees.jsx';
import styles from './App.css';
import star from '../../dist/images/star.png';

function App(props) {
  const [guestsBool, setGuestsBool] = useState(false);
  const [guestsNum, setGuests] = useState(1);
  const [checkingBool, setCheckingBool] = useState(true);
  const [checkInDate, setCheckInDate] = useState(undefined);
  const [checkOutDate, setCheckOutDate] = useState(undefined);
  const [listingData, setListingData] = useState(undefined);
  const [checkingDatesSet, setCheckingDatesSet] = useState(false);

  function getListingData() {
    const listingID = window.location.pathname.split('/')[2];
    return axios.get(`/api/listings/${listingID}`)
      .then((response) => {
        setListingData(response.data);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }
  function dropDownGuestsToggle() {
    setGuestsBool(!guestsBool);
  }
  function changeGuests(operation) {
    if (operation === 'decrease') {
      setGuests(guestsNum - 1);
    }
    if (operation === 'increase') {
      setGuests(guestsNum + 1);
    }
  }
  function dropDownCheckingToggle() {
    setCheckingBool(!checkingBool);
  }
  useEffect(() => {
    getListingData();
  }, []);
  return (
    <div className={styles.mainContainer}>
      <span className={styles.mainPrice}>
        <span id={styles.mainPriceAmount}>
          {`$${listingData === undefined ? '' : listingData[0].fees.pernight}`}
        </span>
        <span id={styles.mainPricePerNight}>/ night</span>
      </span>
      <span className={styles.calendarReviews}>
        <img id={styles.iconStar} src={star} alt="star" />
        <span id={styles.reviews}>{' 4.96'}</span>
        <span id={styles.reviewsNum}> {' (290)'}</span>
      </span>
      <DateSelection onDropdown={false} checkingDates={[checkInDate, checkOutDate]} />
      {checkingBool && (
        <CheckingDropDown DateSelection={<DateSelection onDropdown checkingDates={[checkInDate, checkOutDate]} />} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} setCheckingDatesSet={setCheckingDatesSet} checkingDatesSet={checkingDatesSet} checkingDates={[checkInDate, checkOutDate]} />)}
      <Guests dropdown={dropDownGuestsToggle} guestNum={guestsNum} guestsBool={guestsBool} />
      {guestsBool && (
        <GuestsDropDown dropdown={dropDownGuestsToggle} changeGuests={changeGuests} />
      )}
      <button className={styles.reserveButton} type="submit">{Boolean(checkingDatesSet) ? 'Reserve' : 'Check Availability'}</button>
      {checkingDatesSet
        && (<Fees listingData={listingData} checkInDate={checkInDate} checkOutDate={checkOutDate} />)}
    </div>
  );
}
export default App;
