"use strict";

const boton = document.querySelector(".searchBoxBoton");
const input = document.querySelector(".searchBoxInput");
const mensaje = document.querySelector(".mensaje");
const containerAccount = document.querySelector(".containerAccount");
const listButtonsPlataform = document.querySelector(".listButtonsPlataform");
const containerStats = document.querySelector(".containerStats");
let statsData = {};
let buttonStatChecked = "All";

function resetear() {
	mensaje.innerText = null;
	containerAccount.innerHTML = "";
	listButtonsPlataform.innerHTML = "";
	containerStats.innerHTML = "";
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
				statsData = stats;
				getContainerAccount(account, image, battlePass);
				getButtonsPlataform(stats);
			} else {
				mensaje.innerText = response.error;
				input.value = null;
			}
		})
		.catch(function (err) {
			mensaje.innerText = "Error de conexión " + err;
		});
}
const getContainerAccount = (account, image, battlePass) => {
	containerAccount.innerHTML = `<img src=${
		image ? image : "../assets/images/9ab5124473a2a7b045ebc3e9c0dc1076.jpg"
	} alt='profile picture'/><h2>${account.name}</h2><p>${
		battlePass.level
	}</p>`;
};

function getButtonsPlataform(stats) {
	const arrayOfPlataforms = Object.keys(stats);
	const createListElementFactory = (plataform) => {
		const li = document.createElement("li");
		li.innerHTML = `<input type='button' value=${plataform} class='statButton'/>`;
		li.addEventListener("click", getStats);
		return li;
	};

	arrayOfPlataforms.forEach((plataform) =>
		listButtonsPlataform.append(createListElementFactory(plataform))
	);
}

function getStats(ev) {
	containerStats.innerHTML = "";
	const currentButton = ev.target.value;
	const filterData = statsData[currentButton];
	const arrayOfTypes = Object.keys(filterData);
	const createListElementFactory = (type) => {
		const section = document.createElement("section");
		section.className = "sectionOfType";
		section.innerHTML = `<h3 class=sectionOfTypeTitle>${type}</h3>`;
		const ul = document.createElement("ul");
		ul.className = "listDataStats";
		section.appendChild(ul);
		for (const property in filterData[type]) {
			const li = document.createElement("li");
			li.innerHTML = `<li class='sectionOfTypeItem'><h4>${property}:</h4> <p>${filterData[type][property]}</p></li>`;
			ul.appendChild(li);
		}
		return section;
	};
	arrayOfTypes.forEach((type) =>
		containerStats.append(createListElementFactory(type))
	);
}

boton.addEventListener("click", buscarEstadísticas);
