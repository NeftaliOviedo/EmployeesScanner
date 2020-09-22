<template>
  <div class="home">
    <h1 class="title">Register Punch</h1>
    <form @submit.prevent="addPunch">
      <div class="form-row">
        <div class="col-4">
          <label for="exampleInputEmail1">Employee Name</label>
          <input type="text" class="form-control" @keyup="validateType"  v-bind:class="{'is-invalid' : errors.name}" v-model="dataPunch.name" id="exampleInputEmail1">
            <span class="text-danger" v-if="errors.name">The Name field is required</span>
        </div>
        <div class="col-4">
          <label for="exampleInputPassword1">Entry Date</label>
          <input type="date" :disabled="disableDate"  v-bind:class="{'is-invalid' : errors.date}" v-model="dataPunch.date" class="form-control" >
            <span class="text-danger" v-if="errors.date">Date field is required</span>

        </div>
      </div>
      <div class="form-row">
            <div class="form-check form-check-inline">
                <input class="form-check-input" :disabled="disableEntry" type="radio" v-model="dataPunch.type" name="inlineRadioOptions" id="inlineRadio1" value="Entry">
                <label class="form-check-label" for="inlineRadio1">Entry</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :disabled="!disableEntry" v-model="dataPunch.type" name="inlineRadioOptions" id="inlineRadio2" value="Break">
                <label class="form-check-label" for="inlineRadio2">Break</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :disabled="!disableEntry" v-model="dataPunch.type" name="inlineRadioOptions" id="inlineRadio3" value="Lunch">
                <label class="form-check-label" for="inlineRadio3">Lunch</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" :disabled="!disableEntry" v-model="dataPunch.type" name="inlineRadioOptions" id="inlineRadio4" value="Exit">
                <label class="form-check-label" for="inlineRadio4">Exit</label>
            </div>
            <br>
            <span class="text-danger" v-if="errors.type">Type selection is required</span>
      </div>
        <div class="form-row">
        <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
  </div>
</template>

<script>
import helper from '../helpers/punches.helper'

export default {
  name: 'Home',
  components: {
  },
  props:{
      punchesFromLocal:Array
  },
  data(){
    return{
      errors:{},
      disableDate:false,
      disableEntry:false,
      db:[],
      employee:{
          name:null,
          date:null,
          types:[]
      },
      dataPunch:{
        name:null,
        date:null,
        type:null,
        hour:null
      }
    }
  },
  methods: {
    addPunch() {

        this.dataPunch.hour = new Date();

             let lastVisit = this.employee[this.employee.length - 1];
             if(!lastVisit){
                 lastVisit ={};
             }

         if(this.validateForm()){
             if(this.validateType() ){
                if(lastVisit.types[lastVisit.types.length - 1].type == "Exit"){
                    this.saveNwePunch();
                }else{
                    this.updatePunch();
                }
             }else{
                 this.saveNwePunch();
             }
            this.dataPunch = {};
         } 
         

        console.log(this.db);
        localStorage.setItem('punchesdb', JSON.stringify(this.db));
    },
    saveNwePunch() {
        if(!this.db) this.db = [];
        this.db.push({name: this.dataPunch.name, date:this.dataPunch.date, breaks:2, lunch: 1, types: [{type: this.dataPunch.type, hour: this.dataPunch.hour, timeAgo:""}]})
    },
    restrictions(){
        let lastVisit = this.employee[this.employee.length - 1];
        if(lastVisit.breaks == 0){
            return true;
            
        }else if(lastVisit.lunch == 0){
            return false;
        }
    },
    updatePunch(){

        if(this.dataPunch.type == "Break"){
            if(this.restrictions()) {
                alert('Ya no le quedan Breaks disponibles')
                return;
            }
            this.employee[this.employee.length - 1].breaks-=1;
            console.log(this.employee[this.employee.length - 1].breaks)

        }else if(this.dataPunch.type == "Lunch"){

            if(this.restrictions()  == false) {
                alert('Ya no le quedan Lunch disponibles')
                return;
            }
            this.employee[this.employee.length - 1].lunch-=1;
            console.log(this.employee[this.employee.length - 1].lunch)

        }

        this.employee[this.employee.length - 1].types.push({type:this.dataPunch.type,hour:this.dataPunch.hour});

    },
    validateForm() {
       this.errors = {};

        if (this.dataPunch.name && this.dataPunch.date && this.dataPunch.type ) {
            return true;
        }else{
            if (!this.dataPunch.name) this.errors.name = '.';
            if (!this.dataPunch.type) this.errors.type = '.';
            if (!this.dataPunch.date) this.errors.date = '.';
            return false;
        }
    },
    validateType(){

        let punchesFromLocal = this.punchesFromLocal;
        if(!punchesFromLocal)  punchesFromLocal = [];
        
        if(punchesFromLocal.length != 0){
            let employeeToEdit = this.punchesFromLocal.filter(obj => obj.name == this.dataPunch.name);
            this.employee = employeeToEdit;

            if(this.employee.length != 0){
                console.log('Objeto encontrado');
                this.dataPunch.date = this.employee[this.employee.length - 1].date
                let lastPunch = helper.getLastPunch(this.employee[this.employee.length - 1]);
                this.punchTypeManager(lastPunch)
                return true
            }else{
                //this.dataPunch.date = ""
                console.log('Objeto no existe')
                this.disableEntry = false;
                this.disableDate = false;
                return false;
            }
        }
    },
    punchTypeManager(lastPunch){
        this.disableDate = true;
        switch(lastPunch.type){
                    case "Entry":
                        this.disableEntry = true;
                    break;
                    case "Exit":
                        this.disableEntry = false;
                        this.disableDate = false;
                    break;
                    default:
                        this.disableEntry = false;
                                    
                }
    },
  

  },
    mounted(){
        if(this.db.length == 0 ){
            this.db = this.punchesFromLocal;
        }

        
        console.log(this.db)
    }
}


</script>


<style>
.title{
  margin-top:20px;
  margin-bottom:40px;
}
</style>