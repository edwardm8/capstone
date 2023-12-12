<script>
  import '../../../app.postcss';
	import LargeCard from '$lib/components/large-card.svelte'
	export let data
  const { post } = data;

</script>

<LargeCard>
	<img src={post.pic} alt={post.attribute} class="aspect-square">
	<section class="flex flex-col p-4 max-w-2xl justify-center">
		<h2 class="h2 p-4">{post.name}</h2>
		<p class="p-4 text-xl">{post.description}</p>
	</section>
</LargeCard>

