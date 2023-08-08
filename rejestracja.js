const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const $form = document.getElementById("form"); 
const $firstName = document.getElementById("firstName");
const $lastName = document.getElementById("lastName");
const $email = document.getElementById("email");
const $password = document.getElementById("password");
const $terms = document.getElementById("terms");

const $firstNameError = document.getElementById("firstNameError");
const $lastNameError = document.getElementById("lastNameError");
const $emailError = document.getElementById("emailError");
const $passwordError = document.getElementById("passwordError");
const $termsError = document.getElementById("termsError");

const firstNameReg = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{1,19}$/;
const lastNameReg =  /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{1,19}$/;
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordReg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// without Polish symbols - lastNameReg = /^[A-Z][a-z]{1,19}$/;

const $main = document.querySelector("main");
const $win = document.getElementById("win");
const $los = document.getElementById("los");
const $popUp = document.getElementById("popUp");

function validateRegisterForm () {
	
	let kartaWstepu = {
		$firstName: true,
		$lastName: true,
		$email: true,
		$password: true,
		$terms: true,
	};
	
	
	if (!firstNameReg.test($firstName.value)) {
		$firstName.classList.add("error");
		$firstNameError.classList.add("widoczny");	
		kartaWstepu.$firstName = false;
	}else{
		$firstName.classList.remove("error");
		$firstNameError.classList.remove("widoczny");
		kartaWstepu.$firstName = true;
	}
	
	if (!lastNameReg.test($lastName.value)) {
		$lastName.classList.add("error");
		$lastNameError.classList.add("widoczny");	
		kartaWstepu.$lastName = false;
	}else{
		$lastName.classList.remove("error");
		$lastNameError.classList.remove("widoczny");
		kartaWstepu.$lastName = true;
	}
	
	if (!emailReg.test($email.value)) {
		$email.classList.add("error");
		$emailError.classList.add("widoczny");	
		kartaWstepu.$email = false;
	}else{
		$email.classList.remove("error");
		$emailError.classList.remove("widoczny");
		kartaWstepu.$email = true;
	}
		
	if (!passwordReg.test($password.value)) {
		$password.classList.add("error");
		$passwordError.classList.add("widoczny");	
		kartaWstepu.$password = false;
	}else{
		$password.classList.remove("error");
		$passwordError.classList.remove("widoczny");
		kartaWstepu.$password = true;
	}
	
	if (!$terms.checked) {
		$terms.classList.add("error");
		$termsError.classList.add("widoczny");	
		kartaWstepu.$terms = false;
	}else{
		$terms.classList.remove("error");
		$termsError.classList.remove("widoczny");
		kartaWstepu.$terms = true;
	}
	
	function sprawdzKarteWstepu (object) {
		for (let key in object) {
			if (!object[key]) {
				return false;
			}
		}
		return true;
	}
	
	return sprawdzKarteWstepu(kartaWstepu);		
	
}

function setLosFn (text) {
	$main.classList.add("blur");
	$popUp.classList.add("popUp");
	setTimeout(() => {
		$main.classList.remove("blur");
		$popUp.classList.remove("popUp");
	},1000);
	
	$los.innerHTML = text;
	$los.classList.add("opacityUp");
	setTimeout(() => {
		$los.classList.remove("opacityUp");
	},3000);
}

function setWinFn() {
	$main.classList.add("blur");
	$popUp.classList.add("popUp");
	setTimeout(() => {
		$main.classList.remove("blur");
		$popUp.classList.remove("popUp");
	},1500);
	
	$win.classList.add("opacityUp");
	setTimeout(() => {
		$win.classList.remove("opacityUp");
		window.location.href = "logowanie.html";
	},3000);
}




async function registerFn (data) {
	try {
		const response = await fetch(`${BASE_URL}auth/register`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data),
		});
		console.log("Status odpowiedzi:", response.status);
		if (response.status === 200 || response.status === 201) {
			const result = await response.json();
			console.log("status:200", result);
			setWinFn();
			
		} else if (response.status === 403) {
			setLosFn("Taki e-mail już istnieje w naszej bazie! Podaj inny e-mail")
			console.log("status === 403");
			return;
		}
	}
	catch (error) {
		console.error("catch (error)", error);
		setLosFn("Coś poszło nie tak! Możliwe przeciążenie sieci energetycznej");
	}
	finally {
		console.log("response finally");
	}
}

$form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (validateRegisterForm ()) {
		const data = {
			email: $email.value,
			firstName: $firstName.value,
			lastName: $lastName.value,
			password: $password.value,
		  };
		registerFn(data);
		localStorage.setItem("your_email", $email.value);
		console.log("Jest OK! - wysyłamy request");
	}else{
		console.log("Nie wysyłamy request'a! - nie przeszedłeś walidacji na front-endzie!");
	}
});