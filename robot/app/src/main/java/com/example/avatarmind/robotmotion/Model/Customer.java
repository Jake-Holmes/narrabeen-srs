package com.example.avatarmind.robotmotion.Model;

public class Customer {
    public int id;
    public String phone;
    public String firstname;
    public String lastname;
    public Reservation[] reservations;
    public boolean status;


    @Override
    public String toString() {
        return "Customer{" +
                "id='" + id + '\'' +
                ", phone='" + phone + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", status=" + status +
                '}';
    }
}
