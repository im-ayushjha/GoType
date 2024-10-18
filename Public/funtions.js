// document.addEventListener('DOMContentLoaded', function() {
  let currentPage = window.location.pathname;
  // console.log(currentPage);
  // Check if we're on the home page
  if (currentPage === '/') {

    var words;
    var b = "";
    var index = 0;
    var i = 0,
      j = 0,
      count = 0,
      total = 0;
    var time = 15,
      y;
    var currenttime = 15;
    hello(p);
    function hello(p) {
      words = p.split(" ");
      // console.log(words);
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
            let acc=0;
            if(total!==0)
              acc = (count / total) * 100;
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

    //get data from api
    // fetch('https://random-word-api.herokuapp.com/word?number=100')
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Error fetching activity:', error));

    const spans = document.getElementsByTagName("span");
    spans[0].classList.add("highlight");

    document.querySelector(".reset").addEventListener("click", reset);
    function reset() {
      i = 0;
      j = 0;
      index = 0;
      b = "";
      ////////timer reset///////////////
      total = 0;
      count = 0;
      time = currenttime;
      clearInterval(y);
      y = null;
      document.querySelector(".timer").innerHTML = "&nbsp;";
      document.querySelector(".text").disabled = false;
      document.querySelector(".text").autofocus = true;
      ///////timer reset///////////////

      /////////shuffle//////////////////
      words.sort(() => Math.random() - 0.5);
      //////////////////////////////////////////

      resettextarea();
      const paraelement = document.querySelector(".one");
      paraelement.innerHTML = "";
      for (var k = 0; k < words.length; k++) {
        const span = document.createElement("span");
        span.innerText = words[k] + " ";
        paraelement.appendChild(span);
      }
      const spans = document.getElementsByTagName("span");
      spans[0].classList.add("highlight");
      document.getElementById("typing-area").focus();
    }

    function resettextarea() {
      document.querySelector(".text").value = "";
    }

    function check(x) {
      // console.log(x.key,x.key.charCodeAt(0),x.key.length,b.length,b);
      if (x.ctrlKey || x.metaKey) {
        x.preventDefault();  // Prevent any key input when Ctrl (or Cmd) is pressed
        alert("Ctrl with any key is not allowed in Typing area!");
      }
      else if (x.key == " " && b.length>0) {
        total++;
        if (words[i] == b) {
          // console.log(words[i], b);
          count++;
          spans[i].classList.remove("incorrect");
          spans[i].classList.remove("highlight");
          spans[i].classList.add("correct");
          resettextarea();
        } else {
          spans[i].classList.remove("highlight");
          spans[i].classList.add("incorrect");
          resettextarea();
        }

        b = "";
        i++;
        if(i===words.length){
          i=0;
          words.sort(() => Math.random() - 0.5);
          //////////////////////////////////////////
        
          resettextarea();
          const paraelement = document.querySelector(".one");
          paraelement.innerHTML = "";
          for (var k = 0; k < words.length; k++) {
            const span = document.createElement("span");
            span.innerText = words[k] + " ";
            paraelement.appendChild(span);
          }
        }
        index = i;
        spans[i].classList.add("highlight");
        j = 0;
      } else if (x.key === "Backspace") {
        b = b.slice(0, -1)
      } else if (x.key === words[i][j]) {
        b += x.key;
        j++;
      } else if (x.key.length === 1 && x.key.charCodeAt(0) >= 33 && x.key.charCodeAt(0) <= 126) {
        b += x.key;
        spans[i].classList.remove("highlight");
        spans[i].classList.add("incorrect");
      }
      // else if()
    }

    const sentence = document.querySelector(".one");

      // Prevent copy and cut from the sentence div
      sentence.addEventListener('copy', (event) => {
          event.preventDefault();
          alert("Copying is not allowed!");
      });

      sentence.addEventListener('cut', (event) => {
          event.preventDefault();
          alert("Cutting is not allowed!");
      });

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
  }

  
  // let currentPage = window.location.pathname;

  // Check if we're on the signup page
  if (currentPage === '/signup') {
  // Only proceed if we're on the signup page by checking if the form exists
    const signupForm = document.getElementById('signupform');

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            const password = document.getElementById('password').value;
            const rpassword = document.getElementById('rpassword').value;
            const usernameError = document.getElementById('username-error');

            if(password !== rpassword) {
                // alert("Passwords must match!");
                usernameError.style.display = 'block';
                event.preventDefault(); // Prevent form submission if passwords don't match
            }
            console.log(password, rpassword);
        });
    } else {
        console.log("Signup form not found on this page");
    }
  }
// });