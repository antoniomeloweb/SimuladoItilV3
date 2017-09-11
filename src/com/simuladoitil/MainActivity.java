package com.simuladoitil;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class MainActivity extends ActionBarActivity {

	WebView w;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		//Full screen
		requestWindowFeature(Window.FEATURE_NO_TITLE); 
		this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		
		w = (WebView) findViewById(R.id.webView1);
		w.getSettings().setDomStorageEnabled(true);
		w.getSettings().setJavaScriptEnabled(true);
		w.setWebChromeClient(new WebChromeClient());
		w.setHapticFeedbackEnabled(false);
		
		if (savedInstanceState == null){
			w.loadUrl("file:///android_asset/simulado/index.html");
		}
	}

	@Override
	protected void onSaveInstanceState(Bundle outState )
	{
	super.onSaveInstanceState(outState);
		w.saveState(outState);
	}

	@Override
	protected void onRestoreInstanceState(Bundle savedInstanceState)
	{
	super.onRestoreInstanceState(savedInstanceState);
		w.restoreState(savedInstanceState);
	}	
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
}
