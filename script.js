const form = document.getElementById('form');
const firstname = document.getElementById('first-name');
const lastname = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');

// Show error state
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  const errorMessage = formControl.querySelector('p');
  errorMessage.classList.remove('hide');
  errorMessage.innerText = message;
};

// Hide error state
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  const errorMessage = formControl.querySelector('p');
  errorMessage.classList.add('hide');
};

// Check if field is blank
function checkIfBlank(inputArr) {
  inputArr.forEach(input => {
    if (input.value.length < 1) {
      showError(input, `${getFieldName(input)} cannot be empty`);
      input.placeholder = '';
    } else {
      showSuccess(input);
    }
  })
};

// Check if email is valid
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
      showSuccess(input);
      updateTextColorSuccess(input);
    } else {
      showError(input, `Looks like this is not an email`);
      updateTextColorError(input);
      input.placeholder = '';
    }
};

// Get fieldname
function getFieldName(input) {
  const id = input.id;

  if (id.includes('-')) {
    const indexOfDash = id.indexOf('-');
    const firstWord = id.charAt(0).toUpperCase() + id.slice(1, indexOfDash);
    const secondWord = id.charAt(indexOfDash + 1).toUpperCase() + id.slice(indexOfDash + 2);
    return `${firstWord} ${secondWord}`;
  } else {
    return id.charAt(0).toUpperCase() + id.slice(1);
  }
};

// Update text colors
function updateTextColorError(input) { input.style.color = 'red'; }
function updateTextColorSuccess(input) { input.style.color = 'black'; }

// Event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  checkIfBlank([firstname, lastname, password]);
  checkEmail(email);
})