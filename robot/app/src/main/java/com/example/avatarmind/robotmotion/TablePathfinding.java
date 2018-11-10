package com.example.avatarmind.robotmotion;

import android.robot.motion.RobotMotion;
import android.util.Log;

import org.xguzm.pathfinding.grid.GridCell;
import org.xguzm.pathfinding.grid.NavigationGrid;
import org.xguzm.pathfinding.grid.finders.AStarGridFinder;
import org.xguzm.pathfinding.grid.finders.GridFinderOptions;

import java.util.List;

import static android.content.ContentValues.TAG;

public class TablePathfinding {
    private static int currentX = 2;
    private static int currentY = 8;

    NavigationGrid<GridCell> navGrid;

    private RobotMotion mRobotMotion = new RobotMotion();
    final int mapWidth = 7, mapHeight = 9;

    public TablePathfinding() {
        GridCell[][] cells = new GridCell[mapWidth][mapHeight];
        for (int x = 0 ; x < mapWidth; x++){
            for (int y = 0 ; y < mapHeight; y++){
                cells[x][y] = new GridCell(x, y, true);
                cells[x][y].setWalkable(true);
            }
        }
    }


    public void findPath() {
        //or create your own pathfinder options:
        GridFinderOptions opt = new GridFinderOptions();
        opt.allowDiagonal = false;
        opt.dontCrossCorners = true;
        opt.isYDown = true; //change to false in real testing

        //these should be stored as [x][y]
        AStarGridFinder<GridCell> finder = new AStarGridFinder<GridCell>(GridCell.class, opt);

        List<GridCell> pathToEnd = finder.findPath(currentX, currentY, 4, 3, navGrid);

        Log.d(TAG, "Got path");

        String output;
        StringBuilder str = new StringBuilder();
        for (GridCell cell : pathToEnd) {
            str.append("x: ").append(cell.x).append(", y: ").append(cell.y);
            str.append("\n");
        }
        output = str.toString();

        //output += "\n\nMatrix:\n" + printMatrix(cells);
        Log.d(TAG, output);

        //TextView tv = findViewById(R.id.output);

        //tv.setText(output);

        Runnable runnable = () -> {
            try {
//                mRobotMotion.startWalk(510, 3, 0);
//                Thread.sleep(5600);
//                mRobotMotion.turn(180, 2);
                double currentHeading = 0.0f;
                for (int i = 0; i < pathToEnd.size(); i++) {
                    GridCell currentCell = pathToEnd.get(i);
                    GridCell nextCell;
                    if ((i + 1) == pathToEnd.size()) {
                        //nextCell = pathToEnd.get(i);
                        continue;
                    }
                    else {
                        nextCell = pathToEnd.get(i + 1);
                    }

                    //double turnDegrees = get_new_direction_in_degrees(currentCell, nextCell);
                    //double turnDegrees = logicalGetDirection(currentCell, nextCell); //absolute degrees from 0
                    //double turnAngle = Math.abs(turnDegrees - currentHeading);

                    double turnDegrees = logicalGetDirection(currentCell, nextCell); //absolute degrees from 0
                    double turnAngle = turnDegrees - currentHeading;
                    turnAngle += turnAngle < 0 ? 360 : 0; //normalise negative angle;

                    if (turnDegrees != currentHeading) {
                        Log.d(TAG, "turning angle: " + turnAngle);
                        mRobotMotion.turn((int)turnAngle, 2);
                        Thread.sleep(5000);
                        currentHeading = turnDegrees;
                    }

                    Log.d(TAG, "Moving Forward from " + currentCell + " to " + nextCell);
                    mRobotMotion.startWalk(510, 3, 0);
                    Thread.sleep(5000);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        };
        Thread t = new Thread(runnable);
        t.start();
    }

    private double logicalGetDirection(GridCell cell1, GridCell cell2) {
        //add angles for diagonals
        if (cell2.x == cell1.x && cell2.y < cell1.y) {
            //direction is forward
            return 0.0f;
        }
        else if (cell2.x > cell1.x && cell2.y < cell1.y) {
            return 45.0f;
        }
        else if (cell2.x > cell1.x && cell2.y == cell1.y) {
            return 90.0f;
        }
        else if (cell2.x > cell1.x && cell2.y < cell1.y) {
            return 135.0f;
        }
        else if (cell2.x == cell1.x && cell2.y > cell1.y) {
            return 180.0f;
        }
        else if (cell2.x < cell1.x && cell2.y < cell1.y) {
            return 225.0f;
        }
        else if (cell2.x < cell1.x && cell2.y == cell1.y) {
            return 270.0f;
        }
        else if (cell2.x < cell1.x && cell2.y < cell1.y) {
            return 315.0f;
        }
        return 0.0f;
    }



    public static int getCurrentX() {
        return currentX;
    }

    public static int getCurrentY() {
        return currentY;
    }

}
