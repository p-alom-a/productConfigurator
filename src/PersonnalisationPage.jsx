import './style.css';
import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import ChairModel from './ChairModel.jsx';
import { Stage, OrbitControls, Loader } from '@react-three/drei';
import { ArrowLeft } from 'lucide-react';

const colorOptions = {
  leather: [
    { value: 'chestnut', label: 'Cognac', color: '#7B503C' },
    { value: 'darkBrown', label: 'Brun Foncé', color: '#4A2C1D' },
    { value: 'caramel', label: 'Caramel', color: '#AF6E4D' },
  ],
  tissu: [
    { value: 'blue', label: 'Crème', color: '#FDFBFC' },
    { value: 'gray', label: 'Noir', color: '#525252' },
  ]
};

const PersonnalisationPage = () => {
  const [activeTexture, setActiveTexture] = useState('leather');
  const [activeColor, setActiveColor] = useState('chestnut');
  const [textureType, setTextureType] = useState('leather');
  const navigate = useNavigate();

  const handleTextureChange = (type) => {
    setTextureType(type);
    setActiveTexture(type);
    setActiveColor(type === 'leather' ? 'chestnut' : 'blue');
  };

  const handleColorChange = (color) => {
    setActiveColor(color);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex items-center">
        <button
          onClick={() => navigate('/')}
          className="mr-4 hover:bg-blue-700 p-2 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">ASTER - Configurateur de Fauteuil</h1>
      </header>

      <div className="flex flex-1">
        <div className="w-1/3 bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personnalisation</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Type de Revêtement</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleTextureChange('leather')}
                className={`
                  p-4 border-2 rounded-lg transition-all duration-300
                  ${textureType === 'leather'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'}
                `}
              >
                <p className="text-sm font-medium">Cuir</p>
                <p className="text-xs text-gray-500">Premium et élégant</p>
              </button>
              <button
                onClick={() => handleTextureChange('tissu')}
                className={`
                  p-4 border-2 rounded-lg transition-all duration-300
                  ${textureType === 'tissu'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'}
                `}
              >
                <p className="text-sm font-medium">Tissu</p>
                <p className="text-xs text-gray-500">Doux et confortable</p>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Choix de la Couleur</h3>
            <div className="grid grid-cols-3 gap-4">
              {(textureType === 'leather' ? colorOptions.leather : colorOptions.tissu).map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleColorChange(option.value)}
                  className={`
                    p-4 border-2 rounded-lg transition-all duration-300 flex flex-col items-center
                    ${activeColor === option.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'}
                  `}
                >
                  <div
                    className="w-12 h-12 mb-2 rounded-full border border-gray-200"
                    style={{ backgroundColor: option.color }}
                  />
                  <p className="text-sm font-medium">{option.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold mb-2">💡 Conseil</h3>
            <p className="text-sm text-yellow-800">
              {textureType === 'leather'
                ? 'Choisissez une teinte de cuir qui complémente votre intérieur.'
                : 'Le tissu offre un confort et une variété de couleurs.'}
            </p>
          </div>
        </div>

        <div className="w-2/3 bg-gray-100 flex items-center justify-center p-8 relative">
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-white/50">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          }>
            <Canvas
              shadows
              gl={{ antialias: false }}
              camera={{ position: [1.3, 0.3, -0.6], fov: 45 }}
              className="w-full h-[600px] bg-white rounded-lg shadow-lg"
            >
              <pointLight position={[10, 10, 10]} intensity={1} />
              <ambientLight intensity={5} />
              <Stage
                environment="apartment"
                intensity={0.5}
                preset="rembrandt"
                adjustCamera={0}
                opacity={0.5}
                shadows={false}
              >
                <ChairModel
                  activeTexture={textureType}
                  activeColor={activeColor}
                />
              </Stage>
              <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
            </Canvas>
          </Suspense>
        </div>
      </div>

      <footer className="bg-gray-200 p-4 text-center text-sm">
        © 2024 Aster Furniture. Tous droits réservés.
      </footer>
    </div>
  );
};

export default PersonnalisationPage;