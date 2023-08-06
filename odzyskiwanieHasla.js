const $form = document.getElementById("form");
const $email = document.getElementById("email");
const $emailError = document.getElementById("emailError");
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let entryCard = true;

function validateRegisterForm () {
	if (!emailReg.test($email.value)) {
		$email.classList.add("error");
		$emailError.classList.add("widoczny");	
		entryCard = false;
	}else{
		$email.classList.remove("error");
		$emailError.classList.remove("widoczny");
		entryCard = true;
	}
	function checkEntryCard (object) {
			if (!object) {
				return false;
			}
		return true;
	}
	return checkEntryCard(entryCard);	
}

$form.addEventListener ("submit", (event) => {
	event.preventDefault();
	if (validateRegisterForm()) {
		console.log("request OK");
		localStorage.setItem("your_email", $email.value);
		window.location.href = "sprawdzSkrzynke.html";
	} else {
		console.log("error! - validation NOT OK");
	} 
});

