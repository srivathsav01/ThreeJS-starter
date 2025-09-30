import * as THREE from 'three'
import { gsap } from 'gsap'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const group = new THREE.Group()
group.scale.y = 1
// group.rotation.y = Math.PI * 0.25
group.rotation.x = Math.PI * 0.25
scene.add(group)

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 1
group.add(mesh)

const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff })
const mesh2 = new THREE.Mesh(geometry, material2)
// mesh2.position.x = 0
group.add(mesh2)

const material3 = new THREE.MeshBasicMaterial({ color: 0x00ffff })
const mesh3 = new THREE.Mesh(geometry, material3)
mesh3.position.x = 1
mesh3.position.z = -1
group.add(mesh3)

const material4 = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const mesh4 = new THREE.Mesh(geometry, material4)
mesh4.position.x = -1
mesh4.position.z = -1
group.add(mesh4)

const material5 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh5 = new THREE.Mesh(geometry, material5)
mesh5.position.x = -1
group.add(mesh5)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.lookAt(new THREE.Vector3(1, 0, 0))
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Animation
let time = Date.now()

// animation can also be done using gsap but not in loop, just once ( for now )
// gsap.to(group.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(group.position, { duration: 1, delay: 2, x: -2 })

const tick = () => {
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    group.position.y = Math.sin(time * 0.001)
    group.position.x = Math.cos(time * 0.001) // sin and cos to make motion like a loop
    group.rotation.y += 0.0005 * deltaTime // multiplying by deltatime to to make rotation frame rate independent
    
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()



