package com.example.avatarmind.robotmotion;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.avatarmind.robotmotion.Model.Reservation;
import com.example.avatarmind.robotmotion.http.ReservationAPI;

public class HasValidBooking extends Activity {

    ReservationAPI reservationAPI = new ReservationAPI();
    Reservation reservation;
    private Handler mHandler;

    TextView lastName;
    TextView firstName;
    TextView table;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_has_valid_booking);

        //this class will tell the user that they have a vaild booking and will have a button that will launch the table usher activiy to start the ushering.
        Intent intent = getIntent();
        String id = intent.getStringExtra("reservation_id");

        lastName = (TextView) findViewById(R.id.LNameEntered);
        firstName = (TextView) findViewById(R.id.FNameEntered);
        table = (TextView) findViewById(R.id.TableIDLabel);

        mHandler = new Handler(Looper.getMainLooper());

        reservationAPI.getReservationByID(id, (successful, APIreservation) -> {
            reservation = APIreservation;

            mHandler.post(() -> {
                lastName.setText(reservation.customer.lastname);
                firstName.setText(reservation.customer.firstname);
                table.setText(reservation.table.id);
            });
        });
    }

    public void startUshering(View v) {

    }
}
