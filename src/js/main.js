"use strict";

const boton = document.querySelector(".searchBoxBoton");
const input = document.querySelector(".searchBoxInput");
const ul = document.querySelector(".secondSection__listado");
const mensaje = document.querySelector(".mensaje");
const containerAccount = document.querySelector(".containerAccount");

function resetear() {
	ul.innerHTML = "";
	containerAccount.innerHTML = "";
	mensaje.innerText = null;
}

function buscarEstadísticas() {
	resetear();
	fetch("https://fortnite-api.com/v1/stats/br/v2?name=" + input.value)
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			const status = response.status;
			if (status === 200) {
				const data = response.data;
				const { account, image, battlePass, stats } = data;

				const accountImage = document.createElement("img");
				const accountName = document.createElement("h2");

				containerAccount.appendChild(accountImage);
				containerAccount.appendChild(accountName);

				accountName.innerText = account.name;
				accountImage.src = image
					? image
					: "../assets/images/9ab5124473a2a7b045ebc3e9c0dc1076.jpg";
			} else {
				mensaje.innerText = response.error;
				input.value = null;
			}
		})
		.catch(function (err) {
			mensaje.innerText = "Error de conexión " + err;
		});
}

boton.addEventListener("click", buscarEstadísticas);
