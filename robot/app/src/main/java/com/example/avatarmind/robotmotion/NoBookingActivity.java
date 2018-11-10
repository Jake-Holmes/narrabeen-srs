package com.example.avatarmind.robotmotion;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.avatarmind.robotmotion.Model.Customer;
import com.example.avatarmind.robotmotion.http.ReservationAPI;

/** This class just handles the customer when they don't have a booking, which means making a reservation and getting the new table*/


public class NoBookingActivity extends Activity {

    private EditText mPhoneEditText;
    private EditText mFirstNameEditText;
    private EditText mLastNameEditText;

    ReservationAPI reservationAPI = new ReservationAPI();

    private static final String TAG = "NoBooking";

    private Customer loadedCustomer = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getActionBar() != null) {
            getActionBar().hide();
        }

        initView();
        initListener();

        Handler mhandler = new Handler();

        mPhoneEditText = (EditText) findViewById(R.id.phone);
        mFirstNameEditText = (EditText) findViewById(R.id.firstName);
        mLastNameEditText = (EditText) findViewById(R.id.lastName);


        mPhoneEditText.setOnFocusChangeListener((View v, boolean hasFocus) -> {
            if (!hasFocus) {
                mFirstNameEditText.setEnabled(true);
                mLastNameEditText.setEnabled(true);


                //check if this phone number belongs to a customer
                reservationAPI.getCustomerByNumber(mPhoneEditText.getText().toString(), (successful, customer) -> {
                    if (successful) {
                        mhandler.post(() -> {
                            Toast.makeText(this, "Customer found", Toast.LENGTH_SHORT).show();
                            Log.d(TAG, customer.toString());
                            mFirstNameEditText.setText(customer.firstname);
                            mLastNameEditText.setText(customer.lastname);

                            mFirstNameEditText.setEnabled(false);
                            mLastNameEditText.setEnabled(false);

                            loadedCustomer = customer;
                        });
                    }
                    else {
                        mhandler.post(() -> {
                            Toast.makeText(this, "No Customer found", Toast.LENGTH_SHORT).show();
                            Log.d(TAG, "No Customer Found");
                        });
                    }
                });
                Toast.makeText(this, "unfocus", Toast.LENGTH_SHORT).show();
            }

        });
    }

    private void initView() {
        setContentView(R.layout.activity_no_booking);

    }

    private void initListener() {

    }

    public void createReservation(View v) {
        if (loadedCustomer == null) {
            //this is a customer that already exists in the system, just just create reservation with id.
            Toast.makeText(this, "Customer loaded", Toast.LENGTH_SHORT).show();
        }
        else {
            //create customer and create reservation
            Toast.makeText(this, "Customer not loaded", Toast.LENGTH_SHORT).show();
            loadedCustomer = new Customer();
            loadedCustomer.firstname = mFirstNameEditText.getText().toString();
            loadedCustomer.lastname = mLastNameEditText.getText().toString();
            loadedCustomer.phone = mPhoneEditText.getText().toString();

        }
    }
}
