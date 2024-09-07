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