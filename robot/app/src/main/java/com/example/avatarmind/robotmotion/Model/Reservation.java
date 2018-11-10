package com.example.avatarmind.robotmotion.Model;

public class Reservation {

    public int id;
    public String start_time;
    public String end_time;
    public float duration;
    public Table table;
    public Customer customer; //only defined in the ger reservation from mob number api

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", start_time='" + start_time + '\'' +
                ", end_time='" + end_time + '\'' +
                ", duration=" + duration +
                ", table=" + table +
                ", customer=" + customer +
                '}';
    }
}
