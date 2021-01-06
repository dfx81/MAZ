package com.bawang.mazadmin;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        start();
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void start() {
        WebView disp = findViewById(R.id.disp);
        WebSettings setting = disp.getSettings();
        setting.setJavaScriptEnabled(true);
        setting.setLoadWithOverviewMode(true);
        setting.setUseWideViewPort(true);
        setting.setDomStorageEnabled(true);
        disp.setWebChromeClient(new WebChromeClient());

        disp.loadUrl("file:///android_asset/index.html");
    }
}
