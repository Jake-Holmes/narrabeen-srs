package com.example.avatarmind.robotmotion.Model;

import java.util.Date;

public class MakeReservation {
//
//    	"duration": "1",
//                "start_time": "2018-11-05T14:05:53.135980+00:00",
//                "end_time": "2018-11-05T15:05:53.135980+00:00",
//                "table_id": "1",
//                "customer_id": "1"

    public static final long HOUR = 3600*1000; // in milli-seconds.

    public int duration;
    public Date start_time;
    public Date end_time;
    public int table_id;
    public int customer_id;


    public MakeReservation() {

    }

    public void generateEndDate() {
        this.end_time = new Date(this.start_time.getTime() + this.duration * HOUR);
    }

}
