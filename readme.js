// get elements from html
const count_form = document.getElementById('count-form');
const alarm_btn = document.getElementById('alarm-btn');
const percent = document.getElementById('perc');
const show = document.querySelector('.card-footer h4');
const audio = document.querySelector('audio');
const progress = document.querySelector('.progress-bar');

let count;
// while submitting form
count_form.onsubmit = (e) => {
  e.preventDefault();

  clearInterval(count);

  // get value and destructuring them by {date, time}
  const { date, time } = Object.fromEntries(new FormData(e.target).entries());

  let start_time = Date.now();
  let end_time = new Date(date + ' ' + time);

  count = setInterval(() => {
    futureCounter(date, time, show, count, audio);
    let perc = perCounter(start_time, end_time);

    if (perc > 0 && perc <= 35) {
      progress.style.backgroundColor = 'red';
    } else if (perc > 35 && perc <= 65) {
      progress.style.backgroundColor = 'yellow';
    } else if (perc > 65 && perc <= 100) {
      progress.style.backgroundColor = 'green';
    }
    // switch (progress) {
    //   case perc > 0 && perc <= 35:
    //     progress.style.backgroundColor = 'red';
    //     break;
    //   case perc > 35 && perc <= 65:
    //     progress.style.backgroundColor = 'yellow';
    //     break;
    //   case perc > 65 && perc <= 100:
    //     progress.style.backgroundColor = 'green';
    //     break;
    // }

    perc && progress.classList.replace('d-none', 'd-block');
    progress.style.width = `${perc}%`;
    progress.innerHTML = `${perc}%`; // `${100 - perc}%` - for reverse
  }, 1000);
};

alarm_btn.onclick = (e) => {
  e.preventDefault();
  audio.pause();
};
