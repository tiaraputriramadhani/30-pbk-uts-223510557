<template>
  <q-layout view="lHh LpR fFf" class="grad-bg">
    <q-header class="bg-dark text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab to="/" label="home" />
          <q-route-tab to="/todolist" label="todolist" />
          <q-route-tab to="/post" label="post" />
          <q-route-tab to="/album" label="album" />
        </q-tabs>
      </q-toolbar>
    </q-header>
    
    <q-page-container>
      <router-view />
    </q-page-container>
    
    <q-footer class="bg-dark text-white q-layout-footer" height-hint="98">
      <q-toolbar>
        <q-toolbar-title style="font-size: 14px;">
          tipijuit
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style scoped>
.grad-bg {
  min-height: 100vh; 
  background: linear-gradient(to bottom right, #7c9bbf, #8a7a85); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; }

.q-layout-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.q-layout-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.q-page-container {
  padding-top: 98px; 
  padding-bottom: 98px; 
}

.q-toolbar {
  padding: 0 75px !important;
  font-family: 'Times New Roman', Times, serif;
}

.q-toolbar__title:first-child {
  padding-left: 32px !important;
}

.q-tab {
  padding: 0 20px !important;
  min-height: 75px !important;
}
</style>


<script setup>
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const yOffset = -50; 
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
</script>