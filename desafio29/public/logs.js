const loginBtn = document.getElementById('Login');
const nameUser = document.getElementById('name-user');
const password = document.getElementById('password');
const errorTxt = document.getElementById('text-error');

loginBtn.addEventListener('click', ()=>{
    localStorage.setItem('nameUser', nameUser.value);
    fetch('/session/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: nameUser.value, password: password.value})
    }).then(location.href = '../index.html').catch(errorTxt.classList.remove('hide-div'));
});

//Signup
const signupBtn = document.getElementById('signup');
const nameNewUser = document.getElementById('name-new-user');
const passwordNew = document.getElementById('password-new');
const errorTxtSu = document.getElementById('text-error-su');

loginBtn.addEventListener('click', ()=>{
  localStorage.setItem('nameUser', nameNewUser.value);
  fetch('/session/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: nameNewUser.value, password: passwordNew.value})
  }).then(location.href = '../index.html').catch(errorTxtSu.classList.remove('hide-div'));
});