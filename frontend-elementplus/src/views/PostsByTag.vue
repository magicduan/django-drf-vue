<script setup lang="ts">
  import PostList from '../components/PostList.vue'
  import {onBeforeUpdate, onMounted, onUpdated, ref} from 'vue'
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import { useBlogData } from '../datastore/blogDataStore';

  const blogData = useBlogData()
  const posts = ref(null)

  async function  getPosts(p_tag) {  
    if (p_tag) {
      posts.value = await blogData.fetchPostsByTag(p_tag)
    }
  }

  onMounted(async ()=> {
    let p_tag = useRoute().params.tag
    await getPosts(p_tag)
  })

  onBeforeRouteUpdate(async (to,from)=> {
    await getPosts(to.params.tag)
  })

  // onBeforeUpdate(async ()=>{
  //   await getPosts()
  // })

</script>

<template>
    <div>      
      <h2>Posts in tag #{{ $route.params.tag }}</h2>
      <PostList :posts="posts" v-if="posts" />
    </div>
</template>
  

