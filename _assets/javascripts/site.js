// Helpers
function updateTransform(element, options) {
  const style = window.getComputedStyle(element);
  let transform = style.getPropertyValue('-webkit-transform') ||
    style.getPropertyValue('-moz-transform') ||
    style.getPropertyValue('-ms-transform') ||
    style.getPropertyValue('-o-transform') ||
    style.getPropertyValue('transform') ||
    'matrix(1, 0, 0, 1, 0, 0)';

  if (!transform || transform === 'none') {
    transform = 'matrix(1, 0, 0, 1, 0, 0)';
  }

  let values = transform.split('(')[1];
  values = values.split(')')[0];
  values = values.split(',');

  let scaleX = values[0];
  const skewX = values[1];
  const skewY = values[2];
  let scaleY = values[3];
  const translateX = values[4];
  const translateY = values[5];

  // Rotation
  let angle = Math.round(Math.atan2(skewX, Math.abs(scaleX)) * (180 / Math.PI)) || 0;
  angle = (angle < 0) ? angle + 360 : angle;

  if (options.rotate) {
    angle = options.rotate;
  }

  // Scale
  if (options.scale || options.scaleX) {
    scaleX *= options.scale || options.scaleX;
  }
  if (options.scale || options.scaleY) {
    scaleY *= options.scale || options.scaleY;
  }

  const new_transform = `rotate(${angle}deg) scaleX(${scaleX}) scaleY(${scaleY}) skewX(${skewX}) skewY(${skewY}) translate(${translateX}, ${translateY})`;

  element.style.transform = new_transform;
}

// Backgrounds
const bgs = [
  'background-dk.png',
  'background-mario2-w1a2.png',
];

const scene = [
  {
    name: 'Earthbound / Mother 2',
    sprites: [
      { className: 'ness north-west', scale: true },
      { className: 'ness north', scale: true },
      { className: 'ness north-east', scale: true },
      { className: 'ness east', scale: true },
      { className: 'ness south-east', scale: true },
      { className: 'ness south', scale: true },
      { className: 'ness south-west', scale: true },
      { className: 'ness west', scale: true },
    ],
    backgrounds: [
      'background-mother2-dalaam.png',
      'background-mother2-onett.png',
    ],
  },
  {
    name: 'Seiken Densetsu 2',
    sprites: [
      { className: 'captain-duck walk east', scale: true },
      { className: 'captain-duck walk west', scale: true },
      { className: 'captain-duck walk-north', scale: true },
      { className: 'captain-duck walk-south', scale: true },
      { className: 'kid-goblin walk east', scale: true },
      { className: 'kid-goblin walk west', scale: true },
      { className: 'kid-goblin walk-north', scale: true },
      { className: 'kid-goblin walk-south', scale: true },
      { className: 'villager-woman-green walk east', scale: true },
      { className: 'villager-woman-green walk west', scale: true },
      { className: 'villager-woman-green walk-north', scale: true },
      { className: 'villager-woman-green walk-south', scale: true },
    ],
    backgrounds: [
      'background-som-goblin.png',
      'background-som-neko.png',
      'background-som.png',
    ],
  },
  {
    name: 'Seiken Densetsu 3',
    sprites: [
      { className: 'jinn-float', scale: true },
    ],
  },
  {
    name: 'Chrono Trigger',
    sprites: [
      { className: 'akira-toriyama-walk east', scale: true },
      { className: 'akira-toriyama-walk west', scale: true },
      { className: 'hironobu-sakaguchi-walk east', scale: true },
      { className: 'hironobu-sakaguchi-walk west', scale: true },
      { className: 'kazuhiko-aoki', scale: true },
      { className: 'yuji-horii-walk east', scale: true },
      { className: 'yuji-horii-walk west', scale: true },
      { className: 'goblin-taunt', scale: true },
      { className: 'flea-taunt', scale: true },
    ],
    backgrounds: [
      'background-ct-12000.png',
    ],
  },
  {
    name: 'Super Mario World',
    sprites: [
      { className: 'flying-question-block east', scale: false },
      { className: 'flying-question-block west', scale: false },
    ],
    backgrounds: [
      'background-mario-blue-lumps.png',
      'background-mario-green-hills.png',
      'background-mario-green-mountains.png',
      'background-mario-mountains.png',
      'background-mario-tree-tops.png',
    ],
  },
];

// Setup
const sprites = document.createElement('div');
sprites.id = 'sprites';
document.querySelector('body').appendChild(sprites);

