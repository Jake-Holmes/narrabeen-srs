package com.example.avatarmind.robotmotion;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.robot.motion.RobotMotion;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

public class SRSMainActivity extends Activity implements View.OnClickListener {

    private ImageView mTitleBack;

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
        setContentView(R.layout.activity_srs_main);
        mTitleBack = (ImageView) findViewById(R.id.common_title_back);
    }

    private void initListener() {
        mTitleBack.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.common_title_back:
                finish();
                break;
            default:
                break;
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
