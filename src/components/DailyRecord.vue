<template>
  <div>
    <div class="card-columns">
        <div v-for="(data,i) in punches" :key="i" class="card" >
            <div class="card-body">
                <h5 class="card-title">{{data.name}} -> {{data.date}}</h5>
                <p style="display: inline-block; margin:5px" v-for="(type,j) in data.types" :key="j" class="card-text">{{type.type}} - {{type.hour}} <br> {{type.timeAgo}}</p>
            </div>
        </div>
  </div>
</div>
</template>

<script>
export default {
    name:"List",
    props:{
        punches:Array
    },
    data(){
        return{
            arr:[]
        }
    },
    mounted(){
        this.arr = this.punches

    },
  

}
</script>

<style>

</style>