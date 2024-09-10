var words;
var b = "";
var index = 0;
var i = 0,
  j = 0,
  count = 0,
  total = 1;
var time = 15,
  y;
var currenttime = 15;
hello(p);
function hello(p) {
  words = p.split(" ");
  console.log(words);
}
//logic for checkboxes
var checkboxes = document.querySelectorAll('input[name="option"]');
checkboxes.forEach(function (i) {
  i.addEventListener("change", function () {
    if (this.checked) {
      checkboxes.forEach(function (other) {
        if (other !== i) {
          other.checked = false;
        }
      });
      if (this.id == "first") time = 15;
      else if (this.id == "second") time = 30;
      else if (this.id == "third") time = 60;

      currenttime = time;
      clearInterval(y);
      reset();
    }
  });
});

//function for timer
function starttimer() {
  if (!y) {
    y = setInterval(function () {
      document.querySelector(".timer").innerHTML = time;
      time--;
      if (time == -1) {
        clearInterval(y);
        // console.log(total,count);
        var acc = (count / total) * 100;
        var wpm;
        if (currenttime == 15) wpm = count * 4;
        if (currenttime == 30) wpm = count * 2;
        if (currenttime == 60) wpm = count;
        resettextarea();
        document.querySelector(".text").disabled = true;
        document.querySelector(".timer").innerHTML =
          "&nbsp;Wpm : " +
          wpm +
          "&nbsp; &nbsp; Accuracy : " +
          acc.toFixed(2) +
          "%";

        const data = {
          Wpm: wpm,
          Acc: acc.toFixed(2),
        };

        fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => response.json());
      }
    }, 1000);
  }
}

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}

// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
    document.getElementById("slider").checked = false;
  } else {
    setTheme("theme-light");
    document.getElementById("slider").checked = true;
  }
})();

update();
function update() {
  const paraelement = document.querySelector(".one");
  paraelement.innerHTML = "&nbsp;";
  for (var i = 0; i < words.length; i++) {
    const span = document.createElement("span");
    span.innerText = words[i] + " ";
    paraelement.appendChild(span);
  }
  document.querySelector(".text").addEventListener("keydown", function (event) {
    check(event);
  });
}