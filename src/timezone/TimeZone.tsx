import React, { useEffect, useState } from 'react';
import './TimeZone.css';
import { TextField, Button } from '@material-ui/core';
import moment from 'moment';
import 'moment-timezone';

const TimeZone = (props: any) => {

  let defaultItem = {
    lat: null,
    lng: null,
    status: "",
    message: null
  };
  let defaultData = {
    formattedResult: null,
    calculatedDt: ""
  };
  const [item, setItem] = useState(defaultItem);
  const [resultData, setResultData] = useState(defaultData);

  const handleLatChange = (event: any) => {
    const data = { lat: event.target.value }
    setItem(prevState => {
      return { ...prevState, ...data }
    });
  };

  const handleLngChange = (event: any) => {
    const data = { lng: event.target.value }
    setItem(prevState => {
      return { ...prevState, ...data }
    });
  };

  const getTimezone = () => {
    let url = `https://api.timezonedb.com/v2.1/get-time-zone?key=85DNWVHVKCFY&format=json&by=position&lat=${item.lat}&lng=${item.lng}`;

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        data.formatted = getConvertedDateTime(data.formatted);
        var calculatedDt = getConvertedDateTime(calcDateTime(data.zoneName));
        const dataObj = { formattedResult: data.formatted, calculatedDt: calculatedDt }
        setResultData(prevState => {
          return { ...prevState, ...dataObj }
        });
      })
      .catch(console.log);
  }

  function getConvertedDateTime(inputDate: any) {
    let result = moment(inputDate).format("MMM DD YYYY HH:mm:ss");
    return result;
  }

  function calcDateTime(zoneName: any) {
    var date = moment.utc(new Date(), "MMM DD YYYY HH:mm:ss").tz(zoneName).format("MMM DD YYYY HH:mm:ss");
    console.log(date);
    return date;
  }

  useEffect(() => {
  }, []);

  const body = (
    <div>
      <div className='row' style={{ padding: "20px" }}>
        <div className='col-12'>
          <TextField
            type='text'
            name="lat"
            value={item.lat}
            onChange={handleLatChange}
            label="Enter Latitude"
            variant={'outlined'}
            style={{ width: "250px" }}
          />
        </div>
        <div className='col-12' style={{ paddingTop: "20px" }}>
          <TextField
            type='text'
            name="lng"
            value={item.lng}
            onChange={handleLngChange}
            label="Enter Latitude"
            variant={'outlined'}
            style={{ width: "250px" }}
          />
        </div>

        <div style={{ paddingTop: "20px" }}>
          <Button variant="contained" size="small" color="primary" onClick={getTimezone}>Click here</Button>
        </div>

        <div style={{ paddingTop: "20px" }}>
          {resultData.formattedResult &&
            <div style={{ paddingTop: "20px", wordWrap: "break-word" }}><b>Local Time for submitted coordinates:</b>
              <div>{resultData.formattedResult}</div></div>
          }
          {resultData.calculatedDt &&
            <div style={{ paddingTop: "20px" }}><b>Calculated Time:</b>
              {resultData.calculatedDt}</div>
          }
        </div>
      </div>
    </div>
  );


  return (
    <div>
      {body}
    </div>
  );

}
export default TimeZone;
