//main
const boton = document.querySelector(".searchBoxBoton");
const input = document.querySelector(".searchBoxInput");
const mensaje = document.querySelector(".mensaje");
const containerAccount = document.querySelector(".containerAccount");
const listButtonsPlataform = document.querySelector(".listButtonsPlataform");
const containerStatOverall = document.querySelector(".containerStatOverall");
const containerStats = document.querySelector(".containerStats");
//input
const containerSuggestions = document.querySelector(".containerSuggestions");

boton.addEventListener("click", buscarEstadísticas);
input.addEventListener("keyup", searchPlayers);
