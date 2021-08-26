/* eslint-disable no-undef */
import "regenerator-runtime/runtime";
import isMobile from "is-mobile";
import DarkMode from "./dark-mode.js";
import StorageSelection from "./modules/StorageSelection.js";

const firebaseConfig = 
{
	apiKey: "AIzaSyBHdHdJ8rRnhiUlyMKlGpT6-yCla0dZEGY",
	authDomain: "todo-list-3d3e4.firebaseapp.com",
	projectId: "todo-list-3d3e4",
	storageBucket: "todo-list-3d3e4.appspot.com",
	messagingSenderId: "1016517839578",
	appId: "1:1016517839578:web:daf2dc32b1bf08c5cc73e3",
	measurementId: "G-SBSFQDWGCG"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().signOut();

StorageSelection.create("anim");

(() =>
{
	if(isMobile())
	{
		const hiddenElements = Array.from(document.getElementsByClassName("hidden"));
		hiddenElements.forEach(element => element.classList.remove("hidden"));
	}
})();

(() => document.querySelector("#dark-mode").addEventListener("click", () => DarkMode.on ? DarkMode.Off() : DarkMode.On()))();
