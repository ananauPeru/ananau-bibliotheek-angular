import { Injectable, OnDestroy } from "@angular/core";
import { Observable, BehaviorSubject, of, Subscription } from "rxjs";
import { map, catchError, switchMap, finalize } from "rxjs/operators";
import { UserModel } from "../_models/user.model";
import { AuthModel } from "../_models/auth.model";
import { AuthHTTPService } from "./auth-http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { RegisterDTO } from "../_dto/register-dto";

@Injectable({
  providedIn: "root",
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(email: string, password: string): Observable<UserModel> {
    // console.log('LOGGING IN')
    this.isLoadingSubject.next(true);
    let user: UserModel = new UserModel();
    return this.authHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        // console.log(auth)
        const result = this.setAuthFromLocalStorage(auth);
        user.setUser(auth.user);
        // console.log(user)
        return result;
      }),
      switchMap(() => this.getUserByToken(user)),
      catchError((err) => {
        // console.error('err', err)
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );

    // return this.http
    //   .post(
    //     `${environment.apiUrl}/user`,
    //     { email, password },
    //     { responseType: 'text' },
    //   )
    //   .pipe(
    //     map((token: any) => {
    //       if (token) {
    //         const local = JSON.parse(token)
    //         localStorage.setItem(this._tokenKey, local.token)
    //         console.log(local.user)
    //         var angularGebruiker = Gebruiker.fromJSON(local.user)
    //         console.log('Logged in!')
    //         console.log(angularGebruiker)
    //         localStorage.setItem('loggedUser', JSON.stringify(angularGebruiker))
    //         this.user.next(angularGebruiker)
    //         return true
    //       } else {
    //         return false
    //       }
    //     }),
    //   )
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(["/auth/login"], {
      queryParams: {},
    });
  }

  getUserByToken(user?: UserModel): Observable<UserModel> {
    const auth = this.getAuthFromLocalStorage();
    // console.log(auth)
    if (!auth || !auth.token) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);

    if (user)
      return (this.currentUserSubject = new BehaviorSubject<UserModel>(user));

    return this.authHttpService.getUserByToken(auth).pipe(
      map((user: UserModel) => {
        if (user) {
          // console.log(user)
          let u: UserModel = new UserModel();
          u.setUser(user);
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: RegisterDTO): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        // console.error('err', err)
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string) {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.token) {
      // console.log(auth)
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  public getAuthFromLocalStorage(): AuthModel {
    try {
      // console.log(localStorage)
      // console.log(this.authLocalStorageToken)
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      // console.log(authData)
      return authData;
    } catch (error) {
      // console.error(error)
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public setRolesToLocalStorage(roles: string[]) {
    let authData = this.getAuthFromLocalStorage();
    authData.roles = roles;
    this.setAuthFromLocalStorage(authData);
  }
}
