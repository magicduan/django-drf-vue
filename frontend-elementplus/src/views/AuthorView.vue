<script setup lang="ts">
  import PostList from '../components/PostList.vue'
  import {computed,onMounted,ref} from 'vue'
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import { useBlogData } from '~/datastore/blogDataStore';

  const blogData = useBlogData()


  const author = ref(null)
  const posts = ref(null)

  async function getAuthorAndPosts(userName:string){
    if (userName){
      author.value = await blogData.fetchAuthorByUsername(userName)
      posts.value = await blogData.fetchPostsByUsername(userName)
    }
  }

  onMounted(async () => {
    let p_username = useRoute().params.username
    await getAuthorAndPosts(p_username)
  })

  onBeforeRouteUpdate(async (to,from) => {
    let p_username = to.params.username
    await getAuthorAndPosts(p_username)
  })

  function getDisplayName(){
    if (author && author.value.user){
      return (
          author.value.user.firstName &&
          author.value.user.lastName &&
          `${author.value.user.firstName} ${author.value.user.lastName}`
        ) || `${author.value.user.username}`
    }else{
      return ""
    }
  }
</script>

<template>
    <div v-if="author==null">Page Loading </div>
    <div v-else>
      <div v-if="author" >
        <h2>{{ getDisplayName() }}</h2>
        <div class="left">
          <el-link :href="author.website"> Website:{{author.website  }}</el-link>
          <p>{{ author.bio }}</p>
        </div>
        <PostList v-if="posts" :posts="posts" :showAuthor="false" />
      </div>
    </div>
</template>
  
