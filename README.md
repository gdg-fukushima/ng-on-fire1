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
import { MatButtonModule, MatInputModule, MatToolbarModule, MatDividerModule, MatCardModule, MatIconModule } from '@angular/material'; // 追加

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
    MatIconModule // 追加
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
