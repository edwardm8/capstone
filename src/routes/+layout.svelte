<script>
	import '../app.postcss';
	import { AppShell,LightSwitch, AppBar } from '@skeletonlabs/skeleton'
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-secondary-900">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase text-4xl">Donut Rain</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="hover:text-primary-500 h3" href="/">Home</a>
				<a class="hover:text-primary-500 h3" href="/about">About</a>
				<a class="hover:text-primary-500 h3" href="/products">Products</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
		<AppBar background="bg-secondary-900">
			<svelte:fragment slot="lead">
				&copy; All Rights Reserved 
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="hover:text-primary-500 h3" href="/">Home</a>
				<a class="hover:text-primary-500 h3" href="/about">About</a>
				<a class="hover:text-primary-500 h3" href="/products">Products</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
</AppShell>

