
  const hourInput = document.getElementById('hour');
  const minuteInput = document.getElementById('minute');
  const secondInput = document.getElementById('second');
  const startButton = document.querySelector('.btn-start');
  const resetButton = document.querySelector('.btn-reset');
  const timerDisplay = document.getElementById('timer-display');

  let intervalId; 

  startButton.addEventListener('click', startTimer);

  resetButton.addEventListener('click', resetTimer);

  function startTimer() {
    const totalSeconds = (parseInt(hourInput.value) || 0) * 3600 +
      (parseInt(minuteInput.value) || 0) * 60 +
      (parseInt(secondInput.value) || 0);

    
    if (totalSeconds <= 0) {
      alert('유효한 시간을 입력해주세요.');
      return;
    }

    intervalId = setInterval(function() {
      totalSeconds--;

      if (totalSeconds <= 0) {
        clearInterval(intervalId);
        alert('타이머가 종료되었습니다.');
        return;
      }

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }, 1000);
  }

 
  function resetTimer() {
    clearInterval(intervalId);
    hourInput.value = '';
    minuteInput.value = '';
    secondInput.value = '';
    timerDisplay.textContent = '00:00:00';
  }


  function formatTime(time) {
    return time.toString().padStart(2, '0');
  }

