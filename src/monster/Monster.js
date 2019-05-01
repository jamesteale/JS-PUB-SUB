import getMonsterHTML from './monsterHTML.js';
import { CssClassVariables, SCARY_MODES } from "./constants.js";
import './monster.scss';

export default class Monster {
	constructor(domElement, listenerCb){
		this._dom = document.querySelector('.monster');
		this._selection = null;
		this.built = false;
		this.willSetToDefault = false; //TEST-CODE
	}

	buildMonster(){
		if(!this.built) {
			const dom = this._dom;
			dom.classList.add('sm');
			dom.innerHTML = getMonsterHTML();
			dom.addEventListener('click', this._makeSelection);
		}
	}

	_makeSelection = event => {
		//find any selections
		const dom = this._dom;
		const srcElement = event.srcElement;
		this._removeSelection();

		if (srcElement.nodeName !== "svg" && srcElement !== dom) {
      this._addSelection(event.srcElement);
		}
		
		//TEST-CODE :: will pick a random colour;
		setTimeout(() => {
			const R = Math.floor(Math.random() * 256);
			const G = Math.floor(Math.random() * 256);
			const B = Math.floor(Math.random() * 256);

			this.updateColorOfSelection(`rgb(${R},${G},${B})`);
		}, 1000);

		//TEST-CODE :: will default back after 20secs;
		if (!this.willSetToDefault) {
			setTimeout(() => {
				this.resetToDefaultColours();
				this.updateMode(Math.ceil(Math.random() * 3));
				this.willSetToDefault = false;
				
			}, 15000);
			this.willSetToDefault = true;
		}
	}

	_addSelection = (targetElement) => {
		const selectionNode = targetElement.cloneNode();
		const parent = targetElement.parentNode;
		if(!parent) {
			return; //TODO - from time to time I get a weird error, so I exit here
		}
		
		selectionNode.classList.add('selection' , 'transparent');
		parent.insertBefore(selectionNode, targetElement.nextSibling);

		this._selection = selectionNode;
	};

	_removeSelection = () => {
		const selection = this._selection
		if (selection){
			const parent = selection.parentNode;
			parent.removeChild(selection);
			this._selection = null;
		}
	}

	updateColorOfSelection(colour) {
		const selection = this._selection;
		const dom = this._dom;
		
		if(selection) {
			const classNames = selection.getAttribute('class');
	
			CssClassVariables.some(({ classNameContains, cssVariableName }) => {
				if (classNames.includes(classNameContains)) {
					dom.style.setProperty(cssVariableName, colour);
					return true;
				}
			});
		}
	}

	updateMode(mode = 1){
		const dom = this._dom;
		dom.classList.remove("sm", "md", "lg");

		SCARY_MODES.every((item, index) => {
			if (index < mode) {
				dom.classList.add(item);
			}
			return index < mode;
		});
	}

	resetToDefaultColours() {
		const style = this._dom.style;

		CssClassVariables.forEach(({cssVariableName, defaultValue}) => style.setProperty(cssVariableName, defaultValue));
	}
}
