package com.example.avatarmind.robotmotion;

import android.app.Activity;
import android.os.Bundle;
import android.robot.motion.RobotMotion;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import org.xguzm.pathfinding.grid.GridCell;
import org.xguzm.pathfinding.grid.NavigationGrid;
import org.xguzm.pathfinding.grid.finders.AStarGridFinder;
import org.xguzm.pathfinding.grid.finders.GridFinderOptions;

import java.util.List;
import java.util.Random;

public class HasBooking extends Activity {

    final int mapWidth = 7, mapHeight = 9;

    final String TAG = "HasBooking";

    NavigationGrid<GridCell> navGrid;

    private RobotMotion mRobotMotion = new RobotMotion();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_has_booking);

        GridCell[][] cells = new GridCell[mapWidth][mapHeight];
        for (int x = 0 ; x < mapWidth; x++){
            for (int y = 0 ; y < mapHeight; y++){
                cells[x][y] = new GridCell(x, y, true);
            }
        }

        //cells[0][0].setWalkable(false); disable access to cell

        for (int i = 0; i <= 5; i++) {
            cells[i][2].setWalkable(false);
        }

        cells[3][4].setWalkable(false);
        cells[3][5].setWalkable(false);

        for (int i = 3; i <= 6; i++) {
            cells[i][6].setWalkable(false);
        }

        //create your cells with whatever data you need
        //cells = createCells();

        //create a navigation grid with the cells you just created
        navGrid = new NavigationGrid<GridCell>(cells);
    }


    public void submitWithInfo(View v) {
        Toast.makeText(this, "Submitting with info", Toast.LENGTH_SHORT).show();
        //get the customer info from the view
        EditText firstNameET = (EditText) findViewById(R.id.editText_first_name);
        EditText lastNameET = (EditText) findViewById(R.id.editText_last_name);
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

    public void cancel(View v) {
        finish();
    }

    public void findPath() {

        //or create your own pathfinder options:
        GridFinderOptions opt = new GridFinderOptions();
        opt.allowDiagonal = false;
        opt.dontCrossCorners = true;
        opt.isYDown = true; //change to false in real testing

        //these should be stored as [x][y]
        AStarGridFinder<GridCell> finder = new AStarGridFinder<GridCell>(GridCell.class, opt);

        List<GridCell> pathToEnd = finder.findPath(5, 8, 3, 0, navGrid);

        Log.d(TAG, "Got path");

        String output;
        StringBuilder str = new StringBuilder();
        for(GridCell cell : pathToEnd) {
            str.append("x: ").append(cell.x).append(", y: ").append(cell.y);
            str.append("\n");
        }
        output = str.toString();

        //output += "\n\nMatrix:\n" + printMatrix(cells);

        Log.d(TAG, output);

        //TextView tv = findViewById(R.id.output);

        //tv.setText(output);

//        mRobotMotion.startWalk(distance, 1, 0);

    }



}
