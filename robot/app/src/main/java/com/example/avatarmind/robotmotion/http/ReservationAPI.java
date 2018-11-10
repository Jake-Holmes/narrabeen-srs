package com.example.avatarmind.robotmotion.http;

import android.os.Handler;
import android.util.Log;

import com.example.avatarmind.robotmotion.Model.Reservation;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import java.io.IOException;


import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class ReservationAPI {

    private static final String TAG = "Reservation-API";

    private String API_URL = "https://jakeholmes.me:5000";
    private OkHttpClient client = new OkHttpClient.Builder()
            .build();
    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    Gson g = new Gson();

    public void getAllReservations(final ISRSCallback<Reservation[]> callback) {
        Request request = new Request.Builder()
                .url(API_URL + "/reservations/all")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                call.cancel();

                e.printStackTrace();
                Log.e(TAG, "Failed to get Reservation");
                Log.e(TAG, e.getMessage());

                callback.requestComplete(false, null);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String json = response.body().string();
//                Log.d(TAG, json);
                try {
                    Reservation[] reservations = g.fromJson(json, Reservation[].class);
                    callback.requestComplete(true, reservations);
                }
                catch (JsonSyntaxException ex) {
                    Log.e(TAG, "Failed to get Reservation");
                    Log.e(TAG, ex.getMessage());
                }
            }
        });
    }

    public void getReservationByID(int id, final ISRSCallback<Reservation> callback) {
        Request request = new Request.Builder()
                .url(API_URL + "/reservations?id=" + id)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                call.cancel();

                e.printStackTrace();
                Log.e(TAG, "Failed to get Reservation");
                Log.e(TAG, e.getMessage());

                callback.requestComplete(false, null);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String json = response.body().string();
//                Log.d(TAG, json);
                try {
                    Reservation reservation = g.fromJson(json, Reservation.class);
//                    Reservation[] reservation = g.fromJson(json, Reservation[].class);
//                    callback.requestComplete(true, reservation[0]);
                    callback.requestComplete(true, reservation);
                }
                catch (JsonSyntaxException ex) {
                    Log.e(TAG, "Failed to get Reservation");
                    Log.e(TAG, ex.getMessage());
                }
            }
        });
    }

    public void getReservationsByNumber(String number, final ISRSCallback<Reservation[]> callback) {
        Request request = new Request.Builder()
                .url(API_URL + "/customer/reservation?mobNum=" + number)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                call.cancel();

                e.printStackTrace();
                Log.e(TAG, "Failed to get Reservation");
                Log.e(TAG, e.getMessage());

                callback.requestComplete(false, null);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String json = response.body().string();
//                Log.d(TAG, json);
                try {
                    Reservation[] reservation = g.fromJson(json, Reservation[].class); //change to
                    callback.requestComplete(true, reservation);
                }
                catch (JsonSyntaxException ex) {
                    Log.e(TAG, "Failed to get Reservation");
                    Log.e(TAG, ex.getMessage());
                }
            }
        });
    }


}
