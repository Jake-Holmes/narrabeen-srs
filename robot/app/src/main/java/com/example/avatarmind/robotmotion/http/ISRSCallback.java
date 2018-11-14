package com.example.avatarmind.robotmotion.http;

public interface ISRSCallback<T> {
    void requestComplete(boolean successful, T data);
}
