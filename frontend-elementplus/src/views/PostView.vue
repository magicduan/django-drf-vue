<script setup lang="ts">
  import AuthorLink from '../components/AuthorLink.vue'
  import { onMounted, ref } from 'vue'
  import { onBeforeRouteUpdate, useRoute } from 'vue-router'
  import { useBlogData } from '~/datastore/blogDataStore'

  const blogDataStore = useBlogData()
  const post = ref(null)

  async function getPostBySlug(slug: string){

    let result = await blogDataStore.retrievePostBySlug(slug)
    if (result){
      post.value = result[0]
    }
  }

  onMounted(async() => {
    let postSlug = useRoute().params.slug
    await getPostBySlug(postSlug)
  })

  onBeforeRouteUpdate(async(to,from) => {
    let postSlug = to.params.slug
    await getPostBySlug(postSlug)
  })

  function displayableDate (date:string) {
    return new Intl.DateTimeFormat(
      'en-US',
      { dateStyle: 'full' },
    ).format(new Date(date))
  }

</script>

<template>
    <h2 v-if="post==null">Loading...</h2>
    <div class="post" style="min-width: 500px;margin-left: 20px;" v-if="post">
        <h2>{{ post.title }}</h2>
        <el-descriptions class="margin-top" size="large" :column="3">
          <template #title> 
           <el-text type="primary">Subtitle:&nbsp;&nbsp;{{ post.subtitle }} </el-text>
          </template>
          <el-descriptions-item label="Poster:">
                  <AuthorLink :author="post.author" />
          </el-descriptions-item>
          <el-descriptions-item label="Tags:" align="right">
            <span v-for="tag in post.tags" :key="tag.name">
              <el-link :href="`/tag/${tag.name}`" type="primary">#{{ tag.name }}</el-link> &nbsp;&nbsp;  
            </span>
          </el-descriptions-item>
          <el-descriptions-item label = "Date:" align="right">
            <el-text type="success"> {{ displayableDate(post.publish_date) }} </el-text>
          </el-descriptions-item>
          <el-descriptions-item label="Description:" :span="3" align="left"> 
            <el-text>{{ post.metaDescription }}</el-text>
          </el-descriptions-item>
        </el-descriptions>
          <el-card>
          <article align="left">
            {{ post.body }}
          </article>
        </el-card>
    </div>
</template>
  
