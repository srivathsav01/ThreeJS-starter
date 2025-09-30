import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const group = new THREE.Group()
group.scale.y = 2
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

renderer.render(scene, camera)

