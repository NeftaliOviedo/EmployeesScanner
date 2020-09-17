<template>
  <div class="record container">
    <h1 class="title">Record</h1>
    <Record v-bind:punches="punches"/>
  </div>
</template>
<script>
import Record from '../components/Record';
import helper from '../helpers/punches.helper'
export default {
  name:"app",
  components:{
    Record
  },
  data(){
    return{
      punches:[]
    }
  },
  methods:{
    
  },
   beforeMount() { 
   this.punches = helper.getData()
   // let res = this.punches.map(x => Object.keys(x)[0]);
    //console.log(this.punches[res]);
    helper.setHour(this.punches);
    console.log(this.punches)
  }, 
 
}

</script>