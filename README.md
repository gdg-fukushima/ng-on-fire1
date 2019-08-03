<img src="https://firebasestorage.googleapis.com/v0/b/gdg-fukushima.appspot.com/o/logos%2FngOnFire3.png?alt=media&token=cbc3beea-24cb-451f-8bff-2133330ded58">

# NG ON FIRE!!! #1
NG ON FIRE!!!とは、GDG(Google Developer Group) Fukushimaが開催している、AngularとFirebaseを使って、最初のアプリ開発をするためのハンズオンです。
こちらでイベントを見つけることができます。
https://gcpug-fukushima.connpass.com/

このチュートリアルを見る前に、作者がどんなスタンスでAngularとFirebaseを使っているかをこのスライドで確認してみてください。
https://docs.google.com/presentation/d/1PHn5D4Cr78eCzkKvpBBPbyiWoPyz3XoVAaYgL_sLmIE/edit?usp=sharing

# 前提条件
- 基本的にはMacでの操作の解説です
- VSCodeがインストールされていること
https://code.visualstudio.com/

- Node.jsがインストールされていること
**Mac**
https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09
**Windows**
https://qiita.com/Masayuki-M/items/840a997a824e18f576d8

- Firebaseプロジェクトが作成されていること
https://blog.katsubemakito.net/firebase/firebase-make-newproject

# Step1 AngularFireを使って、AngularとFirebaseを接続する
## 1-1. Angularを使えるようにする

### 任意のディレクトリ（フォルダ）を作成する

PC上に作業用の任意のフォルダを作成し、そのフォルダ自体をVSCodeのワークスペースとして開く。
※Macだと、そのフォルダを、Dockのアイコンにドラッグ&ドロップすれば開けます。

### VSCodeのターミナルを立ち上げる
https://qiita.com/luccafort/items/b721d03dfb9630b33d89

### Angular CLIのインストール
立ち上がったVSCode上のターミナルから、以下のコマンドを実行し、Angularを使うためのコマンドツールをインストールします。

```
npm install -g @angular/cli
```

npmは`-g`をつけると、そのプロジェクトだけではなく、全体へのインストールになるので、もう一つ別のものを作るときは、この手順は不要です。

## 1-2. Angularプロジェクトを新規に作成する
ターミナルから、以下のコマンドを実行し、新しいAngularのプロジェクトを作成します。

```
ng new ng-on-fire-chat
```

上記のコマンドを実行すると、質問形式で設定をしていくので、このチュートリアルでは以下のように設定します。

```
? Would you like to add Angular routing? (y/N) y <= 「y」と入力
? Which stylesheet format would you like to use? 
  CSS 
❯ SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]  <= SCSSを選択
  Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax ] 
  Less   [ http://lesscss.org                                             ] 
  Stylus [ http://stylus-lang.com                                         ] 
```
ここまで選択すると、Angularアプリケーションに必要な設定ファイルや構成、最初のテンプレートをAngular CLIがすべてインストールしてくれます。
しばらく待つと、VSCodeの右側のファイルのツリーに`ng-on-fire-chat`と表示されているはずです。

## 1-3. 初期のテンプレートアプリを動かしてみる

```
cd ng-on-fire-chat
ng serve
```
1. 作られたAngularプロジェクトのディレクトリに移動して
2. Angularアプリを起動する
というコマンドです。

ここまで特別変なことをしなければ http://localhost:4200/ に「Welcome to ng-on-fire-chat!」という見出しのあるページが表示されます。
表示されていれば、最初の関門はクリアです。
確認できたら`Ctrl + c`でAngularのアプリを終了させます。

## 1-4. AngularFireのインストール
3の手順が終わった直後であれば、ターミナル上では`ng-on-fire-chat`のディレクトリにいるので、以下の`cd`コマンドは不要です。
一旦VSCodeを終了したりして、ターミナルを再起動したのであれば、`ng-on-fire-chat`に`cd`（移動）してから続けましょう。

```
cd ng-on-fire-chat
npm install firebase @angular/fire --save
```

1. Angularプロジェクトのディレクトリに移動して
2. AangularFireを使えるようにする
というコマンドです。

