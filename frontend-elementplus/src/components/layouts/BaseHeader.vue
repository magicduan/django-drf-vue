<script setup lang="ts" >
import { toggleDark } from '~/composables';
import { ref,onMounted } from 'vue';

import { useBlogData } from '../../datastore/blogDataStore';
import { computed } from '@vue/reactivity';
const blogData = useBlogData()
const tagItems = ref([])

const msg = ref("/hello/\"Hello Vue 3.0 + Element Plus + Vite\"")

onMounted(async()=>{
  tagItems.value  = await blogData.fetchTags()

})

</script>
<template>
  <el-menu class="el-menu-demo" mode="horizontal" :router= true>
    <el-menu-item index="/">My Blog</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Posts</template>
      <el-menu-item index="/posts">All Posts</el-menu-item>
      <el-menu-item index="2-1">Add Post</el-menu-item>
      <el-menu-item index="2-2">Delete Post</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>...</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>

    <el-sub-menu v-if="tagItems.length" index="tags" >
      <template #title>Tags</template>
      <el-menu-item v-for="tagInfo in tagItems" :index="'/tag/'+tagInfo.name">
        {{ tagInfo.name }}
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item v-else index="tags" disabled>Tags</el-menu-item>

    <el-menu-item :index="msg" >HelloVue</el-menu-item>

    <el-menu-item h="full" @click="toggleDark()">
      <button class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height);">
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
    </el-menu-item>
  </el-menu>
</template>
