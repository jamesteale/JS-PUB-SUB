import './cafffeinator.scss';

export default class Caffeinator {
	constructor(domToAttach, instructions) {
		this.build(domToAttach, instructions);
	}

	build(domToAttach, instructions){
		const cupContainer = document.createElement('div');
		cupContainer.classList.add('cup-container');

		const cup = document.createElement('div');
		cup.classList.add('cup');

		const cupFill = document.createElement('div');
		this.mode = 'small'
		cupFill.classList.add('filled', this.mode);

		const intstructionsHeading = document.createElement('h3');
		intstructionsHeading.textContent = instructions;
		
		cup.appendChild(cupFill);
		cupContainer.appendChild(cup);
		cupContainer.appendChild(intstructionsHeading);
		
		domToAttach.appendChild(cupContainer);

		this._addListener(cupFill);
	}

	_addListener(domElement) {
		domElement.addEventListener('click', (event) => {
		
			const { clientY: mousePosY, srcElement: {
				offsetTop,
				offsetHeight
			} } = event;
			
			const third = Math.floor(offsetHeight / 3);
			const pos = offsetHeight + offsetTop - mousePosY;
			
			if (pos <= third) {
				this.mode = 'small';
				domElement.classList.add('small');
				domElement.classList.remove('medium', 'large');
			} else if (pos <= third * 2) {
				this.mode = 'medium';
				domElement.classList.add('medium');
				domElement.classList.remove('small', 'large');
			} else {
				this.mode = 'large';
				domElement.classList.add('large');
				domElement.classList.remove('small', 'medium');
			}

			this.publish(this.mode, 'mode-change')
		});
	}

	getMode(){
		return this.mode;
	}
}
