import React, { useState, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Stage, OrbitControls } from '@react-three/drei';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import ChairModel from './ChairModel.jsx';

const colorOptions = {
  leather: [
    { value: 'caramel', label: 'Caramel', color: '#AF6E4D' },
    { value: 'chestnut', label: 'Cognac', color: '#7B503C' },
    { value: 'darkBrown', label: 'Brun Foncé', color: '#4A2C1D' },
  ],
  tissu: [
    { value: 'blue', label: 'Crème', color: '#FDFBFC' },
    { value: 'gray', label: 'Noir', color: '#525252' },
  ]
};

// Simplified 3D Scene Component to improve performance
const ChairScene = ({ activeTexture, activeColor }) => {
  return (
    <Canvas
    shadows
    gl={{ 
      powerPreference: "high-performance",
      antialias: true, 
      alpha: false
    }}
    camera={{ position: [0.9, 0.3, -0.4], fov: 45 }}
    className="w-full h-[400px] md:h-[600px] bg-white rounded-lg shadow-lg"
  >
      <color attach="background" args={["#f5f5f5"]} />
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <Suspense fallback={null}>
      <Stage
                environment="apartment"
                intensity={0.5}
                preset="rembrandt"
                adjustCamera={0}
                opacity={0.5}
                shadows={false}
              >
          <ChairModel
            activeTexture={activeTexture}
            activeColor={activeColor}
          />
        </Stage>
      </Suspense>
      
      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2}
        enableZoom={true}
        enablePan={false}
        zoomSpeed={0.5}
      />
    </Canvas>
  );
};

const PersonnalisationPage = () => {
  const [textureType, setTextureType] = useState('leather');
  const [activeColor, setActiveColor] = useState('caramel');
  const navigate = useNavigate();

  // Force scrolling to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTextureChange = (type) => {
    setTextureType(type);
    setActiveColor(type === 'leather' ? 'caramel' : 'gray');
  };

  const handleColorChange = (color) => {
    setActiveColor(color);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - style de la page d'accueil */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="mr-4 hover:bg-gray-100 p-2 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">MÖBEL</h1>
          </div>
          <div className="flex gap-4">
            <Heart className="w-6 h-6 text-gray-600" />
            <ShoppingCart className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Personnalisation - SÖDERHAMN</h1>
        
        {/* Modifié: ordre inversé en mobile et espace réduit */}
        <div className="flex flex-col md:flex-row flex-1 gap-4 md:gap-8">
          {/* Visualisation du produit - maintenant en premier pour mobile */}
          <div className="w-full md:w-2/3 order-1 md:order-2 bg-gray-50 flex items-center justify-center p-3 md:p-8 relative min-h-72 md:min-h-96 border border-gray-200 rounded-lg mb-4 md:mb-0">
            <div className="w-full h-72 md:h-full relative rounded-lg overflow-hidden">
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-800"></div>
                  <p className="ml-4 text-gray-800 font-medium">Chargement du modèle 3D...</p>
                </div>
              }>
                <ChairScene
                  activeTexture={textureType}
                  activeColor={activeColor}
                />
              </Suspense>
            </div>
          </div>

          {/* Paramètres de personnalisation - maintenant en second pour mobile */}
          <div className="w-full md:w-1/3 order-2 md:order-1 bg-white p-4 md:p-6 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Personnalisation</h2>

            <div className="mb-4 md:mb-6">
              <h3 className="font-medium mb-2">Type de Revêtement</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleTextureChange('leather')}
                  className={`
                    p-3 md:p-4 border-2 rounded-lg transition-all duration-300
                    ${textureType === 'leather'
                      ? 'border-gray-800 bg-gray-100'
                      : 'border-gray-200 hover:border-gray-400'}
                  `}
                >
                  <p className="text-sm font-medium">Cuir</p>
                  <p className="text-xs text-gray-500">Premium et élégant</p>
                </button>
                <button
                  onClick={() => handleTextureChange('tissu')}
                  className={`
                    p-3 md:p-4 border-2 rounded-lg transition-all duration-300
                    ${textureType === 'tissu'
                      ? 'border-gray-800 bg-gray-100'
                      : 'border-gray-200 hover:border-gray-400'}
                  `}
                >
                  <p className="text-sm font-medium">Tissu</p>
                  <p className="text-xs text-gray-500">Doux et confortable</p>
                </button>
              </div>
            </div>

            <div className="mb-4 md:mb-6">
              <h3 className="font-medium mb-2">Choix de la Couleur</h3>
              <div className="grid grid-cols-3 gap-3">
                {(textureType === 'leather' ? colorOptions.leather : colorOptions.tissu).map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleColorChange(option.value)}
                    className={`
                      p-3 md:p-4 border-2 rounded-lg transition-all duration-300 flex flex-col items-center
                      ${activeColor === option.value
                        ? 'border-gray-800 bg-gray-100'
                        : 'border-gray-200 hover:border-gray-400'}
                    `}
                  >
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 mb-1 md:mb-2 rounded-full border border-gray-200"
                      style={{ backgroundColor: option.color }}
                    />
                    <p className="text-xs md:text-sm font-medium">{option.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-1 md:mb-2">💡 Conseil</h3>
              <p className="text-xs md:text-sm text-gray-600">
                {textureType === 'leather'
                  ? 'Choisissez une teinte de cuir qui complémente votre intérieur.'
                  : 'Le tissu offre un confort et une variété de couleurs.'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-8">
          <button 
            className="bg-white border-2 border-gray-600 text-gray-600 py-3 md:py-4 px-6 md:px-8 rounded-full font-semibold hover:bg-gray-50 transition"
            onClick={() => navigate('/')}
          >
            Retour à la fiche produit
          </button>
        </div>
      </div>

      <footer className="bg-gray-100 p-4 text-center text-sm mt-8 md:mt-12 border-t border-gray-200">
        © 2025 MÖBEL. Tous droits réservés.
      </footer>
    </div>
  );
};

export default PersonnalisationPage;