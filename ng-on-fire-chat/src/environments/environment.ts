// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>', // 書き換える
    authDomain: '<your-project-authdomain>', // 書き換える
    databaseURL: '<your-database-URL>', // 書き換える
    projectId: '<your-project-id>', // 書き換える
    storageBucket: '<your-storage-bucket>', // 書き換える
    messagingSenderId: '<your-messaging-sender-id>' // 書き換える
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
