import axios from 'axios';
import React, { useEffect } from 'react';

const params = {
  "longDynamicLink": "https://tvplumdev.page.link/?link=https://tvplumdev.page.link/&apn=com.example.android&ibi=com.example.ios",
  "suffix": {
    "option": "SHORT"
  }
}
const url = 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDOCb5Yc1kWrbDbTI-X_ZjC8EArn6MnEF4';
const options = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const DynamicLinks = () => {
  useEffect(() => {
    const url = 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDOCb5Yc1kWrbDbTI-X_ZjC8EArn6MnEF4';
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const getLink = () => {
      return axios.post(url, params, options);
    }
    console.log(getLink().then(data => console.log(data)))
  }, []);

  return (
    <div>DynamicLinks</div>
  )
}

export default DynamicLinks;
