//	{ "from registerFn()" : localStorage.setItem("your_email", $email.value); }

const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const $form = document.getElementById("form");
const $email = document.getElementById("email");
const $password = document.getElementById("password");
const $zapamietajMnie = document.getElementById("zapamietajMnie");
let zapamietacUsera = false;

const $emailError = document.getElementById("emailError");
const $passwordError = document.getElementById("passwordError");

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const $main = document.querySelector("main");
const $win = document.getElementById("win");
const $los = document.getElementById("los");
const $popUp = document.getElementById("popUp");

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

function setLosFn () {
	$main.classList.add("blur");
	$popUp.classList.add("popUp");
	setTimeout(() => {
		$main.classList.remove("blur");
		$popUp.classList.remove("popUp");
	},1000);
	
	$los.classList.add("opacityUp");
	setTimeout(() => {
		$los.classList.remove("opacityUp");
		window.location.href = "index.html";
	},2000);
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
		window.location.href = "profile.html";
	},2000);
}

async function loginFn (data) {
	try {
		const response = await fetch(`${BASE_URL}auth/login`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data),
		});
		const result = await response.json();
		if (result.message == "Unauthorized") {
			console.log("result.message == Unauthorized");
			setLosFn();
		} else {
			localStorage.setItem("your_token", result.access_token);
			setWinFn();
			console.log("window.location.href = \"profile.html\";");
		}
	}
	catch (error) {
		console.error("catch (error)", error);
	}
	finally {
		console.log("response finally od loginFn();");
	}
}


$form.addEventListener("submit", (event) => {
	event.preventDefault();
	if (validateLoginForm ()) {
		console.log("Walidacja na froncie - OK. Wysyłamy request");
		const data = {
			email: $email.value,
			password: $password.value,
		};
		loginFn(data);
		localStorage.setItem("your_checked", zapamietacUsera);
		
	} else {
		console.log("nie wysyłamy request'a - nie przeszedłeś walidacji na front-end'ie");
		return;
	}
});



	
	
	
