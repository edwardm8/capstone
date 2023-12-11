<script>
  import '../../../app.postcss';
	import LargeCard from '$lib/components/large-card.svelte'
	export let data
  const { post } = data;

</script>

<LargeCard>
	<img src={post.pic} alt={post.attribute}>
	<section class="flex flex-col p-4 justify-center">
		<h2 class="h2">{post.name}</h2>
		<p>{post.description}</p>
	</section>
</LargeCard>

