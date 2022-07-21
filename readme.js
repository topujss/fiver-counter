//Get getElements from html
const countForm = document.getElementById('count-form');
const msg = document.querySelector('.msg');
const show = document.querySelector('.card-footer');

// submit form
countForm.onsubmit = (e) => {
  e.preventDefault();

  // get form data as a object
  const { date, time } = Object.fromEntries(new FormData(e.target).entries());

  // validation
  if (!date || !time) {
    msg.innerHTML = alertFunction('Select date and time');
  }

  // nonstop timer
  let count = setInterval(() => {
    // get timestamps
    let start_time = Date.now();

    // gives time depending on future
    let end_time = new Date(date + ' ' + time);
    let future_time = Math.floor(Math.abs(end_time.getTime() - start_time));

    // get value from time
    let total_sec = Math.floor(future_time / 1000);
    let total_min = Math.floor(total_sec / 60);
    let total_hour = Math.floor(total_min / 60);
    let total_day = Math.floor(total_hour / 24);
    let total_week = Math.ceil(total_day / 7);

    // time sorter
    let hour = total_hour - total_day * 24;
    // min value = total_min - (total_day * day * min) - (hour * min)
    let min = total_min - total_day * 24 * 60 - hour * 60;
    // sec value = total_sec - (total_day * day * min * sec) - (hour * min * sec) - (min * sec)
    let sec = total_sec - total_day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;

    if (total_sec <= 0) {
      clearInterval(count);
    }

    show.innerHTML = `<h4 class="text-center fs-4">${total_day} day : ${hour} hour : ${min} min : ${sec} sec</h4>`;
  }, 1000);
};
