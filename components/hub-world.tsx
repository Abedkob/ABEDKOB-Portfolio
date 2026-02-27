"use client"

import { useRef, useMemo, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text, Stars } from "@react-three/drei"
import * as THREE from "three"
import { useGame } from "@/lib/game-context"
import { HudNav } from "@/components/hud-nav"
import type { GameState } from "@/lib/game-context"

type StationData = {
  label: string
  target: string
  position: [number, number, number]
  color: string
  description: string
}

const STATIONS: StationData[] = [
  { label: "MISSIONS", target: "missions", position: [-3, 0.5, -2], color: "#00dcff", description: "Projects Terminal" },
  { label: "LOADOUT", target: "loadout", position: [3, 0.5, -2], color: "#ff3d8e", description: "Skills Arsenal" },
  { label: "ARCHIVES", target: "archives", position: [-3, 0.5, 2], color: "#00ff88", description: "About & Education" },
  { label: "OPERATIONS", target: "ops", position: [3, 0.5, 2], color: "#ffaa00", description: "Career Timeline" },
  { label: "CONTACT", target: "contact", position: [0, 0.5, 3.5], color: "#00dcff", description: "Open Comms" },
]

function GridFloor() {
  return (
    <gridHelper
      args={[30, 30, new THREE.Color("#00dcff"), new THREE.Color("#00dcff")]}
      position={[0, -0.5, 0]}
      material-opacity={0.08}
      material-transparent={true}
    />
  )
}

function FloatingParticles({ count = 60 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = Math.random() * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00dcff" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function Station({ data, onSelect }: { data: StationData; onSelect: (target: string) => void }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = data.position[1] + Math.sin(state.clock.elapsedTime * 1.5 + data.position[0]) * 0.1
    }
  })

  return (
    <group position={data.position}>
      {/* Glow ring on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
        <ringGeometry args={[0.6, 0.8, 32]} />
        <meshBasicMaterial color={data.color} transparent opacity={hovered ? 0.5 : 0.15} />
      </mesh>

      {/* Station object */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => {
            setHovered(true)
            document.body.style.cursor = "pointer"
          }}
          onPointerLeave={() => {
            setHovered(false)
            document.body.style.cursor = "default"
          }}
          onClick={() => onSelect(data.target)}
        >
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={hovered ? 1 : 0.3}
            transparent
            opacity={0.85}
            wireframe={!hovered}
          />
        </mesh>
      </Float>

      {/* Label */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.15}
        color={data.color}
        anchorX="center"
        anchorY="bottom"
        font="/fonts/Geist-Bold.ttf"
      >
        {data.label}
      </Text>
      <Text
        position={[0, 1.0, 0]}
        fontSize={0.08}
        color="#888"
        anchorX="center"
        anchorY="bottom"
        font="/fonts/GeistMono-Regular.ttf"
      >
        {data.description}
      </Text>

      {/* Interact prompt */}
      {hovered && (
        <Text
          position={[0, 1.55, 0]}
          fontSize={0.09}
          color={data.color}
          anchorX="center"
          anchorY="bottom"
          font="/fonts/GeistMono-Regular.ttf"
        >
          {"[CLICK] INTERACT"}
        </Text>
      )}
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.x = Math.sin(t * 0.1) * 0.5
    state.camera.position.z = 8 + Math.cos(t * 0.08) * 0.3
    state.camera.position.y = 3 + Math.sin(t * 0.12) * 0.2
    state.camera.lookAt(0, 0.5, 0)
  })
  return null
}

function HubScene({ onStationSelect }: { onStationSelect: (target: string) => void }) {
  return (
    <>
      <color attach="background" args={["#050810"]} />
      <fog attach="fog" args={["#050810", 8, 25]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 10, 5]} intensity={0.3} color="#00dcff" />
      <pointLight position={[0, 4, 0]} intensity={0.6} color="#00dcff" distance={15} decay={2} />
      <pointLight position={[-4, 2, -3]} intensity={0.3} color="#ff3d8e" distance={10} decay={2} />
      <pointLight position={[4, 2, 3]} intensity={0.3} color="#00ff88" distance={10} decay={2} />

      <CameraRig />
      <Stars radius={50} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />
      <GridFloor />
      <FloatingParticles />

      {/* Center platform */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 6]} />
        <meshStandardMaterial color="#00dcff" emissive="#00dcff" emissiveIntensity={0.1} transparent opacity={0.1} />
      </mesh>

      {/* Center label */}
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.25}
        color="#00dcff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist-Bold.ttf"
      >
        ABEDKOB
      </Text>
      <Text
        position={[0, 0.05, 0]}
        fontSize={0.08}
        color="#666"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf"
      >
        SELECT A STATION
      </Text>

      {STATIONS.map((s) => (
        <Station key={s.target} data={s} onSelect={onStationSelect} />
      ))}
    </>
  )
}

export function HubWorld() {
  const { navigateTo } = useGame()

  const handleStationSelect = (target: string) => {
    document.body.style.cursor = "default"
    navigateTo(target as GameState)
  }

  return (
    <div className="fixed inset-0 bg-background">
      <HudNav title="HUB WORLD" subtitle="INTERACTIVE STATION SELECT" />

      <Suspense fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-mono text-primary">LOADING HUB...</span>
          </div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 3, 8], fov: 50 }}
          className="w-full h-full"
          gl={{ antialias: true, alpha: false }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <HubScene onStationSelect={handleStationSelect} />
        </Canvas>
      </Suspense>

      {/* Bottom HUD */}
      <div className="fixed bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
        <div className="text-xs font-mono text-muted-foreground">
          <span className="text-primary/50">[CLICK]</span> Interact with stations
        </div>
        <div className="text-xs font-mono text-muted-foreground">
          STATIONS ONLINE: {STATIONS.length}/{STATIONS.length}
        </div>
      </div>
    </div>
  )
}
