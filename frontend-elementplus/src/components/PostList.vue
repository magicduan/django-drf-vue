<script setup lang="ts">
import AuthorLink from '../components/AuthorLink.vue'
import {computed} from 'vue'

const props = defineProps({
    posts:{type:Array,required: false, default: true},
    showAuthor: {type: Boolean,required: false,default: true}
})

const publishedPosts = computed(()=>{
      return props.posts.filter((post) => post.published)
})

function displayableDate (date:string) {
      return new Intl.DateTimeFormat(
        'en-US',
        { dateStyle: 'full' },
      ).format(new Date(date))
}

</script>

<template>
    <div class="center">
      <hr style="border:solid 0.5px; color: gray;">
      <div  style="min-width: 500px;margin-left: 20px;" v-for="post in publishedPosts" :key="post.title">

        <el-descriptions class="margin-top" :title = "`Title:  ${post.title}`" size="large" :column="2">
          <template #extra> 
            <router-link :to="`/post/${post.slug}`">{{ post.title }}: {{ post.subtitle }}</router-link> 
          </template>
          <el-descriptions-item v-if="showAuthor" label="Poster:">
                  <AuthorLink :author="post.author" />
          </el-descriptions-item>
          <el-descriptions-item label = "Date:" :align="showAuthor?'right':'left'" :span="showAuthor?1:2">
            <el-text type="success"> {{ displayableDate(post.publish_date) }} </el-text>
          </el-descriptions-item>
          <el-descriptions-item label="Description:" :span="2"> 
            <el-text>{{ post.metaDescription }}</el-text>
          </el-descriptions-item>
          <el-descriptions-item label="Tags:" :span="2">
            <span v-for="tag in post.tags" :key="tag.name">
              <el-link :href="`/tag/${tag.name}`" type="primary">#{{ tag.name }}</el-link> &nbsp;&nbsp;  
            </span>
          </el-descriptions-item>
        </el-descriptions>
        <hr style="border:solid 0.5px; color: gray;">
      </div>
    </div>
</template>
