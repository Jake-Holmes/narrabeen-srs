package com.example.avatarmind.robotmotion;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

public class SRSMainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_srs_main);
        if (getActionBar() != null) {
            getActionBar().hide();
        }
    }

    public void has_booking(View v) {
//        Toast.makeText(this, "Nice you have a booking", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent();
        intent.setClass(this, HasBooking.class);
        startActivity(intent);
    }

    public void no_booking(View v) {
        Intent intent = new Intent();
        intent.setClass(this, NoBookingActivity.class);
        startActivity(intent);
    }

}
