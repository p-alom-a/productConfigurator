// productImages.js
// Using ES modules import syntax instead of require
import illusSalon from './assets/img/illus-salon.png';
import illusWhite from './assets/img/illus-white.jpg';
import illusCottonNoir from './assets/img/illus-cottonnoir.png';
import illusWoman from './assets/img/illus-woman.png';


export const productImages = {
  main: illusSalon,
  thumbnails: [
    {
      id: 1,
      src: illusWhite,
      alt: 'Vue de face'
    },
    {
      id: 2,
      src: illusCottonNoir,
      alt: 'Vue détaillée'
    },
    {
      id: 3,
      src: illusWoman,
      alt: 'Vue de côté'
    },
  ]
};

