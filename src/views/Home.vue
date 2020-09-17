<template>
  <div class="home container">
    <Form v-bind:punchesFromLocal="punches"/>
  </div>
</template>

<script>
import Form from '../components/Form'
import helper from '../helpers/punches.helper'

export default {
  name: 'Home',
  components: {
    Form
  },
  data(){
    return{
      punches:[],
    }
  },
   beforeMount() { 
       this.punches = helper.getData()
        helper.timeOutBreak(this.punches)


  }
}



</script>


<style>
.title{
  margin-top:20px;
  margin-bottom:40px;
}
</style>