import { donutList } from "../../../lib/data.js";

// route parameters from svelte tutorial
export const load = ({ params }) => {
const post = donutList.find((post) => post.id === params.id);

//throw not found if invalid route https://learn.svelte.dev/tutorial/page-data
if (!post) throw error(404);

return{
  post
}
}

