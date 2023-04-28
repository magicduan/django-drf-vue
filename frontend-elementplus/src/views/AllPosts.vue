<script setup lang="ts">
  import PostList from '../components/PostList.vue'
  import { computed } from '@vue/reactivity';
  import { onMounted,ref } from 'vue';
  import { useBlogData } from '../datastore/blogDataStore';
  const blogData = useBlogData()

  const allPosts = ref(null)

  onMounted(async()=>{
    allPosts.value = await blogData.fetchPosts()
  })
</script>

<template>
    <div>
      
      <h2 v-if="allPosts==null">Loading....</h2>
      <div v-else>
        <h2 >Recent Posts</h2>
        <PostList v-if="allPosts" :posts="allPosts" ></PostList>
      </div>
    </div>
</template>
  

