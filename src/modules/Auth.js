/* eslint-disable no-undef */
import DarkMode from "../dark-mode";
import Interface from "./Interface";
import { initProjects } from "./projects";
import StorageSelection from "./StorageSelection";

export const loginPage = { create: () =>
{
	document.querySelector("#content").innerHTML = "";

	const loginWindow = document.createElement("div");
	loginWindow.id = "login-window";
	loginWindow.classList.add(`${DarkMode.on ? "login-dark" : null}`);

	const back = document.createElement("button");
	back.id = "back-button";
	back.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M24 12l-12-8v5h-12v6h12v5z'/></svg>";
	back.addEventListener("click", StorageSelection.create);
	loginWindow.appendChild(back);
	
	const loginForm = document.createElement("form");
	loginForm.id = "login-form";
	loginForm.noValidate = true;
	loginForm.addEventListener("submit", (e) =>
	{
		e.preventDefault();
		const credentials = checkForm();
		if (credentials)
			login(credentials.email, credentials.password);
	});

	const inputBox = document.createElement("div");
	inputBox.classList.add("input-box");
	const emailLabel = document.createElement("label");
	emailLabel.textContent = "Email:";
	emailLabel.htmlFor = "email";
	const emailInput = document.createElement("input");
	emailInput.id = "email";
	emailInput.name = "email";
	emailInput.placeholder = "myemail@site.com";
	emailInput.addEventListener("focusout", checkEmail);
	inputBox.appendChild(emailLabel);
	inputBox.appendChild(emailInput);

	const inputBox2 = document.createElement("div");
	inputBox2.classList.add("input-box");
	const passwordLabel = document.createElement("label");
	passwordLabel.textContent = "Password:";
	passwordLabel.htmlFor = "password";
	const passwordInput = document.createElement("input");
	passwordInput.type = "password";
	passwordInput.id = "password";
	passwordInput.name = "password";
	passwordInput.addEventListener("focusout", checkPassword);
	inputBox2.appendChild(passwordLabel);
	inputBox2.appendChild(passwordInput);

	const formButton = document.createElement("button");
	formButton.textContent = "Login/Create Account";
	formButton.id = "login-button";
	formButton.style = "align-self: center";

	loginForm.appendChild(inputBox);
	loginForm.appendChild(inputBox2);
	loginForm.appendChild(formButton);
	loginWindow.appendChild(loginForm);
	document.querySelector("#content").insertBefore(loginWindow, document.querySelector("#content").firstChild);
}};

const checkForm = () =>
{
	const emailValidity = checkEmail();
	const passwordValidity = checkPassword();
	if (emailValidity && passwordValidity) return {email: emailValidity, password: passwordValidity};
};

const login = async (email, password) =>
{
	try
	{
		await firebase.auth().signInWithEmailAndPassword(email, password);
		if (!firebase.auth().currentUser) return;
		document.querySelector("#login-window").remove();
		await initProjects("cloud");
		Interface.DisplayInterface();
	}
	catch (error)
	{
		if (document.querySelector("#login-form .error")) document.querySelector("#login-form .error").remove();
		const errorCode = error.code;
		console.error(error);
		if (errorCode === "auth/user-not-found")
		{
			if (confirm("Account doesn't exist. Would you like to create one?"))
			{
				try
				{
					firebase.auth().createUserWithEmailAndPassword(email, password);
					if (!firebase.auth().currentUser) return;
					document.querySelector("#login-window").remove();
					initProjects();
					Interface.DisplayInterface();
				}
				catch (error)
				{
					return console.log("registering", error);
				}
			}
			else return;
		}
		else if (errorCode === "auth/wrong-password")
		{
			const loginWindow = document.querySelector("#login-form");
			const error = document.createElement("span");
			error.classList.add("error", "login");
			error.textContent = "Wrong password or wrong email";
			return loginWindow.insertBefore(error, loginWindow.firstChild);
		}
	}
};

const checkEmail = () =>
{
	const email = document.querySelector("#login-form #email");
	if (email.parentElement.querySelector(".error"))
		email.parentElement.querySelector(".error").remove();
	if (email.value === "") return throwError(email, "Please enter an email");
	// eslint-disable-next-line no-control-regex
	else if (!email.value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/))
		return throwError(email, "Please enter a valid email");
	return email.value;
};

const checkPassword = () =>
{
	const password = document.querySelector("#login-form #password");
	if (password.parentElement.querySelector(".error"))
		password.parentElement.querySelector(".error").remove();
	if (password.value === "") return throwError(password, "Please enter a password");
	if (!password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
	{
		if (password.value.length < 8) return throwError(password, "Must contain at least 8 characters");
		else if (!password.value.match(/[A-Z]+/)) return throwError(password, "Must contain at least 1 uppercase letter");
		else if (!password.value.match(/[a-z]+/)) return throwError(password, "Must contain at least 1 lower case letter");
		else if (!password.value.match(/(\d)+/)) return throwError(password, "Must contain at least 1 number");
		else if (!password.value.match(/[!@#$%^&*()_+-]+/)) return throwError(password, "Must contain at least 1 special character");
	}
	return password.value;
};

const throwError = (email, errorMsg) =>
{
	if (email.parentElement.querySelector(".error")) return;
	const error = document.createElement("span");
	error.classList.add("error");
	error.textContent = errorMsg;

	email.parentElement.appendChild(error);
};
