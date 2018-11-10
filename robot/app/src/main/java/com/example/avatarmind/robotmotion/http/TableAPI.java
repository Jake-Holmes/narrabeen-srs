package com.example.avatarmind.robotmotion.http;

import android.os.Handler;
import android.util.Log;

import com.example.avatarmind.robotmotion.Model.Table;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class TableAPI {
    private static final String TAG = "Table-API";

    private String API_URL = "https://jakeholmes.me:5000/";
    private OkHttpClient client = new OkHttpClient.Builder()
            .build();
    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    Gson g = new Gson();


    public void getAllTables(final ISRSCallback<Table[]> callback) {
        Request request = new Request.Builder()
                .url(API_URL + "/table/all")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                call.cancel();

                e.printStackTrace();
                Log.e(TAG, "Failed to get Tables");
                Log.e(TAG, e.getMessage());

                callback.requestComplete(false, null);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String json = response.body().string();
                Log.d(TAG, json);
                try {
                    Table[] tables = g.fromJson(json, Table[].class);
                    callback.requestComplete(true, tables);
                }
                catch (JsonSyntaxException ex) {
                    Log.e(TAG, "Failed to get Tables");
                    Log.e(TAG, ex.getMessage());
                }
            }
        });
    }
}
