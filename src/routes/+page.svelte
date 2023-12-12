<script>
	import '../app.postcss';
	import * as THREE from "three"
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
	import { onMount } from 'svelte';

	onMount(async () => {
		const canvas = document.querySelector('canvas.webgl')
	
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

		const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
		camera.position.set(4,2, 0)
		scene.add(camera)
		
		// Controls
		const controls = new OrbitControls(camera, canvas)
		controls.target.set(0, 0.75, 0)
		controls.enableDamping = true
		controls.autoRotate = true
		
		const renderer = new THREE.WebGLRenderer({
    	canvas: canvas,
			alpha: true
		})
		renderer.setClearAlpha(0)
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


		//loop genereate donuts
		for(let i = 0; i < 20; i++){
			let donutType = Math.floor(Math.random() * 3)
			let donutLoad;

			if(donutType == 0)
				donutLoad = "../assets/3d/single-donuts/chocolate.gltf"
			else if(donutType == 1)
				donutLoad = "../assets/3d/donut-test/scene.gltf"
			else if (donutType == 2)
				donutLoad = "../assets/3d/single-donuts/blue.gltf"
			gltfLoader.load(
				donutLoad,
			(gltf) =>
			{
				console.log('success')
					gltf.scene.scale.set(12, 12, 12)
					gltf.scene.position.x = (Math.random() - 0.5) * 10
					gltf.scene.position.y = (Math.random() - 0.5) * 10
					gltf.scene.position.z = (Math.random() - 0.5) * 10
					gltf.scene.rotation.x = Math.random() * Math.PI
					gltf.scene.rotation.y = Math.random() * Math.PI
					scene.add(gltf.scene)
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
		}

		const clock = new THREE.Clock()
		let previousTime = 0

		const tick = () =>
		{
				const elapsedTime = clock.getElapsedTime()
				const deltaTime = elapsedTime - previousTime
				previousTime = elapsedTime

				// Update controls
				controls.update(deltaTime)

				// Render
				renderer.render(scene, camera)

				// Call tick again on the next frame
				window.requestAnimationFrame(tick)
		}

		tick()
	});
</script>

<canvas class="webgl"></canvas>

<section class="h-screen flex flex-col justify-center items-center gap-4">
	<h2 class="h1">Welcome</h2>
	<p class="h2">Explore Our Donuts</p>
	<a href="/products"  class="btn variant-filled-primary" data-sveltekit-preload-data="hover">Learn More</a>
</section>
