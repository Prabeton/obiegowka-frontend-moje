const $form = dokument.getElementById("form");	// na $form ustawimy sobie Listener'a na cały formularz a w nim odpalimy funkcję walidującą w warunku if()
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

$form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (validateRegisterForm ()) {
		console.log("wysyłamy request");
	}else{
		console.log("nie wysyłamy request'a - nie przeszedłeś walidacji na front-end'ie");
	}
});

function validateRegisterForm () {
	// na początku ustawiamy wartości obiektu "kartaWstepu" na true
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
	// to jest return z funkcji validateRegisterForm()
}