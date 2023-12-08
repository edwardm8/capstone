<script>
  import '../../../app.postcss';
  import { donutList } from "$lib/data.js";
  import { onMount } from 'svelte';
	import * as THREE from "three"
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

	export let data
  const { post } = data;

  onMount(async () => {
		const canvas = document.querySelector('canvas.webgl')
	
		const scene = new THREE.Scene();

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
		camera.position.set(1,1,1)
		scene.add(camera)
		
		// Controls
		const controls = new OrbitControls(camera, canvas)
		controls.target.set(0, 0, 0)
		controls.enableDamping = true

		// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		const gltfLoader = new GLTFLoader()

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

	
		//loop genereate donuts
			gltfLoader.load(
				post.href,
				// "../../assets/3d/chocolate/chocolate.gltf",
			(gltf) =>
			{
					console.log(gltf)

					gltf.scene.scale.set(5, 5, 5)
					gltf.scene.position.z = -2.3
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
		

		const clock = new THREE.Clock()
		let previousTime = 0

		const tick = () =>
		{
				const elapsedTime = clock.getElapsedTime()
				const deltaTime = elapsedTime - previousTime
				previousTime = elapsedTime

				// Update controls
				controls.update(deltaTime)

				// //update mixed
				// if(mixer !== null)
				// 	mixer.update(deltaTime)
	
				
				// Render
				renderer.render(scene, camera)

				// Call tick again on the next frame
				window.requestAnimationFrame(tick)
		}

		tick()
	
	});
</script>

<canvas class="webgl"></canvas>
	

<section class="text-stuff">
	<h2>Chocolate Donut</h2>
</section>


