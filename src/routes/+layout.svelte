<script>
	import '../app.postcss';
	import { AppShell,LightSwitch, AppBar } from '@skeletonlabs/skeleton'
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-primary-50-900-token">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Logo</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="hover:text-secondary-500" href="/">Home</a>
				<a class="hover:text-secondary-500" href="/products">About</a>
				<a class="hover:text-secondary-500" href="/products">Products</a>
        <LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
		<AppBar background="bg-primary-50-900-token">
			<svelte:fragment slot="trail">
				&copy; Stuff
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
</AppShell>

