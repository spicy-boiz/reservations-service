import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Title.css'

function Title() {
  const [titleText, setTitle] = useState('');
  useEffect(() => {
    const listingID = window.location.pathname.split('/')[2];
    return axios.get(`/api/listings/${Number.isNaN(listingID) ? 0 : listingID}`)
      .then((response) => {
        console.log(response);
        setTitle(response.data[0].name);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <h1 id={styles.title}>{titleText}</h1>
  );
}

export default Title;
