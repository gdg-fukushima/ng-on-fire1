import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messages: Observable<any[]>;
  inputMessage = 'リアルタイムデータバインド'; // これを追加

  constructor(
    db: AngularFirestore
  ) {
    this.messages = db.collection('messages').valueChanges();
    console.log(this.messages);
  }

  // この関数を追加
  sendMessage() {
    console.log('動いてるよ!');
  }
}
