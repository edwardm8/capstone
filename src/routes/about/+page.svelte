<script>
  import '../../app.postcss';
  import { onMount } from 'svelte';
	import * as THREE from "three"
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import gsap from 'gsap'
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

	export let data
  const { post } = data;

  onMount(async () => {
		const canvas = document.querySelector('canvas.about')
	
		const scene = new THREE.Scene();

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('../draco/')
		const gltfLoader = new GLTFLoader()
		gltfLoader.setDRACOLoader(dracoLoader)

		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}
		

		window.addEventListener('resize', () =>
		{
			// Update sizes
			sizes.width = window.innerWidth
			sizes.height = window.innerHeight

			// Update camera
			camera.aspect = sizes.width / sizes.height
			camera.updateProjectionMatrix()

			// Update renderer
			renderer.setSize(sizes.width, sizes.height)
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})

		/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3.5
cameraGroup.add(camera)

		// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
		// camera.position.set(1,0.8,1)
		// scene.add(camera)
		
		// // Controls
		// const controls = new OrbitControls(camera, canvas)
		// controls.target.set(0, 0, 0)
		// controls.enableDamping = true
	

		
		const objectsDistance = 2

		const renderer = new THREE.WebGLRenderer({
    	canvas: canvas
		})
		renderer.shadowMap.enabled = true
		renderer.shadowMap.type = THREE.PCFSoftShadowMap
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		document.body.appendChild( renderer.domElement );

		//lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
		scene.add(ambientLight)

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
		directionalLight.castShadow = true
		directionalLight.shadow.mapSize.set(1024, 1024)
		directionalLight.shadow.camera.far = 15
		directionalLight.shadow.camera.left = - 7
		directionalLight.shadow.camera.top = 7
		directionalLight.shadow.camera.right = 7
		directionalLight.shadow.camera.bottom = - 7
		directionalLight.position.set(5, 5, 5)
		scene.add(directionalLight)

		let gltfMeshes = []
		gltfLoader.load(
				"../../assets/3d/plate/plate-light.gltf",
		(gltf) =>
		{
				console.log(gltf)
				gltf.scene.scale.set(3.3, 3.3, 3.3)
				gltf.scene.position.y = - objectsDistance *0 + -.3
				gltf.scene.position.x = .8
				scene.add(gltf.scene)
				gltfMeshes = [gltf.scene]
		},
		(progress) =>
		{
				console.log('progress')
				console.log(progress)
		},
		(error) =>
		{
				console.log('error')
				console.log(error)
		}
		)

		let gltfTwo = []
		gltfLoader.load(
				"../../assets/3d/plate/double.gltf",
		(gltf) =>
		{
				console.log(gltf)
				gltf.scene.scale.set(6, 6, 6)
				gltf.scene.position.y = -objectsDistance * 1
				gltf.scene.position.x = -1
				scene.add(gltf.scene)
				gltfTwo.push(gltf.scene)
		},
		(progress) =>
		{
				console.log('progress')
				console.log(progress)
		},
		(error) =>
		{
				console.log('error')
				console.log(error)
		}
		)

		gltfLoader.load(
				"../../assets/3d/plate/blue-stand.gltf",
		(gltf) =>
		{
				console.log(gltf)
				gltf.scene.scale.set(7, 7, 7)
				gltf.scene.position.x = 1
				gltf.scene.position.y = -objectsDistance * 2 
				scene.add(gltf.scene)
				gltfTwo.push(gltf.scene)
		},
		(progress) =>
		{
				console.log('progress')
				console.log(progress)
		},
		(error) =>
		{
				console.log('error')
				console.log(error)
		}
		)
		

		let scrollY = window.scrollY
		let currentSection = 0

		//scroll and greensock
		window.addEventListener('scroll',() => {
			scrollY = window.scrollY

			const newSection = Math.round(scrollY / sizes.height) 
			console.log(newSection)
		

			if(newSection >= 1 && newSection < 2){
				currentSection = 1

				gsap.to(
					gltfTwo[0].rotation,
					{
						duration: 3,
						ease: 'power2.inOut',
						x: '+=6',
						y: '+=3',
						z: '+=1.5'
					}
        )
			}
			else if( newSection >= 2){
				currentSection = newSection

				gsap.to(
					gltfTwo[1].rotation,
					{
						duration: 3,
						ease: 'power2.inOut',
						x: '+=6',
						y: '+=3',
						z: '+=1.5'
					}
        )
			}
		})

		const clock = new THREE.Clock()
		let previousTime = 0

		const tick = () =>
		{
				const elapsedTime = clock.getElapsedTime()
				const deltaTime = elapsedTime - previousTime
				previousTime = elapsedTime


				//animate 
				for(const gltf of gltfMeshes){
					gltf.rotation.y += deltaTime * 0.1
				}
				
				for(const gltfOther of gltfTwo){
					gltfOther.rotation.x += deltaTime * 0.1
					gltfOther.rotation.y += deltaTime * 0.1
				}

				//animate camera 
				camera.position.y = - scrollY / sizes.height * objectsDistance

				// Update controls
				// controls.update(deltaTime)
				
				// Render
				renderer.render(scene, camera)

				// Call tick again on the next frame
				window.requestAnimationFrame(tick)
		}

		tick()
	
	});
  </script>

  <canvas class="about"></canvas>

  <section class="text-stuff">
    <h2 class="h1">About Us</h2>
  </section>

	<section class="text-stuff-right">
    <h2 class="h2">Always Fresh</h2>
		<p class="max-w-xl  p-4">
			Welcome to Always Fresh Donuts, where indulgence meets perfection in every delightful bite!
			Our passion for crafting exceptional donuts drives us to create a tempting array of flavors that redefine the art of sweet treats. 
			Immerse yourself in the irresistible world of Always Fresh Donuts,
			where each creation is a celebration of flavor, freshness, and joy.
		</p>
  </section>

	<section class="text-stuff">
    <h2 class="h2">Award Winning</h2>
		<p class="max-w-xl p-4">We pride ourselves on pushing the boundaries of traditional donut-making. 
			Our chefs are relentless in their pursuit of culinary innovation, constantly introducing new and exciting flavor profiles that set us apart as pioneers in the world of artisanal donuts.</p>
  </section>
  