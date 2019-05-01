import Monster from './src/monster/Monster.js';
import Palette from './src/colour-palette/Palette.js'
import Caffeinator from './src/caffeinator/Caffeinator.js';
import './src/layout.scss';

const instructionsToColour = "Select part of the monster to colour, then choose colour.";
const instructionsToCaffeinate = "Click on the cup to dose the monster";
const toolContainer = document.querySelector('.tools');

const monster = new Monster();
const caffeinator = new Caffeinator(toolContainer, instructionsToCaffeinate);
const palette = new Palette(toolContainer, instructionsToColour);

monster.buildMonster();
