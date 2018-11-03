package com.example.avatarmind.robotmotion;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class SRSAPI {

    private String API_URL = "https://jakeholmes.me:5000/";
    private OkHttpClient client;
    public SRSAPI() {
        this.client = new OkHttpClient();
    }

    public void getAllRservations() {

    }

    private String makeGETRequest(String url) throws IOException {
        Request request = new Request.Builder()
                .url(url)
                .build();

        Response response = client.newCall(request).execute();
        return response.body().string();
    }
}
