import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Floating particles
    const particleCount = 120
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const orangeColor = new THREE.Color("#f97316")
    const magentaColor = new THREE.Color("#d946ef")

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      const mix = Math.random()
      const c = orangeColor.clone().lerp(magentaColor, mix)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Floating torus knot
    const torusGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32)
    const torusMat = new THREE.MeshPhongMaterial({
      color: 0xf97316,
      emissive: 0xd946ef,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.position.set(3.5, 0, -2)
    scene.add(torus)

    // Second torus
    const torus2Geo = new THREE.TorusGeometry(1.5, 0.3, 32, 64)
    const torus2Mat = new THREE.MeshPhongMaterial({
      color: 0xd946ef,
      emissive: 0xf97316,
      emissiveIntensity: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat)
    torus2.position.set(-3.5, 1, -3)
    scene.add(torus2)

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(0.8, 1)
    const icoMat = new THREE.MeshPhongMaterial({
      color: 0xf97316,
      emissive: 0xd946ef,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    ico.position.set(-2, -2, -1)
    scene.add(ico)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const pointLight1 = new THREE.PointLight(0xf97316, 2, 20)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)
    const pointLight2 = new THREE.PointLight(0xd946ef, 2, 20)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Mouse parallax
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", onMouseMove)

    // Resize
    const onResize = () => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener("resize", onResize)

    // Animation
    let frameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      particles.rotation.y = t * 0.04
      particles.rotation.x = t * 0.02

      torus.rotation.x = t * 0.3
      torus.rotation.y = t * 0.2
      torus.position.y = Math.sin(t * 0.5) * 0.5

      torus2.rotation.x = t * 0.15
      torus2.rotation.z = t * 0.25
      torus2.position.y = 1 + Math.cos(t * 0.4) * 0.4

      ico.rotation.x = t * 0.4
      ico.rotation.y = t * 0.3
      ico.position.y = -2 + Math.sin(t * 0.6) * 0.3

      // Parallax
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("resize", onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
