import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 追加
import { MatButtonModule, MatInputModule, MatToolbarModule,
  MatDividerModule, MatCardModule, MatIconModule, MatListModule } from '@angular/material'; // 追加

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // 追加
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatButtonModule, // 追加
    MatInputModule, // 追加
    MatToolbarModule, // 追加
    MatDividerModule, // 追加
    MatCardModule, // 追加
    MatIconModule, // 追加
    MatListModule // 追加
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
