const $form = dokument.getElementById("form");
const $email = document.getElementById("email");
const $password = document.getElementById("password");
const $zapamietajMnie = document.getElelmentById("zapamietajMnie");
let zapamietacUsera = false;

const $emailError = document.getElementById("emailError");
const $passwordError = document.getElementById("passwordError");

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

$form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (validateLoginForm ()) {
		console.log("wysyłamy request");
	}else{
		console.log("nie wysyłamy request'a - nie przeszedłeś walidacji na front-end'ie");
	}
});

function validateLoginForm () {
	let kartaWstepu = {
		$email: true,
		$password: true,
	};
	
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
	
	if (!$zapamietajMnie.checked) {
		zapamietacUsera = false;
	}else{
		zapamietacUsera = true;
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
	
	
	
	
