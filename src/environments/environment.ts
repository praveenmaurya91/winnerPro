// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA-4cZbcGlzYR15Dzt-uaFszVQNtIUypK4",
    authDomain: "winner-pro-dev.firebaseapp.com",
    databaseURL: "https://winner-pro-dev.firebaseio.com",
    projectId: "winner-pro-dev",
    storageBucket: "winner-pro-dev.appspot.com",
    messagingSenderId: "599528636326"
  }
};