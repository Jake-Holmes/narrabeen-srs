package com.example.avatarmind.robotmotion;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

/** This class just handles the customer when they don't have a booking, which means making a reservation and getting the new table*/


public class NoBookingActivity extends Activity{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getActionBar() != null) {
            getActionBar().hide();
        }

        initView();
        initListener();

    }

    private void initView() {
        setContentView(R.layout.activity_no_booking);

    }

    private void initListener() {

    }

    public void createReservation(View v) {

    }
}
