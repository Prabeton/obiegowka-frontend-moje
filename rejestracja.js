const $form = dokument.getElementById("form");
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
	// na początku ustawiamy wartości obiektu "kartaWstepu" na true
	let kartaWstepu = {
		$firstName: true,
		$lastName: true,
		$email: true,
		$password: true,
		$terms: true,
	}
	
	// *** a poniżej napiszemy ciąg dalszy funkcji walidującej *** 
	// co się zgadza z Regexem a co nie, sprwdzimy checkboxa
	// jeśli się coś nie będzie zgadzać to wyświetlimy na czerwono Error i komunikat co zrobił nie tak
	// w tym momencie zmienimy (włąściwie nadajemy) clase tych Errorów na widoczną a klasę samego diva na czerony
	// i w tym samym momencie zapiszemy prawdziwą warość konkretnego klucza w objekcie "kartaWstępu"
	// potem napiszemy i odpalimy funkcję sprawdzającą czy wszystko jest "true" => jeśli tak to dajemy 'return true'
	// jeśli nie, dajemy 'return false'
	// tę funkcję to odpalił Mariusz w returnie, więc i ja tak zrobię bo to fajnie wygląda
	
	
	
	
}