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
/************************
User login validation 
************************/
function loginForm() {
	var userEmail = document.getElementById("userEmail").value;
	var userPassword = document.getElementById("userPassword").value;
	var loginBtn = document.getElementById("loginBtn");
		loginBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if(userEmail === ""){
				return document.getElementById("emailError").innerHTML = "please the email field is required";
			}else if(userPassword === ""){
				return document.getElementById("passwordError").innerHTML = "please the password field is required";
			}
		});
}
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
	loginForm();
	signupForm();
})();
var scrollBtn = document.getElementById("back-to-top"),
	body = document.body,
	docElem = document.documentElement,
	offset = 100,
	scrollPos, docHeight,
	isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
	docHeight = Math.max(body.scrollHeight, body.offsetHeight, docElem.clientHeight, docElem.scrollHeight, docElem.offsetHeight);
	if(docHeight != "undefined"){
		offset = docHeight / 4;
	}
	window.addEventListener("scroll", function(event) {
		scrollPos = body.scrollTop || docElem.scrollTop;
		scrollBtn.className = (scrollPos > offset) ? "visible" : "";
	});
	scrollBtn.addEventListener("click", function(e) {
		e.preventDefault();
		if(isFirefox){
			docElem.scrollTop = 0;
		}else{
			body.scrollTop = 0;
		}
	});