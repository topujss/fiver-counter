/**
 * Alert function
 */

const alertFunction = (message, type = 'danger') => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${message}<button data-bs-dismiss="alert" class="btn-close btn-sm"></button></p>`;
};

/**
 * Email validation
 */

const isEmail = (email) => {
  let pattern = /^[a-z0-9\.-_]{1,}@[a-z0-9]{1,}\.[a-z0-9]{2,4}$/;
  return pattern.test(email);
};

/**
 * US cell validation
 */

const isCell = (cell) => {
  let pattern = /^(\+1|1)[0-9]{10}$/;
  return pattern.test(cell);
};

/**
 * age validation
 */

const isAge = (age) => {
  let pattern = /^[0-9]{1,3}$/;
  return pattern.test(age);
};

/**
 * value set LS
 */
const createLsData = (key, value) => {
  // init empty data
  let data = [];

  if (localStorage.getItem(key)) {
    // passing value by making array
    data = JSON.parse(localStorage.getItem(key));
  }

  // push data to value and passing data to json stringify
  data.push(value);

  // converting value by json.stringify
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * read ls data
 */
const readLsData = (key) => {
  if (localStorage.getItem(key)) {
    // returning data after converting
    return JSON.parse(localStorage.getItem(key));
  } else {
    return false;
  }
};

/**
 * updata ls data
 */
const updataLsData = (key, array) => {
  // returning data after converting
  localStorage.setItem(key, JSON.stringify(array));
};

/**
 * Clock
 */
const clock = () => {
  const display = document.getElementById('time');
  const time = new Date();
  let hr = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();

  /**
   * zero Added
   */
  sec >= 0 && sec <= 9 && '0' + sec;

  return (display.innerHTML = `<h4 class=" mt-2 mb-0">${hr}:${min}:${sec}</h4>`);
};

/**
 * Time countdown
 */
const futureCounter = (date, time, show, off = null, audio = null) => {
  // future time according to start_time and end_time
  let future_time = Math.floor(Math.abs(new Date(`${date} ${time}`).getTime() - Date.now()));

  // get value according to time
  let total_sec = Math.floor(future_time / 1000),
    total_min = Math.floor(total_sec / 60),
    total_hour = Math.floor(total_min / 60),
    total_day = Math.floor(total_hour / 24),
    total_week = Math.floor(total_day / 7);

  // sort time to an appropriate need
  let day = total_day - total_week * 7;
  let hour = total_hour - total_day * 24;
  let min = total_min - total_day * 24 * 60 - hour * 60;
  let sec = total_sec - total_day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;

  show.innerHTML = `${total_week} - Week / ${day} - Day / ${hour} - Hour / ${min} - Min / ${sec} - Sec`;
  // show.innerHTML = `${total_week}:${day}:${hour}:${min}:${sec}`;

  // if sec 0 stop no need to do anything
  if (total_sec <= 0) {
    audio.play();
    clearInterval(off);
  }
};

/**
 * percent counter - you can make chart type of thing with the output value
 */

const perCounter = (start_time, end_time) => {
  let diff = end_time - start_time;
  let change = end_time - Date.now();

  return Math.ceil((100 * change) / diff);
};
