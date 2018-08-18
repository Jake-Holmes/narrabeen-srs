package srs.example.com.srsrobot;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.util.Random;

public class HasBooking extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_has_booking);
    }


    public void submitWithInfo(View v) {
        Toast.makeText(this, "Submitting with info", Toast.LENGTH_SHORT).show();
        //get the customer info from the view
        EditText firstNameET = findViewById(R.id.editText_first_name);
        EditText lastNameET = findViewById(R.id.editText_last_name);
        String firstName = firstNameET.getText().toString();
        String lastName = lastNameET.getText().toString();
        Toast.makeText(this, "First name: " + firstName + ", last name: " + lastName, Toast.LENGTH_LONG).show();
        //submit to the server
        Random rand = new Random();
        int n = rand.nextInt(100);
        if (n < 50) {
            //pretend it was a successful booking
            Toast.makeText(this, "You have a booking", Toast.LENGTH_LONG).show();
//            Intent intent = new Intent();
//            intent.setClass(this, HasBooking.class);
//            startActivity(intent);
        }
        else {
            //pretend it wasn't a successful booking
            Toast.makeText(this, "You don't have a booking", Toast.LENGTH_LONG).show();

        }
    }

    

}
