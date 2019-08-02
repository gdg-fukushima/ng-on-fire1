import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'; // 追加
import { Observable } from 'rxjs'; // 追加


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-on-fire-chat';
  // ここから
  messages: Observable<any[]>;
  constructor(
    db: AngularFirestore
  ) {
    this.messages = db.collection('messages').valueChanges();
    console.log(this.messages);
  }
  // ここまで追加
}
