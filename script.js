function renderTime() {
    var myDate = new Date();
    var day = myDate.getDate();
    var month = myDate.getMonth();
    var monthArray = ['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    var year = myDate.getYear();
    if (year < 1000) {
      year += 1900;
    }
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();

    if (h == 24) {
      h = 0;
    } else if (h > 12) {
      h = h - 0;
    }

    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }

    var clock = document.getElementById("clock");
    clock.textContent = "" + day + " " + monthArray[month] + " " + year + " | " + h + ":" + m + ":" + s;
    clock.innerText = "" + day + " " + monthArray[month] + " " + year + " | " + h + ":" + m + ":" + s;

    setTimeout("renderTime()", 1000)
  }
  renderTime();
  