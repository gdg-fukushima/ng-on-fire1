import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messages: Observable<any[]>;
  inputMessage = 'リアルタイムデータバインド';
  logedIn = true;
  email: string;
  password: string;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    // idFieldを追加すると、そのドキュメントのインデックスが、指定した名前のプロパティに追加される
    // コレクションを取得する際に、ref => ref.orderBy('createdAt', 'desc')とオーダーと昇降を指定する
    this.messages = db.collection('messages', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' });
    console.log(this.messages);
  }

  sendMessage() {
    this.db.collection('messages').add({
      name: '清水',
      body: this.inputMessage,
      createdAt: new Date() // ここを追加
    });
  }

  deleteMessage(message) {
    this.db.collection('messages').doc(message.id).delete();
  }

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password).then(res => {
      alert('ログイン成功しました。');
      this.logedIn = true;
    }).catch(res => {
      alert('ログインできません。');
    });
  }
}
