
const result = window.parent.document.querySelector(".displaydiv");
function formValidation() {
  display = {};
  var name = document.myForm.fname.value;
  if (name.length < 4 || name.length > 10) {
    display.error = "Length should be between 4-10 characters";
    result.innerHTML = `<div>Result:{"name":${JSON.stringify(display)}}</div>`;
    return false;
  }
  var contact = document.myForm.fcontact.value;
  if (contact.length != 10) {
    display.error = "mobile number should be of 10 digits";
    result.innerHTML = `<div>Result:{"contact":${JSON.stringify(display)}}</div>`;
    return false;
  }
  var country = document.myForm.country.value;
  if (country == "") {
    display.error = "Country field is mandatory";
    result.innerHTML = `<div>Result:{"country":${JSON.stringify(display)}}</div>`;
    return false;
  }
  var stateval = document.myForm.State.value;
  if (stateval == "") {
    display.error = "State field is mandatory";
    result.innerHTML = `<div>Result:{"state":${JSON.stringify(display)}}</div>`;
    return false;
  }
  var email = document.myForm.femail.value;
  if (email.length < 6 || !email.includes("@") || !email.includes(".")) {
    display.error = "email should be valid";
    result.innerHTML = `<div>Result:{"email":${JSON.stringify(display)}}</div>`;
    return false;
  }
  
  if (JSON.stringify(display) === "{}") {
    display.success = "All fields are valid";
    result.innerHTML = `<div>Result:${JSON.stringify(display)}</div>`;
  }

  return false;
}

let fetchRes = fetch(
  "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
);

var select = document.getElementById("con");
var stateSelect = document.getElementById("sta");
fetchRes
  .then((res) => res.json())
  .then((d) => {
    d.forEach((e) => {
      select.innerHTML += `<option value="${e.name}" >${e.name}</option>`;
      if (e.name === select.value) {
        let state = e.states;
        state.map((item) => {
          stateSelect.innerHTML += `<option value="${item.code}">${item.name}</option>`;
        });
      }
    });
  });

async function populateState() {
  let response = await fetch(
    "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
  );
  let data = await response.json();

  var options = stateSelect.getElementsByTagName("OPTION");
  for (var i = 1; i < options.length; i++) {
    stateSelect.removeChild(options[i]);
    i--;
  }

  data.forEach((e) => {
    if (e.name === select.value) {
      let state = e.states;
      state.forEach((item) => {
        stateSelect.innerHTML += `<option value="${item.code}">${item.name}</option>`;
      });
    }
  });
}

const button = document.getElementById("sub");
