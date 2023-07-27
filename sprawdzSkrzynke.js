//	{ "from registerFn()" : localStorage.setItem("your_email", $email.value); }

const subtitle = document.querySelector(".subtitle");
const submit = document.querySelector(".submit");
const email = localStorage.getItem("your_email");

function sendEmail () {
  if (!email) {
    return;
  } else {
    subtitle.innerHTML = `Wysłaliśmy właśnie do Ciebie link na adres: ${email} Otwórz link, by móc dokończyć rejestrację i dokonać logowania.`;
  }
}

sendEmail();

submit.addEventListener("click", () => {
	localStorage.removeItem("your_email");
});

window.addEventListener("beforeunload", (event) => {
    localStorage.removeItem("your_email");
});

