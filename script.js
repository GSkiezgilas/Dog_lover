let dogsFactsArr = [];

// Function receives facts, checks if they have word cat in string, if yes switches words associated with cat with words about dog and vice versa and then saves to array
(async function getData() {
	let factsUrl = 'https://cat-fact.herokuapp.com/facts';
	let response = await fetch(factsUrl);

	if (response.ok) {
		let returnedCatsFacts = await response.json();
		for (let i = 0; i < returnedCatsFacts.all.length; i++) {
			if (returnedCatsFacts.all[i].text.indexOf('cat') !== -1 || returnedCatsFacts.all[i].text.indexOf('Cat') !== -1) {
				dogsFactsArr.push(returnedCatsFacts.all[i].text
					.replace(/Cat(?= |s|\.|,|\!|\?|’|')/g, 'Racoon')
					.replace(/cat(?= |s|\.|,|\!|\?|’|')/g, 'racoon')
					.replace(/dog(?= |s|\.|,|\!|\?|’|')/g, 'cat')
					.replace(/Dog(?= |s|\.|,|\!|\?|’|')/g, 'Cat')
					.replace('meow', 'woof')
					.replace('feline', 'canine')
					.replace('kitty', 'dog')
					.replace('kitten', 'dog')
					.replace(/purr/g, 'snore')
					.replace(/Racoon(?= |s|\.|,|\!|\?|’|')/g, 'Dog')
					.replace(/racoon(?= |s|\.|,|\!|\?|’|')/g, 'dog')
				);
			}
		}
	} else {
		alert("HTTP-Error: " + response.status);
	}
	return dogsFactsArr;
})();

// Feed the dog button appears after loading complete
function showButton() {
	document.getElementById('js-button-apear').setAttribute('class', 'btn-container');
	timeoutSit = setTimeout(dogSitPretty, 2000);
}

// Function switches svg of dog after two minutes
function dogSitPretty() {
	document.getElementById('use-svg').setAttribute('xlink:href', '#svg-standing');
}

// Function changes svg of dog and displays random fact from array
function getFact() {
	let factNumber = Math.floor(Math.random() * dogsFactsArr.length);
	let fact = document.getElementById('fact').innerHTML = dogsFactsArr[factNumber];
	
	clearTimeout(timeoutSit);
	document.getElementById('use-svg').setAttribute('xlink:href', '#svg-eating');
	timeoutSit = setTimeout(dogSitPretty, 1000 * 10);
	return fact;
}
