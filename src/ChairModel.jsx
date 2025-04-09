import React from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const colorMappings = {
  leather: {
    chestnut: '#7B503C',
    darkBrown: '#4A2C1D',
    caramel: '#FFE8D9'
  },
  tissu: {
    blue: '#FDFBFC',
    gray: '#525252'
  }
};

export default function ChairModel({ activeTexture, activeColor }) {
  const { nodes, materials } = useGLTF('./model/assets/chair3.glb');

  // Charger les textures de coton
  const cottonTextures = useTexture({
    normalMap: './model/assets/Fabric061_1K-PNG/Fabric061_1K-PNG_NormalDX.png',
    baseColorMap: './model/assets/Fabric061_1K-PNG/Fabric061_1K-PNG_Color.png',
    displacementMap: './model/assets/Fabric061_1K-PNG/Fabric061_1K-PNG_Displacement.png',
    roughnessMap: './model/assets/Fabric061_1K-PNG/Fabric061_1K-PNG_Roughness.png',
    // aoMap: '/model/assets/Fabric061_1K-PNG/Fabric061_1K-PNG_AmbientOcclusion.png',
    
  });

  // Créer un matériau centralisé pour les meshes
  const pbrMaterial = new THREE.MeshStandardMaterial({
    map: activeTexture === 'leather' ? materials.leather.map : cottonTextures.baseColorMap,
    normalMap: activeTexture === 'leather' ? materials.leather.normalMap : cottonTextures.normalMap,
    displacementMap: activeTexture === 'leather' ? materials.leather.displacementMap : cottonTextures.displacementMap,
    // aoMap: activeTexture === 'leather' ? materials.leather.aoMap : cottonTextures.aoMap,
    roughnessMap: activeTexture === 'leather' ? materials.leather.roughnessMap : cottonTextures.roughnessMap,
    color: new THREE.Color(colorMappings[activeTexture][activeColor]),
    roughness: 1,
    metalness: 0.5,
    displacementScale: 0.00001,
    displacementBias: -0.000001,
  });

  return (
    <group {...props} dispose={null}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Aster_Luxury_Leather_Armchair.geometry}
      material={materials.leather}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.armature.geometry}
        material={materials['wood.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.armature001.geometry}
        material={materials['wood.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.armature002.geometry}
        material={materials['wood.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cuir.geometry}
        material={materials.leather}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cuir001.geometry}
        material={materials.leather}
      />
    </mesh>
  </group>
  );
}

useGLTF.preload('./model/assets/chair3.glb');
