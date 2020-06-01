import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

import './App.css';

// background
const bg1 = 0xFFFFFF

// shirt
const gr1 = 0xEFFDF7
const gr2 = 0xDAF2E9
const gr3 = 0xA2D9C6

// hair
const hr1 = 0x876143
const hr2 = 0x986D4C

// eyes
const ey1 = 0x000000

// skin
const sk1 = 0xFEBD89
const sk2 = 0xF3AC8C
const sk3 = 0xFDCEA7

const pixels = [
  [bg1, bg1, bg1, bg1, hr2, hr2, hr2, hr2, hr1, bg1, bg1],
  [bg1, bg1, bg1, hr2, hr1, hr1, hr1, hr1, hr1, hr1, bg1],
  [bg1, bg1, hr2, hr1, hr1, hr1, hr1, hr1, hr1, hr1, bg1],
  [bg1, bg1, hr1, hr1, hr1, sk3, sk1, sk1, sk1, hr1, bg1],
  [bg1, bg1, sk1, hr1, hr1, sk3, sk1, sk1, sk1, sk1, bg1],
  [bg1, bg1, sk2, hr1, sk3, sk1, ey1, sk1, sk1, ey1, bg1],
  [bg1, bg1, bg1, sk2, sk3, sk1, sk1, sk1, sk1, sk1, bg1],
  [bg1, bg1, bg1, sk2, sk1, sk1, hr1, hr1, hr1, hr1, bg1],
  [bg1, bg1, bg1, bg1, sk2, hr1, sk1, sk1, sk1, hr1, bg1],
  [bg1, bg1, bg1, gr3, sk2, sk1, hr1, hr1, hr1, bg1, bg1],
  [bg1, bg1, gr2, gr1, gr1, sk1, sk1, sk1, gr3, bg1, bg1],
  [bg1, gr2, gr1, gr3, gr1, gr1, sk1, gr1, gr1, gr3, bg1],
  [gr2, gr1, gr1, gr1, gr3, gr1, gr1, gr1, gr3, gr1, gr2],
  [gr2, gr1, gr1, gr1, gr1, gr3, gr1, gr3, gr1, gr1, gr2],
  [gr2, gr1, gr3, gr1, gr1, gr1, gr2, gr1, gr1, gr3, gr2],
  [gr2, gr1, gr3, gr1, gr1, gr1, gr1, gr1, gr1, gr3, gr2],
]

const Box: React.FC<{position: [number, number, number], color: number}> = ({position, color}) => {
  const meshRef = useRef<any>()

  if (position[0] === 0 && position[1] === 0) {
    if (meshRef.current) {
      console.log('re-rendering 0x0')
    } else {
      console.log('rendering 0x0')
    }
  }

  useFrame(() => {
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh position={position} ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

const FunImage = (pixels: number[][]) => {
  const elements: JSX.Element[] = [];

  for(let x = 0; x < pixels.length; x++) {
    const row = pixels[x];
    for(let y = 0; y < row.length; y++) {
      const color = row[y]
      elements.push(<Box position={[y, -x, -1]} color={color} key={`${x}-${y}`} />)
    }
  }

  console.log('elements', elements)
  return elements;
}

function App() {
  return (<Canvas
    camera={{ position: [0, 0, 50], near: 0.01, far: 10000 }}
  >
    <ambientLight />
    {FunImage(pixels)}
  </Canvas>)
}

export default App;