## 1-5. Firebaseの情報をAngularプロジェクトに設定する
初期状態では、以下のようなファイルが作成されていると思います。
`/src/environments/environment.ts`
```ts
export const environment = {
  production: false
};
```

そのファイルを、以下のように書き換え、Firebaseのコンソールから取得したAPIキーなどのデータを、<>で書いてあるところに入れ替えます。
`/src/environments/environment.ts`
```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```

よく<>を含めたまま置き換えるという間違えを見ることがあるので、<>はちゃんと取って入れましょう。
```
    apiKey: '<xoxoxoxoxoxoxo>', <= 間違
    apiKey: 'xoxoxoxoxoxoxo', <= 正解
```

## 1-6. AngularFire用のモジュールを設定

`/src/app/app.module.ts`
```ts
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire'; // 追加
import { AngularFirestoreModule } from '@angular/fire/firestore'; // 追加
import { AngularFireAuthModule } from '@angular/fire/auth'; // 追加
import { AngularFireStorageModule } from '@angular/fire/storage'; // 追加
import { environment } from '../environments/environment'; // 追加

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // 追加
    AngularFirestoreModule, //  追加
    AngularFireAuthModule, //  追加
    AngularFireStorageModule //  追加
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 1-7. AngularFireモジュールを注入して、DBと接続する
これが噂の依存性注入だ！

`/src/app/app.component.ts`
```ts
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
    db: AngularFirestore // DI
  ) {
    this.messages = db.collection('messages').valueChanges(); // DBと接続
  }
  // ここまで追加
}
```

## 1-8. ビューの設定
`/src/app/app.component.html`
```html
<ul>
  <li class="text" *ngFor="let message of messages | async">
    {{message.body}} / {{message.name}}
  </li>
</ul>
```

ここまで終わったら、ターミナル起動しておく。すでに起動しっぱなしならそのままでOK。
```
ng serve
```


## 1-9. Firebaseコンソールからデータを直接入れてみよう

8まで正確に終わっていれば、もうすでにFirestoreが使えるようになっています。
Firebaseコンソールから、messagesコレクションを作り、ドキュメントを追加してみよう。

さてどうなるでしょうか！

# Step2 Angular Materialで簡単にUIをデザインする

## 2-1. Angular Materialをインストールしてみよう
Angular Materialは、Angularのための便利なUI作成ツールです。
フォームやボタンなどが部品のように用意されているので、それらを組み合わせるだけでアプリケーションのUIを簡単にかっこよく作る事ができます。

一旦VSCodeを終了したりして、ターミナルを再起動したのであれば、`ng-on-fire-chat`に`cd`（移動）してから続けましょう。

```
cd ng-on-fire-chat
npm install --save @angular/material @angular/cdk @angular/animations
npm install --save normalize.css
```

1. Angularプロジェクトのディレクトリに移動して
2. Angular Materialを使えるようにする
3. デフォルトのCSSをキャンセルするためのnormalize.cssをインストール

## 2-2. AngularにAngular Materialの設定をする
Angular Materialのインストールが終わっているので、次はAngularでその部品が使えるように準備をします。
例ではチャットアプリで使用する、ヘッダーのツールバーとフォーム、ボタンなどを読み込んでみます。
アイコンなんかも、用意された汎用的なものを使うことができます。

### モジュールの設定
`/src/app/app.module.ts`
```ts
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
import { MatListModule, MatButtonModule, MatInputModule, MatToolbarModule, MatDividerModule, MatCardModule, MatIconModule } from '@angular/material'; // 追加

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
```

### CSSの設定
`/src/styles.scss`
```scss
@import '~normalize.css';
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```
リセット用のnormalize.cssと、Angular Materialがデフォルトの配色パターンとして用意しているCSSを読み込みます。

### アイコンフォントの読み込み

`/src/index.html`
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NgOnFireChat</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <!-- 追加 -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

</head>
<body>
  <app-root></app-root>
</body>
</html>
```

これでAngular Materialを使用する準備ができました。

## 2-3 Angular Materialの部品を使ってみよう

