import { Component, OnInit } from '@angular/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { forEach } from '@angular/router/src/utils/collection';
import { TableService } from '../table.service';
import { Table, ITable } from '../table';
import { ReservationsService } from "../reservations.service"
import { DateObj, TimeObj, MyTable, Reservations, IReservations, ICustomer } from "../reservation"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})

export class ReservationsComponent implements OnInit {
  returnedtablelist: Table[] = [];
  returnedreservationslist: Reservations[] = [];
  timelist: TimeObj[] = [];
  tablelist: MyTable[] = [];
  datelist: DateObj[] = [];

  // currenttablelist: DateObj = new DateObj([]);
  // currenttimelist: MyTable = new MyTable([]);
  currenttablelist: MyTable[];
  currenttimelist: TimeObj[];

  datestring: string;
  mindate: Date;
  maxdate: Date;
  disabletablelist: boolean;
  disabletimelist: boolean;
  disabledbutton: boolean;

  tablevalue: string;
  timevalue: string;

  constructor(private service: TableService, private service2: ReservationsService, private router: Router, private toastr: ToastrService) {

   }

  async ngOnInit() {
    this.returnedtablelist = await this.service.getAllTables()
    this.returnedreservationslist = await this.service2.getAllReservations();
    
    this.mindate = new Date();
    this.maxdate = new Date();
    this.maxdate.setDate(this.mindate.getDate()+14);
    this.disabletablelist = true;
    this.disabletimelist = true;
    this.disabledbutton = true;

    let datetoday = new Date();
    let datetwoweeks = new Date();
    datetwoweeks.setDate(datetoday.getDate()+14);
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

        tablelist[table.id] = new MyTable(timelist)
      });
      //end

      this.datelist[datestring] = new DateObj(tablelist);
    }


    //gotta add comparitor for reserved times
    if(this.returnedreservationslist != null){
      this.returnedreservationslist.forEach(reservation =>{
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
        timestring = timestring + ":00"
        // if(tempstarttime.getUTCMinutes() < 10)
        // {
        //   timestring = timestring + ":0" + tempstarttime.getUTCMinutes()
        // }
        // else
        // {
        //   timestring = timestring + ":" + tempstarttime.getUTCMinutes()
        // }

        //timestring = tempstarttime.getUTCHours() + ":" + tempstarttime.getUTCMinutes();

        if(tempstarttime.getUTCHours() > 8 && tempstarttime.getUTCHours() < 22){
          this.datelist[datestring].tablelist[reservation.table["id"]].timelist[timestring].reserved = true;
        }
        // console.log(this.datelist[datestring].tablelist[reservation.table["id"]].timelist[timestring])
      });
    }
  }


  getcurrenttablelist(input: string){
    let tempdate = input.split("/");
    this.datestring = tempdate[2] + "-" + tempdate[0] + "-" + tempdate[1];
    this.currenttablelist = this.datelist[this.datestring].tablelist;
    this.disabletablelist = false;
    this.disabletimelist = true;
    this.disabledbutton = true;
    this.tablevalue = '';
    this.timevalue = '';
  }

  getcurrenttimelist(input: string){
    this.currenttimelist = this.datelist[this.datestring].tablelist[input].timelist //long way so that compiler doesnt complain
    this.disabletimelist = false;
    this.disabledbutton = true;
    this.timevalue = '';
  }
  
  enablesubmit(){
    this.disabledbutton = false;
  }

  async submit(date: string, table: string, time: string, mobNum: string, fname: string, lname: string)
  {
    let returnedcustomer = await this.service2.getCustomer(mobNum)


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
    submitresservation.table_id = +table

    if(returnedcustomer.id != null){
      submitresservation.customer_id = returnedcustomer.id
      //ENABLE TO START MAKING RESERVATIONS
      let returnedreservation = await this.service2.createReservation(mobNum, +table, submitresservation) 
      //alert("Reservation made.");
      this.toastr.success("Reservation made")
      // this.router.navigate(['reservations'])
      this.tablevalue = '';
      this.timevalue = '';
      this.ngOnInit();
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
          //alert("Please fill in your first name and last name in the customer details section.")
          this.toastr.error("Please fill in your first name and last name in the customer details section.")
        }
      }
    }
  }

}
