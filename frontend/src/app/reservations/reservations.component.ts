import { Component, OnInit } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { forEach } from '@angular/router/src/utils/collection';
import { TableService } from '../table.service';
import { Table, ITable } from '../table';
import { ReservationsService } from "../reservations.service"
import { DateObj, TimeObj, MyTable, Reservations, IReservations, ICustomer } from "../reservation"
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})

export class ReservationsComponent implements OnInit {
  returnedtablelist: Table[] = [];
  returnedreservationslist: Reservations[] = [];
  // timelist: TimeObj[] = [];
  // tablelist: MyTable[] = [];
  datelist: DateObj[] = [];

  currenttablelist: MyTable[] = [];
  currenttimelist: TimeObj[] = [];

  datestring: string;
  mindate: Date;
  maxdate: Date;
  disabletablelist: boolean;
  disabletimelist: boolean;
  disabledbutton: boolean;

  constructor(private service: TableService, private service2: ReservationsService, private router: Router,) {

   }

  async ngOnInit() {
    this.returnedtablelist = await this.service.getAllTables()
    this.returnedreservationslist = await this.service2.getAllReservations();

    console.log(this.returnedreservationslist)
    
    this.mindate = new Date();
    this.maxdate = new Date();
    this.maxdate.setDate(this.mindate.getDate()+14);
    this.disabletablelist = true;
    this.disabletimelist = true;
    this.disabledbutton = true;


    // for (var counter = 9; counter < 22; counter = counter+2)
    // {
    //   var stringval;
    //   if (counter < 10)
    //   {
    //     stringval = "0" + counter + ":00";
    //   }
    //   else
    //   {
    //     stringval = counter + ":00"
    //   }
    //   this.timelist[stringval] = new TimeObj(stringval)
    // }

    // console.log(this.timelist)

    // this.returnedtablelist.forEach(table => {
    //   this.tablelist[table.id] = new MyTable(this.timelist)
    // });

    // console.log(this.tablelist)

    let datetoday = new Date();
    let datetwoweeks = new Date();
    datetwoweeks.setDate(datetoday.getDate()+14);
    console.log(datetoday)
    console.log(datetwoweeks)
    for(let today = datetoday; today<=datetwoweeks; today.setDate(today.getDate()+1))
    {
      let dd = datetoday.getDate();
      let mm = datetoday.getMonth()+1; //January is 0!
      let yyyy = datetoday.getFullYear();
      let datestring = yyyy + '-' + mm + '-' + dd;
      let tablelist: MyTable[] = [];
      
      //start
      this.returnedtablelist.forEach(table => {

        let timelist: TimeObj[] = [];
        for (let counter = 9; counter < 22; counter = counter+2)
        {
          let stringval;
          if (counter < 10)
          {
            stringval = "0" + counter + ":00";
          }
          else
          {
            stringval = counter + ":00"
          }
          timelist[stringval] = new TimeObj(stringval)
        }
        console.log(timelist)

        tablelist[table.id] = new MyTable(timelist)
      });
      console.log(tablelist)
      //end

      this.datelist[datestring] = new DateObj(tablelist);
    }
    console.log(this.datelist)
   
    console.log("HELLO GJKHBSGDFHJKLSDFBJKS");


    //gotta add comparitor for reserved times
    if(this.returnedreservationslist != null){
      this.returnedreservationslist.forEach(reservation =>{
        console.log(reservation)
        let tempstarttime = new Date(reservation.start_time);
        let datestring = tempstarttime.getUTCFullYear() + "-" +  (tempstarttime.getUTCMonth()+1) + "-" + tempstarttime.getUTCDate();
        let timestring;
        if(tempstarttime.getUTCHours() < 10)
        {
          timestring = "0"+tempstarttime.getUTCHours()
        }
        else
        {
          timestring = tempstarttime.getUTCHours()
        }
        if(tempstarttime.getUTCMinutes() < 10)
        {
          timestring = timestring + ":0" + tempstarttime.getUTCMinutes()
        }
        else
        {
          timestring = timestring + ":" + tempstarttime.getUTCMinutes()
        }
        //timestring = tempstarttime.getUTCHours() + ":" + tempstarttime.getUTCMinutes();

        this.datelist[datestring].tablelist[reservation.table["id"]].timelist[timestring].reserved = true;
        console.log(this.datelist[datestring].tablelist[reservation.table["id"]])
        console.log(this.datelist[datestring].tablelist[reservation.table["id"]].timelist[timestring])
      });
    }
  }


  getcurrenttablelist(input: string){
    //input = input.replace(/\//g,"-");
    let tempdate = input.split("/");
    this.datestring = tempdate[2] + "-" + tempdate[0] + "-" + tempdate[1];
    console.log(this.datestring);
    this.currenttablelist = this.datelist[this.datestring];
    console.log(this.datelist[this.datestring]);
    this.disabletablelist = false;
    this.disabletimelist = true;
    this.disabledbutton = true;
    // this.disabledbutton = this.requiredFormControl.hasError('required');
  }

  getcurrenttimelist(input: string){
    console.log(input)
    this.currenttimelist = this.datelist[this.datestring].tablelist[input] //long way so that compiler doesnt complain
    console.log(this.currenttimelist)
    this.disabletimelist = false;
    this.disabledbutton = true;
    // this.disabledbutton = this.requiredFormControl.hasError('required');
  }
  
  enablesubmit(){
    this.disabledbutton = false;
    // this.disabledbutton = this.requiredFormControl.hasError('required');
  }

  async submit(date: string, table: number, time: string, mobNum: string, fname: string, lname: string)
  {
    console.log(mobNum, fname, lname)
    let returnedcustomer = await this.service2.getCustomer(mobNum)
    console.log(returnedcustomer.id)


    let tempdate = date.split("/");
    let datestring = tempdate[2] + "-" + tempdate[0] + "-" + tempdate[1];
    let temptime = time.split(":");
    let timeint = parseInt(temptime[0]);
    timeint = timeint+2;


    let start_time = datestring+"T"+time+":00.000000+00:00"
    let end_time = datestring+"T"+timeint+":00:00.000000+00:00"
    let duration = 2;

    let submitresservation = new IReservations()
    submitresservation.start_time = start_time
    submitresservation.end_time = end_time;
    submitresservation.duration = duration
    submitresservation.table_id = table

    if(returnedcustomer.id != null){
      submitresservation.customer_id = returnedcustomer.id
      //ENABLE TO START MAKING RESERVATIONS
      let returnedreservation = await this.service2.createReservation(mobNum, table, submitresservation) 
      console.log(returnedreservation);
      alert("Reservation made.");
      this.router.navigate(['menu'])
    }
    else
    {
      let newcustomer = new ICustomer()
      newcustomer.phone = mobNum;
      newcustomer.firstname = fname;
      newcustomer.lastname = lname;
      
      let proceed = confirm("New user detected. Would you like to proceed and signup?")
      
      if (proceed)
      {
        if(fname != '' && lname != ''){
          let returnedcustomer = await this.service2.createCustomer(newcustomer);
          document.getElementById("submit").click();
        }
        else
        {
          alert("Please fill in your first name and last name in the customer details section.")
        }
      }
    }
    console.log(date + "||" + table + "||" + time + "||" + start_time + "||" + end_time)
    
  }

}