この例では、ただの文字で表示されていたメッセージの内容を、ヘッダーやカードを使って見栄え良くしてみます。
`/src/app/app.component.html`
```html
<!-- ヘッダーを使う -->
<mat-toolbar color="primary">
  <mat-toolbar-row>
    <span>NG ON FIRE CHAT!!!</span>
  </mat-toolbar-row>
</mat-toolbar>

<div class="content">
  <!-- チャットの内容を表示する枠のテンプレートを使う -->
  <mat-card>
    <mat-card-content>
      <mat-list>
        <ng-container *ngFor="let message of messages | async; let i = index">
          <mat-divider *ngIf="i > 0"></mat-divider>
          <mat-list-item>{{message.body}} / {{message.name}}</mat-list-item>
        </ng-container>
      </mat-list>
    </mat-card-content>
  </mat-card>
</div>

<!-- これはあとで使うから消さないでね！ -->
<router-outlet></router-outlet>
```

`/src/app/app.component.scss`
```scss
.content {
    padding: 20px;
    .comment-input {
        width: 100%;
    }
}
```

これでAngular Materialを使って、かっこいいデザインの部品を簡単に適応することができましたね。

# Step3 Firestoreに入れるデータを画面から使ってみよう
ここからは、Angularのアプリケーションから、実際にFirestoreと接続し、データをリアルタイムにバインドさせて行きましょう。

## 3-1 HTML側の準備

ユーザーがインプットした内容をFirestoreに保存するので、インプットとボタンを追加しておきます。
`/src/app/app.component.html`
```html
<mat-toolbar color="primary">
  <mat-toolbar-row>
    <span>NG ON FIRE CHAT!!!</span>
  </mat-toolbar-row>
</mat-toolbar>

<div class="content">
  <!-- ここから追加 -->
  <mat-card style="margin-bottom: 10px;">
    <mat-card-content>
      <mat-form-field class="comment-input">
        <input matInput placeholder="コメントしてください">
      </mat-form-field>
      <button mat-raised-button color="accent">送信</button>
    </mat-card-content>
  </mat-card>
  <!-- ここまで追加 -->
  <mat-card>
    <mat-card-content>
      <mat-list>
        <ng-container *ngFor="let message of messages | async; let i = index">
          <mat-divider *ngIf="i > 0"></mat-divider>
          <mat-list-item>{{message.body}} / {{message.name}}</mat-list-item>
        </ng-container>
      </mat-list>
    </mat-card-content>
  </mat-card>
</div>

<!-- これはあとで使うから消さないでね！ -->
<router-outlet></router-outlet>
```

## 3-2 ビューのクリックイベントをコンポーネントに伝える
ビューで起こったアクションから、コンポーネントに設定した関数を実行してみましょう。

`/src/app/app.component.html`
```html
<button (click)="sendMessage()" mat-raised-button color="accent">送信</button>
```

ビュー側では`(click)`のように指定することで、ユーザーが行うイベントに対して、コンポーネント側の関数を指定することが簡単にできます。
例ではボタンのクリックに対して、実行する関数を指定しています。

ではコンポーネント側にも、関数を用意してあげましょう。

`/src/app/app.component.ts`
```ts
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
```

## 3-3 データバインド
ここからは少し、Angualrの一番の魅力的な機能である、データバインドの機能をチェックしてみましょう。

### コンポーネント側の設定
コンポーネントにプログラム上から扱うことの出来る変数を用意します。
クラスのメンバ変数として用意します。コンポーネントに入れ物を用意するイメージです。

`/src/app/app.component.ts`
```ts
...

export class AppComponent {
  messages: Observable<any[]>;
  inputMessage = 'リアルタイムデータバインド'; // これを追加

  ...
}
```

例では、`inputMessage`というコンポーネントに属した変数を作りました。
そしてInputフォームとデータをバインド出来るように、設定を進めてみます。

### ビューの設定
試しにヘッダー上の文字と、ブラウザ上に表示されるテキストをバインドさせてみましょう。

`/src/app/app.component.html`
```html
<mat-toolbar color="primary">
  <mat-toolbar-row>
    <!-- ヘッダーにバインドされた文字を表示させてみる {{inputMessage}} -->
    <span>NG ON FIRE CHAT!!! {{inputMessage}}</span> 
  </mat-toolbar-row>
</mat-toolbar>
```

これですでに、コントローラーに設定した文字が、ビュー側に設定されていることがわかります。
さぁ次はいよいよリアルタイムデータバインドです！

