<template>
  <el-config-provider namespace="ep">
    <BaseHeader/>
    <div style="display: flex">
      <BaseSide />
      <div>
        <!-- <HelloWorld msg="Hello Vue 3.0 + Element Plus + Vite" @changeTags ='changTags'/>  -->
        <RouterView/> 
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.element-plus-logo {
  width: 50%;
}
</style>
