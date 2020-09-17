<template>
  <div>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">Employee Name</th>
            <th scope="col">Date</th>
            <th scope="col">Punches</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data,i) in punches" :key="i">
            <td>{{data.name}}</td>
            <td>{{data.date}}</td>
            <td>
                <li style="list-style-type:none" v-for="(type,indx) in data.types" :key="indx">{{type.type}} => {{type.hour}}</li>
            </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name:"List",
    props:["punches"]
  
       
}


</script>

<style>

</style>