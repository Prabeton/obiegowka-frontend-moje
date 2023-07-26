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

const firstNameReg = /^[A-Z][a-z]{1,19}$/;
const lastNameReg = /^[A-Z][a-z]{1,19}$/;
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordReg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



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

async function registerFn (data) {
	try {
		const response = await fetch(`${BASE_URL}auth/register`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data),
		});
		if (response.status === 200) {
			const result = await response.json();
			console.log("status:200", result);
			window.location.href = "sprawdzSkrzynke.html";
		} else if (response.status === 403) {
			console.log("status === 403");
			return;
		}
	}
	catch (error) {
		console.error("catch (error)", error);
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