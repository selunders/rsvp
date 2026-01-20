const weddingDayTS = Date.UTC(2026, 4, 23);

const countdown = document.querySelector("#countdown");

function difference2Parts(milliseconds) {
  // https://stackoverflow.com/a/7709914
  const secs = Math.floor(Math.abs(milliseconds) / 1000);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const millisecs = Math.floor(Math.abs(milliseconds)) % 1000;
  const multiple = (term, n) => (n !== 1 ? `${n} ${term}s` : `1 ${term}`);

  return {
    days: days,
    hours: hours % 24,
    hoursTotal: hours,
    minutesTotal: mins,
    minutes: mins % 60,
    seconds: secs % 60,
    secondsTotal: secs,
    milliSeconds: millisecs,
    get diffStr() {
      return `${multiple(`day`, this.days)}, ${multiple(
        `hour`,
        this.hours,
      )}, ${multiple(`minute`, this.minutes)} and ${multiple(
        `second`,
        this.seconds,
      )}`;
    },
    get diffStrMs() {
      return `${this.diffStr.replace(` and`, `, `)} and ${multiple(
        `millisecond`,
        this.milliSeconds,
      )}`;
    },
  };
}

const pluralize = (v) => (v === 1 ? "" : "s");
const leading0 = (v) => (v < 10 ? `0${v}` : v);

const updateCountdown = () => {
  const now = Date.now();
  const { days, hours, minutes, seconds } = difference2Parts(
    weddingDayTS - now,
  );
  countdown.textContent = `${days} day${pluralize(days)}, ${hours} hour${pluralize(hours)}, ${minutes} minute${pluralize(minutes)}, ${seconds} second${pluralize(seconds)}`;
  countdown.textContent = `${leading0(days)}:${leading0(hours)}:${leading0(minutes)}:${leading0(seconds)}`;
};

if (Date.now() > weddingDayTS) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
} else {
  if (Date.now() < weddingDayTS + 24 * 60 * 60 * 1000) {
    countdown.textContent = "🎉🥂 Today's the day! 🥂🎉";
  } else {
    countdown.remove();
  }
}
