<template>
  <div class="container">
      <h1 class="title " >Daily Record</h1>
      <DailyRecord :punches="punches" />
  </div>
</template>

<script>
import DailyRecord from '../components/DailyRecord'
import helper from '../helpers/punches.helper'
export default {
    components:{
        DailyRecord
    },
    data(){
        return{
            punches:[]
        }
    },
    methods:{
        
    },
    beforeMount(){
        this.punches = helper.getData()

        helper.calculateTimeAgo(this.punches);
        helper.setHour(this.punches);

    }
}
</script>

<style>

</style>