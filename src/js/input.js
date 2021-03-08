"use strict";

const searchPlayers = () => {
	containerSuggestions.innerText = null;

	if (input.value.length > 2) {
		fetch(
			"https://search-api.tracker.network/search/fortnite?advanced=1&q=" +
				input.value
		)
			.then(function (response) {
				return response.json();
			})
			.then(function (response) {
				const suggestions = response;
				if (suggestions.length > 0) {
					createSection(suggestions);
				} else {
					console.log("error");
				}
			})
			.catch(function (err) {
				mensaje.innerText = "Error de conexión " + err;
			});
	}
};

const createSection = (suggestions) => {
	containerSuggestions.append(createSuggestionsList(suggestions));
};

const createSuggestionsList = (suggestions) => {
	const ul = document.createElement("ul");
	ul.className = "suggestionsList";

	suggestions.map((suggestion) => {
		const li = document.createElement("li");
		li.innerHTML = `<li class='sugestionsListItem'>${suggestion.name}</li>`;
		ul.appendChild(li);
	});
	return ul;
};
