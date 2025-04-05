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
  const { nodes, materials } = useGLTF('./model/assets/chair2.glb');

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
    displacementScale: 0.001,
    displacementBias: -0.00001,
  });

  return (
    <group>
      <mesh
        name="Aster_Luxury_Leather_Armchair"
        castShadow
        receiveShadow
        geometry={nodes.Aster_Luxury_Leather_Armchair.geometry}
        material={pbrMaterial}
        position={[-0.264, 0.359, -0.026]}
        rotation={[Math.PI / 2, 0.442, -Math.PI / 2]}
        scale={0.295}
      >
        <mesh
          name="armature"
          castShadow
          receiveShadow
          geometry={nodes.armature.geometry}
          material={materials['wood.001']}
          position={[0, 0.408, 0.448]}
          rotation={[-1.128, 0, -Math.PI / 2]}
          scale={0.996}
        />
        <mesh
          name="armature001"
          castShadow
          receiveShadow
          geometry={nodes.armature001.geometry}
          material={materials['wood.001']}
          position={[0, 0.024, 1.258]}
          rotation={[-1.128, 0, 0]}
          scale={0.996}
        />
        <mesh
          name="armature002"
          castShadow
          receiveShadow
          geometry={nodes.armature002.geometry}
          material={materials['wood.001']}
          position={[0, 0.908, 1.229]}
          rotation={[0.398, 0, 0]}
          scale={0.996}
        />
        <mesh
          name="cuir"
          castShadow
          receiveShadow
          geometry={nodes.cuir.geometry}
          material={pbrMaterial}
          position={[0, 0.432, 0.825]}
          rotation={[-1.128, 0, 0]}
          scale={0.996}
        />
        <mesh
          name="cuir001"
          castShadow
          receiveShadow
          geometry={nodes.cuir001.geometry}
          material={pbrMaterial}
          position={[0, 0.222, 0.84]}
          rotation={[0.442, 0, -Math.PI / 2]}
          scale={0.996}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('./model/assets/chair2.glb');
