import "regenerator-runtime/runtime";
import firebase from "firebase/app";
import "firebase/auth";

const form = document.querySelector("#login-form");
form.addEventListener("submit", (e) =>
{
	e.preventDefault();
	const credentials = checkForm();
	if (credentials)
		login(credentials.email, credentials.password);
});

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
		console.log(!!firebase.auth().currentUser);
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
				}
				catch (error)
				{
					console.log("registering", error);
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
			loginWindow.insertBefore(error, loginWindow.firstChild);
		}
	}
	//const a7a = await firebase.auth().createUserWithEmailAndPassword(email, password);
	//console.log(a7a);
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
		else if (!password.value.match(/[!@#$%^&*()_+-]+/)) throwError(password, "Must contain at least 1 special character");
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
