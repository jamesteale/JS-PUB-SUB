import './palette.scss';

class Palette {
	constructor(domElement, title, hexValue = '#c63466'){
		this.colour = hexValue;
		this.buildPalete(domElement, title, hexValue);
	}

	buildPalete(elementToAttachTo, title, hexValue){
		//Create Palette Container
		const container = document.createElement('div');
		container.classList.add('palette');
	
		//Create the colour input
		const colourSwatch = document.createElement('input');
		colourSwatch.setAttribute('type', 'color');
		colourSwatch.setAttribute('name', 'colour-swatch');
		colourSwatch.setAttribute('value', hexValue);
		colourSwatch.classList.add('colour-swatch');
		
		//Create the label, and the h3 which will wrap the label
		const label = document.createElement('label');
		const heading = document.createElement('h3');
		const instructionsEl = document.createElement('span');

		instructionsEl.textContent = title;
		instructionsEl.classList.add('palette-instructions');
		
		//Glue it all together
		
		label.appendChild(colourSwatch);
		label.appendChild(instructionsEl);
		heading.appendChild(label);
		container.appendChild(heading);
		elementToAttachTo.appendChild(container);

		this._addListener(colourSwatch);
	}

	_addListener (element) {
		element.addEventListener('input', (event) => {
			const new_colour = event.target.value;

			console.log(`The new colour is ${new_colour}`);
			this.colour = new_colour;
		});
	}

	getColor () {
		return this.colour;
	}
};

export default Palette;
