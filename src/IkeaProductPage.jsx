import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Cuboid as Cube, View, ShoppingCart, Heart, Share2, Loader, Star, Clock } from 'lucide-react';
// Importer les images depuis le module dédié
import { productImages } from './productImages';

// Composant pour les miniatures
const ImageThumbnail = ({ image, alt, onClick, isActive = false }) => {
  return (
    <img
      src={image}
      alt={alt}
      onClick={onClick}
      className={`w-full h-24 object-cover rounded-md cursor-pointer transition 
        ${isActive ? 'border-2 border-gray-800' : 'hover:opacity-75'}`}
    />
  );
};

const IkeaProductPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isLoadingAR, setIsLoadingAR] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('cuir');
  const [currentImage, setCurrentImage] = useState(productImages.main);
  const [activeThumbId, setActiveThumbId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent;
      const mobileCheck = /iPhone|iPad|iPod|Android/i.test(userAgent);
      const iosCheck = /iPhone|iPad|iPod/i.test(userAgent);
      setIsMobile(mobileCheck);
      setIsIOS(iosCheck);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Fonction pour changer l'image principale
  const changeMainImage = (image, thumbId) => {
    setCurrentImage(image);
    setActiveThumbId(thumbId);
  };

  const openARView = () => {
    // Activé l'indicateur de chargement
    setIsLoadingAR(true);
    
    // URLs des modèles 3D
    const usdzModelUrl = './model/assets/chair2.usdz';
    const gltfModelUrl = './model/assets/chair2.glb';
    
    // Ajouter un léger délai pour permettre à l'UI de se mettre à jour
    setTimeout(() => {
      if (isIOS) {
        // Utilisation d'une redirection directe pour iOS Quick Look AR
        window.location.href = `${usdzModelUrl}#allowsContentScaling=0&autoplay=1&shouldOpenInAR=1`;
        
        // Réinitialiser l'état de chargement après un délai
        setTimeout(() => {
          setIsLoadingAR(false);
        }, 2000); // 2 secondes, réduit car le lancement direct est plus rapide
      } else {
        // Pour Android, utiliser Scene Viewer
        window.location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${window.location.origin}${gltfModelUrl}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${window.location.origin};end;`;
        
        // Réinitialiser l'état de chargement pour Android après un délai
        setTimeout(() => {
          setIsLoadingAR(false);
        }, 2000);
      }
    }, 300);
  };

  // Avis clients fictifs
  const reviews = [
    {
      name: "Martin D.",
      rating: 5,
      date: "12 mars 2025",
      comment: "Excellent fauteuil en cuir. La qualité est au rendez-vous et le confort est incomparable. Je recommande vivement."
    },
    {
      name: "Sophie L.",
      rating: 4,
      date: "27 février 2025",
      comment: "Très beau fauteuil, confortable et élégant. J'enlève une étoile car le montage était un peu complexe."
    },
    {
      name: "Thomas B.",
      rating: 5,
      date: "15 janvier 2025",
      comment: "Un design épuré et un confort optimal. Le cuir est de très bonne qualité et facile à entretenir."
    }
  ];

  // Produits suggérés
  const suggestedProducts = [
    {
      name: "STOCKHOLM",
      description: "Table basse en noyer",
      price: "329,00 €",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80"
    },
    {
      name: "KIVIK",
      description: "Canapé 3 places en cuir",
      price: "899,00 €",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80"
    },
    {
      name: "POÄNG",
      description: "Repose-pieds en cuir",
      price: "199,00 €",
      image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80"
    },
    {
      name: "KALLAX",
      description: "Étagère décorative",
      price: "89,00 €",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">MÖBEL</h1>
          <div className="flex gap-4">
            <Heart className="w-6 h-6 text-gray-600" />
            <ShoppingCart className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </nav>

      {/* Modal de chargement AR */}
      {isLoadingAR && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center max-w-sm mx-4">
            <Loader className="w-12 h-12 text-gray-600 animate-spin mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chargement de l'AR</h3>
            <p className="text-gray-600 text-center mb-2">
              Veuillez patienter pendant que nous préparons votre expérience de réalité augmentée...
            </p>
            <p className="text-gray-500 text-sm text-center">
              L'application AR devrait s'ouvrir automatiquement. Si rien ne se passe après quelques secondes, vérifiez que votre appareil est compatible.
            </p>
            <button 
              onClick={() => setIsLoadingAR(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <img
              src={currentImage}
              alt="SÖDERHAMN Fauteuil en cuir"
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {productImages.thumbnails.map((thumb) => (
                <ImageThumbnail
                  key={thumb.id}
                  image={thumb.src}
                  alt={thumb.alt}
                  onClick={() => changeMainImage(thumb.src, thumb.id)}
                  isActive={activeThumbId === thumb.id}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">SÖDERHAMN</h1>
              <p className="text-xl text-gray-600">Fauteuil en cuir premium</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">799,00 €</p>
              <p className="text-red-600 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Temporairement indisponible
              </p>
            </div>
            <div className="flex gap-3 mb-4">
              <button 
                className={`px-4 py-2 rounded-full border ${selectedMaterial === 'cuir' ? 'bg-gray-100 border-gray-800' : 'border-gray-300'}`}
                onClick={() => setSelectedMaterial('cuir')}
              >
                Cuir noir
              </button>
              <button 
                className={`px-4 py-2 rounded-full border ${selectedMaterial === 'coton' ? 'bg-gray-100 border-gray-800' : 'border-gray-300'}`}
                onClick={() => setSelectedMaterial('coton')}
              >
                Coton beige
              </button>
            </div>
            <p className="text-gray-600">
              Un fauteuil élégant recouvert de cuir pleine fleur de haute qualité, offrant un confort exceptionnel grâce à son assise profonde et ses accoudoirs généreux. Son design scandinave contemporain s'intègre parfaitement dans tout type d'intérieur.
            </p>
            <div className="space-y-4">
              <button disabled className="w-full bg-gray-300 text-white py-4 rounded-full font-semibold cursor-not-allowed">
                Indisponible
              </button>
              <button
                onClick={() => navigate('/personnalisation')}
                className="w-full bg-white border-2 border-gray-600 text-gray-600 py-4 rounded-full font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <Cube className="w-5 h-5" />
                Personnaliser en 3D
                <ChevronRight className="w-5 h-5" />
              </button>
              {isMobile && (
                <button
                  onClick={openARView}
                  className="w-full bg-white border-2 border-gray-600 text-gray-600 py-4 rounded-full font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <View className="w-5 h-5" />
                  Voir en réalité augmentée
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Caractéristiques principales</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Dimensions: L80 × P105 × H85 cm</li>
                <li>Revêtement: Cuir pleine fleur de haute qualité</li>
                <li>Structure: Bois massif de hêtre, Contreplaqué</li>
                <li>Suspension: Ressorts ensachés et mousse haute résilience</li>
                <li>Entretien: Nettoyant spécial cuir recommandé</li>
                <li>Garantie: 10 ans sur structure, 5 ans sur revêtement</li>
              </ul>
            </div>
            <div className="flex items-center gap-4 mb-4 pt-4">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-800 fill-gray-800" />
                ))}
              </span>
              <span className="text-gray-600">4.8/5 (32 avis)</span>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <Share2 className="w-5 h-5" />
              Partager
            </button>
          </div>
        </div>

        {/* Avis clients */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Avis clients</h2>
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'text-gray-800 fill-gray-800' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Produits suggérés */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Complétez votre intérieur</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggestedProducts.map((product, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="font-semibold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IkeaProductPage;