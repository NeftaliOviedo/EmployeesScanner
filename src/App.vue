<template>
  <div id="nav">
   <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <a class="navbar-brand">Permits</a>
     
        <ul class="nav">
          <li class="nav-item text-muted">
            <router-link class="nav-link reset-text" to="/">Home</router-link>
          </li>
          <li class="nav-item text-muted">
            <router-link class="nav-link reset-text" to="/record">Record</router-link>
          </li>
            <li class="nav-item text-muted">
            <router-link class="nav-link reset-text" to="/daily">Daily Record</router-link>
          </li>
        </ul>
    </nav>
    <router-view/>
  </div>
</template>



<script>


</script>
<style>

</style>
