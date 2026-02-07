<script>
export default{
  methods: {
    goToAot() {
      this.$router.push('/about')
    },
  },
}
</script>

<template>
  <h1>HomeView</h1>
    <button @click="goToAbout">Go To About</button>
</template>
