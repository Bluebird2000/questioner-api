(() => {
	const left = document.querySelector('.left');
	const right = document.querySelector('.right');
	const container = document.querySelector('.form-container');
	left.addEventListener('mouseenter', () => {
		container.classList.add('hover-left');
	});
	left.addEventListener('mouseleave', () => {
		container.classList.remove('hover-left');
	});
	right.addEventListener('mouseenter', () => {
		container.classList.add('hover-right');
	});
	right.addEventListener('mouseenter', () => {
		container.classList.remove('hover-right');
	});
})();
/************************/
/*********************
User signup validation
*********************/
function signupForm() {
	var userFirstname = document.getElementById("userFirstname").value;
	var userLastname = document.getElementById("userLastname").value;
	var userEmail = document.getElementById("userEmail").value;
	var userPassword = document.getElementById("userPassword").value;
	var signupBtn = document.getElementById("signupBtn");
		signupBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if(userFirstname === ""){
				return document.getElementById("firstnameError").innerHTML = "*** please the email field is required";
			}else if(userLastname === ""){
				return document.getElementById("lastnameError").innerHTML = "*** please the password field is required";
			}else if(userEmail === "") {
				return document.getElementById("emailError").innerHTML = "*** please the email field is required";
			}else if(userPassword === ""){
				return document.getElementById("passwordError").innerHTML = "*** please password is required";
			}
		});
}
(() => {
	signupForm();
})();