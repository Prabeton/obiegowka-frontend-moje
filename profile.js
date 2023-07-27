//	{ "from loginFn()" : localStorage.setItem("your_token", result.access_token); }
const your_token = localStorage.getItem("your_token");
const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const $userContent = document.getElementById("userContent");
const $innerContent = document.getElementById("innerContent");
const logoutButton = document.querySelector(".logout");
const notLogged = true;

if (notLogged) {
	$userContent.innerHTML = `<h3> Coś poszło nie tak!</h3> 
                            <p>Wystąpił błąd podczas logowania. Spróbuj ponownie później</p> 
                            <a href="logowanie.html">Wróć do strony logowania</a>`;
  } else {
	console.log("profile request")
  }
  
  logoutButton.addEventListener("click", () => {
	logout();
  });
  
  function logout() {
	window.location.href = "logowanie.html";
  }
