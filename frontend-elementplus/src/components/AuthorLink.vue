
<script setup lang="ts">

  import {computed } from 'vue';
  const props = defineProps({
      author:{ type: Object, required:true}
  })

  const displayName = computed(()=>{
    return (
          props.author.user.firstName &&
          props.author.user.lastName &&
          `${ props.author.user.firstName} ${props.author.user.lastName}`
        ) || `${props.author.user.username}`

  })

</script>

<template>
    <router-link
        :to="`/author/${author.user.username}`"
    >{{ displayName }}</router-link>
</template>
  

