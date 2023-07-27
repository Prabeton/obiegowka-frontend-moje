//	{ "from loginFn()" : localStorage.setItem("your_token", result.access_token); }
//  { "from logowanie.js" : localStorage.setItem("your_checked", zapamietacUsera); }
//	{ "from registerFn()" : localStorage.setItem("your_email", $email.value); }

const your_token = localStorage.getItem("your_token");
const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const $userContent = document.getElementById("userContent");
const $innerContent = document.getElementById("innerContent");
const logoutButton = document.querySelector(".logout");

if (!your_token) {
	$userContent.innerHTML = `<h3> Coś poszło nie tak!</h3> 
                            <p>Wystąpił błąd podczas logowania. Spróbuj ponownie później</p> 
                            <a href="logowanie.html">Wróć do strony logowania</a>`;
} else {
	  console.log("request to profile");
    getUserFn();
}

async function getUserFn () {
  try {
    const response = await fetch(`${BASE_URL}profile`, {
      method: "GET",
      headers: {Authorization: `Bearer ${your_token}`, "Content-Type": "application/json"},
    });
    const result = await response.json();
    result.forEach((item) => {
      $innerContent.innerHTML += `<li> ${item.firstName} ${item.lastName} </li>`;
    });
  }
  catch (error) {
    console.error("catch (error)", error);
  }
  finally {
    console.log("response finally od getUserFn();");
  }
}  
  
function logout() {
  localStorage.removeItem("your_token");
  localStorage.removeItem("your_checked");
  window.location.href = "logowanie.html";
}

logoutButton.addEventListener("click", () => {
logout();
});
  
const rememberNumber = Number(localStorage.getItem("your_checked"));
const rememberBoolean = Boolean(rememberNumber);

window.addEventListener("beforeunload", function (event) {
  if (rememberBoolean) {
    console.log("Zamknąłeś okno ale jesteś nadal zalogowany!");
    return;
  } else {
    localStorage.removeItem("your_token");
    localStorage.removeItem("your_checked");
  }
});
