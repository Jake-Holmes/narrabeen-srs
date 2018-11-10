package com.example.avatarmind.robotmotion.Model;

public class Table {

    public int id;
    public int table_number;
    public int seats;
    public String qr_code;
    public String passcode;
    public boolean status;


    @Override
    public String toString() {
        return "Table{" +
                "id=" + id +
                ", table_number=" + table_number +
                ", seats=" + seats +
                ", status=" + status +
                '}';
    }
}
