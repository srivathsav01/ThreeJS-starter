import * as THREE from 'three'
import { gsap } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// const cursor = {
//     x: 0,
//     y: 0
// }

// window.addEventListener('mousemove', (event) =>
// {
//     cursor.x = event.clientX / sizes.width - 0.5
//     cursor.y = -(event.clientY / sizes.height - 0.5)
//     // console.log(cursor.x, cursor.y)
// })

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix() 
    // When we change camera properties you need to update projection matrix
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Scene
const scene = new THREE.Scene()

const group = new THREE.Group()
group.scale.y = 1
group.rotation.x = Math.PI * 0.25
scene.add(group)

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 1
group.add(mesh)

const material2 = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
const mesh2 = new THREE.Mesh(geometry, material2)
group.add(mesh2)

const material3 = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true })
const mesh3 = new THREE.Mesh(geometry, material3)
mesh3.position.x = 1
mesh3.position.z = -1
group.add(mesh3)

const material4 = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
const mesh4 = new THREE.Mesh(geometry, material4)
mesh4.position.x = -1
mesh4.position.z = -1
group.add(mesh4)

const material5 = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
const mesh5 = new THREE.Mesh(geometry, material5)
mesh5.position.x = -1
group.add(mesh5)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const tick = () => {
    
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(group.position)

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()



