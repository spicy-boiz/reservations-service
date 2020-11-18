import React from 'react';

function Fees({ listingData, checkInDate, checkOutDate }) {
  let lengthOfStay;
  if (checkInDate && checkOutDate) {
    lengthOfStay = (new Date(checkOutDate - checkInDate)).getDate();
    console.log(lengthOfStay);
  }
  return (
    <div>
      <div>
      <text>You won't be charged yet</text>
      </div>
      <div>
      <span>{`${listingData[0].fees.pernight} x ${lengthOfStay} ${lengthOfStay > 1 ? 'nights' : 'night'}`}</span>
      <span>{`${listingData[0].fees.pernight * lengthOfStay}`}</span>
      </div>
      <div>
        <span>Cleaning Fee</span>
        <span>{`${listingData[0].fees.cleaning}`}</span>
      </div>
      <div>
        <span>Service Fee</span>
        <span>{`${listingData[0].fees.service}`}</span>
      </div>
      <div>
        <span>Total</span>
        <span>{`$${listingData[0].fees.cleaning + listingData[0].fees.pernight * lengthOfStay + listingData[0].fees.service}`}</span>
      </div>
    </div>
  );
}

export default Fees;