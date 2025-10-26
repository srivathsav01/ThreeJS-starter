import * as THREE from 'three'
import { gsap } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
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
const gui = new GUI()
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

const debugObject = {}
debugObject.color1 = 0xff0000
debugObject.color2 = 0xff00ff
debugObject.color3 = 0x00ffff
debugObject.color4 = 0xffff00
debugObject.color5 = 0x00ff00
debugObject.subdivision = 2
debugObject.wireframe = true
// Object
const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color1, wireframe: debugObject.wireframe })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 1
group.add(mesh)

const material2 = new THREE.MeshBasicMaterial({ color: debugObject.color2, wireframe: debugObject.wireframe })
const mesh2 = new THREE.Mesh(geometry, material2)
group.add(mesh2)

const material3 = new THREE.MeshBasicMaterial({ color: debugObject.color3, wireframe: debugObject.wireframe })
const mesh3 = new THREE.Mesh(geometry, material3)
mesh3.position.x = 1
mesh3.position.z = -1
group.add(mesh3)

const material4 = new THREE.MeshBasicMaterial({ color: debugObject.color4, wireframe: debugObject.wireframe })
const mesh4 = new THREE.Mesh(geometry, material4)
mesh4.position.x = -1
mesh4.position.z = -1
group.add(mesh4)

const material5 = new THREE.MeshBasicMaterial({ color: debugObject.color5, wireframe: debugObject.wireframe })
const mesh5 = new THREE.Mesh(geometry, material5)
mesh5.position.x = -1
group.add(mesh5)

scene.add(group)
gui.add(group.position, 'y', - 3, 3, 0.01).name('elevation')
gui.add(group, 'visible').name('display cube')
gui.add(debugObject, 'wireframe').name('wireframe mode').onChange(() =>
{
    group.children.forEach((child, index) =>
    {
        if (child.isMesh)
        {
            child.material.wireframe = debugObject.wireframe
        }
    })
})
const cubeTweaks = gui.addFolder('Cube colors')
cubeTweaks.addColor(debugObject, 'color1').name("Cube 1 Color").onChange(() => material.color.set(debugObject.color1))
cubeTweaks.addColor(debugObject, 'color2').name("Cube 2 Color").onChange(() => material.color.set(debugObject.color2))
cubeTweaks.addColor(debugObject, 'color3').name("Cube 3 Color").onChange(() => material.color.set(debugObject.color3))
cubeTweaks.addColor(debugObject, 'color4').name("Cube 4 Color").onChange(() => material.color.set(debugObject.color4))
cubeTweaks.addColor(debugObject, 'color5').name("Cube 5 Color").onChange(() => material.color.set(debugObject.color5))
gui
    .add(debugObject, 'subdivision')
    .min(1)
    .max(15)
    .step(1)
    .onFinishChange(() =>
    {
        group.children.forEach(child =>
        {
            if (child.isMesh)
            {
                child.geometry.dispose()
                child.geometry = new THREE.BoxGeometry(
                    1, 1, 1,
                    debugObject.subdivision,
                    debugObject.subdivision,
                    debugObject.subdivision
                )
            }
        })
    })
debugObject.spin = () =>
{
    gsap.to(group.rotation, { duration: 1, y: group.rotation.y + Math.PI * 2 })
}
gui.add(debugObject, 'spin')
gui.hide()

window.addEventListener('keydown', (event) =>
{
    if(event.key == 'h')
        gui.show(gui._hidden)
})

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



