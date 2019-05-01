import getMonsterHTML from './monsterHTML.js';
import { CssClassVariables, SCARY_MODES } from "./constants.js";
import './monster.scss';

export default class Monster {
	constructor(domElement, listenerCb){
		this._dom = document.querySelector('.monster');
		this._selection = null;
		this.built = false;
	}

	buildMonster(){
		if(!this.built) {
			const dom = this._dom;
			dom.classList.add('small');
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

	//using arrow function to get round `this` if we use inheritence
	updateColorOfSelection = (colour) =>{
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

	//using arrow function to get round `this` if we use inheritence
	updateMode = mode => {
		const dom = this._dom;
		dom.classList.remove("small", "medium", "large");
		dom.classList.add(mode);
	}

	resetToDefaultColours() {
		const style = this._dom.style;

		CssClassVariables.forEach(({cssVariableName, defaultValue}) => style.setProperty(cssVariableName, defaultValue));
	}
}
