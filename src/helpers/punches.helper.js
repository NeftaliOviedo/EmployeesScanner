import swal from 'sweetalert'



class PunchesHelper{
    getData(){
        if(localStorage.getItem('punchesdb')) {
          return JSON.parse(localStorage.getItem('punchesdb'));  
        }
    }

    getLastPunch(obj){
        let lastPunch = {}
        for(let i = 0; i < obj.types.length; i++){
            lastPunch = obj.types[i];
        }
        return lastPunch;
    }

    setHour(punches){
        for( let i in punches){
         for( let j in  punches[i].types){
 
           var today = new Date(punches[i].types[j].hour);
           var time = today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes();
           punches[i].types[j].hour = time;
 
         }
       }
     } 

     timeOutBreak(punches){
         var arr = [];
         var time = 0;
         var message;
         var employee;
         var lastPunch;
         this.calculateTimeAgo(punches);
       for( let i in punches){
           for( let j in  punches[i].types){
               //fixind array
               arr = punches[i].types[j].timeAgo.split(', ')
               arr = arr[arr.length - 1].split(' ')
               arr = arr.slice(-2)
               time = parseInt(arr[0]);
               
               //preparing date comparison
               var date = new Date(punches[i].date)
               date = date.getDate()+"/" + (date.getMonth()+1) +"/"+ date.getFullYear()
               var today = new Date();
               today = (today.getDate()-1)+"/" + (today.getMonth()+1) +"/"+ today.getFullYear()

               //finding the employee name
               employee = punches.filter(x => x.name == punches[i].name)

               //finding the employee last punch type

               lastPunch = this.getLastPunch(employee[employee.length -1])

               //setting the message with themployee name
               message =  punches[i].name +  " have to go back to work"
               if(time === 60 && (lastPunch.type == "Break" || lastPunch.type == "Lunch") && date === today){
                swal({
                  title: "Break time is done!",
                  text: message,
                  icon: "warning",
                  })
               }       
             }
        }
     }

     calculateTimeAgo(punches){
        for( let i in punches){
            for( let j in  punches[i].types){

                var date = new Date(punches[i].types[j].hour);
                

                // setting values to milisegundos
                var msecPerMinute = 1000 * 60;
                var msecPerHour = msecPerMinute * 60;
                var msecPerDay = msecPerHour * 24;

                // set date to milisegundos
                var dateMsec = date.getTime();

                // setting date to january 1frs at midnight
                date.setMonth(0);
                date.setDate(1);
                date.setHours(0, 0, 0, 0);

                // substract miliseconds
                var now = new Date();
                var interval = now.getTime() - dateMsec;

                // Calculating how many day has the interval. Substract days
                var days = Math.floor(interval / msecPerDay );
                interval = interval - (days * msecPerDay );

                // hours , mins y secs
                var hours = Math.floor(interval / msecPerHour );
                interval = interval - (hours * msecPerHour );

                var minutes = Math.floor(interval / msecPerMinute );
                interval = interval - (minutes * msecPerMinute );


               
                punches[i].types[j].timeAgo =(days > 0 ? days + " days,": "" )+ " "+ (hours > 0 ? hours + " hours,": "" )+ " " + minutes + " minutes" ;

               
                
            }
        }
    }
     

}
export default new PunchesHelper();