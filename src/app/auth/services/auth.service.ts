import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {map, Observable} from 'rxjs';
import {Router} from "@angular/router";
import {User} from "../../pages/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: {} = {}

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {
  }

  async signUp(email: string, password: string, isAdmin: boolean = false) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return await this.firestore.collection('users').doc(userCredential.user?.uid).set({
      email: email,
      role: isAdmin ? 'admin' : 'user'
    });
  }

  async login(email: string, password: string) {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password);
      const snapshot = await this.firestore.collection("users").ref.where("email", "==", email).get();

      snapshot.forEach(userRef => {
        this.user = userRef.data() as User;
        this.user = {...this.user, id: res?.user?.uid};
        console.log(this.user);
        debugger
        localStorage.setItem('user', JSON.stringify(this.user));
      });

      debugger
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  getUser(): User | any {
    return JSON.parse(localStorage.getItem('user') as string)
  }
}