function setupSprite(options) {
  options = options || {};

  // Setup Scene
  const set_index = (options.set !== undefined && options.set !== null) ? options.set : Math.floor(Math.random() * scene.length);
  const set = scene[set_index];
  const scale = () => Math.floor(Math.random() * 4) + 1;

  // Sprites
  if (set && set.sprites && set.sprites.length) {
    const sprite_index = (options.sprite !== undefined && options.sprite !== null) ? options.sprite : Math.floor(Math.random() * set.sprites.length);
    const sprite = set.sprites[sprite_index];
    if (sprite) {
      const div = document.createElement('div');
      div.className = `sprite ${sprite.className}`;
      sprites.innerHTML = '';
      sprites.appendChild(div);
      if (sprite.scale) {
        setTimeout(() => {
          const new_div = document.querySelector('#sprites .sprite');
          new_div.style.transform = updateTransform(new_div, { scale: scale() });
        }, 0);
      }
    }
  }

  // Backgrounds
  if (set && set.backgrounds) {
    const bg_index = (options.sprite !== undefined && options.sprite !== null) ? options.sprite : Math.floor(Math.random() * set.backgrounds.length);
    const bg = set.backgrounds[bg_index];
    document.querySelector('body').style.backgroundImage = `url("https://snes.in/site/bg/${bg}")`;
  } else {
    document.querySelector('body').style.backgroundImage = `url("https://snes.in/site/bg/${bgs[Math.floor(Math.random() * bgs.length)]}")`;
  }
}
setupSprite();
setInterval(setupSprite, 1000 * 60 * 5);

if (typeof cheet === 'function') {
  cheet('↑ ↑ ↓ ↓ ← → ← → b a', () => {
    setupSprite();
  });
}

// Sticky Menu
const menu = document.querySelector('#banner .wrapper');
function getDistance() {
  const topDist = menu.offsetTop;
  return topDist;
}
let stuck = false;
const stickPoint = getDistance();

window.onscroll = () => {
  requestAnimationFrame(() => {
    const footerPoint = document.querySelector('footer').offsetTop;
    const distance = getDistance() - window.pageYOffset;
    const offset = window.pageYOffset;

    if (offset + menu.offsetHeight >= footerPoint) {
      // In the Footer
      menu.style.position = 'static';
      stuck = false;
    } else if ((offset <= stickPoint)) {
      // Above The Menu
      menu.style.position = 'static';
      stuck = false;
    } else if ((distance <= 0) && !stuck) {
      // Below The Menu
      menu.style.position = 'fixed';
      menu.style.top = '0px';
      stuck = true;
    }
  });
};

// Masonry
if (typeof Macy === 'object') {
  Macy.init({
    container: '#content',
    columns: 8,
    trueOrder: false,
    margin: 24,
    waitForImages: true,
    breakAt: {
      2480: 7,
      2210: 6,
      1940: 5,
      1670: 4,
      1400: 3,
      1130: 2,
      600: 1,
    },
  });
}

// Categories
const categories = document.querySelector('#banner .categories');
categories.addEventListener('click', (event) => {
  if (event.target !== event.currentTarget) {
    const filter = event.target.getAttribute('data-filter');

    const selector_all = '#content article, #page tr.row';
    const selector_show = `#content article[data-filter*="${filter}"], #page tr.row[data-filter*="${filter}"]`;

    if (filter) {
      const list_hide = document.querySelectorAll(selector_all);
      if (list_hide.length) {
        for (let i = 0; i < list_hide.length; ++i) {
          const item = list_hide[i];
          // item.removeAttribute('style');
          item.style.display = 'none';
        }
      }

      const list_show = document.querySelectorAll(selector_show);
      if (list_show.length) {
        for (let i = 0; i < list_show.length; ++i) {
          const item = list_show[i];
          item.style.display = '';
        }
      }

      setTimeout(Macy.recalculate, 10);
    } else {
      const list_show = document.querySelectorAll(selector_all);
      if (list_show.length) {
        for (let i = 0; i < list_show.length; ++i) {
          const item = list_show[i];
          item.style.display = '';
        }
        setTimeout(Macy.recalculate, 10);
      }
    }
  }
  event.stopPropagation();
}, false);

// Fade In
window.addEventListener('load', () => {
  document.body.className = 'reveal';
});

// Tables
const tables = document.querySelectorAll('table');
if (tables.length) {
  for (let table of tables) {
    SortableTables.sort(table);
  }
}