## 3-4 リアルタイムデータバインド
3-3で設定したデータバインドを、リアルタイムに変化が見られるように設定してみましょう。

### モジュールの設定
`/src/app/app.module.ts`
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 追加
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // 追加
    BrowserAnimationsModule,
    AppRoutingModule,
...
```

フォームとの連携用のモジュールの読み込みが完了すると、あとはもうビューとコントローラーをバインドをするだけです。

### フォームのデータバインド ngModel
フォームの中身のデータと変数をバインドさせるためには`ngModel`というものを使って、連動させることができます。

`/src/app/app.component.html`
```html
<div class="content">
  <mat-card style="margin-bottom: 10px;">
    <mat-card-content>
      <mat-form-field class="comment-input">
        <!-- [(ngModel)]="inputMessage" -->
        <input [(ngModel)]="inputMessage" matInput placeholder="コメントしてください">
      </mat-form-field>
      <button (click)="sendMessage()" mat-raised-button color="accent">送信</button>
    </mat-card-content>
  </mat-card>
...
```

このように設定するだけで、実際のアプリを見てみると…。
こんなに簡単な手数で、リアルタイムにフォームと連動する機能を実装することができましたね。
いかにAngularが簡単にプログラムできるかということが分かっていただけるかと思います。

# Step4 Firestoreにデータを保存する
次はフォームのデータをFirestoreと連動させるところをやってみましょう。

## 4-1 Firestoreにデータを追加する
ここまでの流れで、ボタンをクリックすると関数を動かすこと、そしてフォームの変数をコンポーネントで扱うことができるようになりました。
そうしたらあとは、実際にそのデータをFirestoreに送るだけです。

始める前に、前のステップで追加した確認用のバインドを削除しておきます。
`/src/app/app.component.html`
```html
<mat-toolbar color="primary">
  <mat-toolbar-row>
    <!-- 確認用のバインドは削除 -->
    <span>NG ON FIRE CHAT!!!</span>
  </mat-toolbar-row>
</mat-toolbar>
```

### 関数から、Firestoreへデータを追加するように設定する
すでに`sendMessage`という関数があるので、ボタンがクリックしたら、その関数の中でデータを登録するように作ります。

`/src/app/app.component.ts`
```ts
...
  constructor(
    // privateを追加
    private db: AngularFirestore
  ) {
    this.messages = db.collection('messages').valueChanges();
    console.log(this.messages);
  }

  sendMessage() {
    this.db.collection('messages').add({
      name: '清水',
      body: this.inputMessage
    });
  }
...
```

まずはこのように設定します。

そしてこれだけです。

インジェクトした`db`という変数に`private`という設定をすると、クラス内のメンバ変数と同じようにアクセスする事ができます。
メンバ変数にコンポーネントからアクセスする場合は、`this`つまりコンポーネント自身を指定してから、その変数を指定しています。

実際にデータを登録するのはこのように記述した部分です。
Firestoreのデータと連動させた際に、`name`と`body`というプロパティを持つデータを作りました。それと同じようなデータを保存するという設定です。

`/src/app/app.component.ts`
```ts
    this.db.collection('messages').add({
      name: '清水',
      body: this.inputMessage
    });
```

指定したコレクションに、追加`add`するだけで、データをFirestore上に保存することができ、更にその結果はリアルタイム連携されたデータに即時反映されることがわかると思います。
ただこの状態では、順番がバラバラになっているので、チャットをしようとしても、どのデータが新しいのかわからないと思います。

## 4-2 データを削除する
次の項目で、新しいものが上に来るようにデータを作っていくのですが、その前にデータを削除する機能を作っておきましょう。
Firebaseコンソールから消すこともできますが、これで何度も0から試すことが出来るようになります。

まずは、messagesコレクションのドキュメントのインデックス=idを取得できるようにしておきましょう。

`/src/app/app.component.ts`
```ts
  constructor(
    private db: AngularFirestore
  ) {
    // idFieldを追加すると、そのドキュメントのインデックスが、指定した名前のプロパティに追加される
    this.messages = db.collection('messages').valueChanges({ idField: 'id' });
  }
