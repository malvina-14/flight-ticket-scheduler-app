import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

import { environment } from "../environments/environment";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";

import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    importProvidersFrom(
      BrowserAnimationsModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(()=> getAuth()),

      provideFirestore(()=> getFirestore()),
      provideStorage(()=> getStorage())
    )

  ]
};