```

そうするとidが受け取れるようになるので、ビュー側に削除ボタンを作り、クリックされた時に`deleteMessage`が実行され、その引数にmessage自体を渡すようにします。

`/src/app/app.component.html`
```html
  <mat-list-item>
    {{message.body}} / {{message.name}} <button (click)="deleteMessage(message)" mat-button color="accent">削除</button>
  </mat-list-item>
```


そして`deleteMessage`かの関数をコントローラー側に用意しましょう。
`message`の中には、先程`id`としてそのドキュメントのインデックスを入れるようにしたので、そのドキュメントを取得し、それをdeleteするというプログラムです。

`/src/app/app.component.ts`
```ts
...
  // 削除ボタンが押されたメッセージを削除する
  deleteMessage(message) {
    this.db.collection('messages').doc(message.id).delete();
  }
```

これでメッセージが削除できるようになりましたね。実際にFirestoreコンソールからも削除されていることが確認できます。

## 4-3 投稿された時間通りにソートする

FirestoreのTimestamp型データを使って、Firestoreに時間を記録してみましょう。

`/src/app/app.component.ts`
```ts
  sendMessage() {
    this.db.collection('messages').add({
      name: '清水',
      body: this.inputMessage,
      createdAt: new Date() // ここを追加
    });
  }
```

これだけです。一行追加するだけで、日付を保存することができました。
これだけではまだソートされていないので、クエリを呼び出す際にソートした状態になるようにリクエストをします。

`/src/app/app.component.ts`
```ts
  this.messages = db.collection('messages', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' });
```

これだけでソート項目とソートの順序が指定できました。
実際にためしてみると、ソートどおりにメッセージが流れていることがわかります。

## 4-4 日付をAngular Pipesを使って表現する
追加した日付のデータを、ビューで表現するためには、まずどのようなデータの形でデータが保存されたかを説明します。
Firestoreの日付型のデータは、Firestore独自のデータモデルになっているので、それをJS/TSでわかるようにする必要があります。

### Firestoreの日付型から、JS標準の日付型のデータへ変換する

`/src/app/app.component.html`
```html
  <mat-list-item>
    {{message.body}} / {{message.name}} ({{message.createdAt.toDate()}})
    <button (click)="deleteMessage(message)" mat-button color="accent">削除</button>
  </mat-list-item>
```

`message.createdAt.toDate()`
こうするとTSで扱える日付型になった事がわかりますが、これでも人間が読むときには読みづらいものになっています。

```
 Sat Aug 03 2019 01:06:56 GMT+0900 (Japan Standard Time)
```

この日付型データを、更に読みやすくするためにはどうすればいいでしょうか。
JSを使うなら、年を取得して月を取得してそれぞれほしい形に当てはめて…

Angularではそういった面倒くさい処理を共通化して変換するための`Pipe`という機能があります。
使うのはとても簡単です。

### JS標準の日付型のデータを、人間が読みやすいフォーマットに変換する

`/src/app/app.component.html`
```html
  <mat-list-item>
    {{message.body}} / {{message.name}} ({{message.createdAt.toDate() | date}})
    <button (click)="deleteMessage(message)" mat-button color="accent">削除</button>
  </mat-list-item>
```

先程のHTMLとどこが違うか探すのが大変そうなくらいですね。

正解はこれが
`{{message.createdAt.toDate()}}`
こうなっただけです
`{{message.createdAt.toDate() | date}}`

それだけで以下のように出力されていることがわかります。

```
Sat Aug 03 2019 01:06:56 GMT+0900 (Japan Standard Time)
↓
Aug 3, 2019
```

しかしこれだけではまだ日本人には読みづらいかもしれません。そう言うときにも、任意のフォーマットに変換することが簡単にできます。

```html
{{message.createdAt.toDate() | date: 'yyyy/MM/dd HH:mm:ss'}}
```

フォーマットを適応することで、結果は以下のようになります。
```
Aug 3, 2019
↓
2019/08/03 01:06:56
```

その他のフォーマットの表現は、公式のドキュメントにまとまっています。
https://angular.io/api/common/DatePipe#custom-format-options

### 4-5 ユーザーの名前を指定できるようにする

ここまで来たらあとは自分でやってみましょう。
きっとこれまでのヒントから、すぐに作ることが出来ると思います。

NG ON FIRE!!!は今後もステップアップしていく内容を提供していきますので、GDG Fukushimaをよろしくおねがいします！
