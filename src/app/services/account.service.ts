import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gebruiker } from '../models/gebruiker.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private readonly _tokenKey = 'currentUser';
    public user: BehaviorSubject<Gebruiker>;
    public huidigeGebruiker: Observable<Gebruiker>;
    public redirectUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
        if (parsedToken) {
            const expires =
                new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
            if (expires) {
                localStorage.removeItem(this._tokenKey);
                parsedToken = null;
            }
        }
        if (JSON.parse(localStorage.getItem('loggedUser')) != null) {
            this.user = new BehaviorSubject<Gebruiker>(
                Gebruiker.fromJSON(JSON.parse(localStorage.getItem('loggedUser')))
            );
        } else {
            this.user = new BehaviorSubject<Gebruiker>(
                JSON.parse(localStorage.getItem('loggedUser'))
            );
        }

        this.huidigeGebruiker = this.user.asObservable();
    }

    public login(email: string, password: string): Observable<boolean> {
        return this.http
            .post(
                `${environment.apiUrl}/Gebruiker`,
                { email, password },
                { responseType: 'text' }
            )
            .pipe(
                map((token: any) => {
                    if (token) {
                        const local = JSON.parse(token);
                        localStorage.setItem(this._tokenKey, local.token);
                        var angularGebruiker = Gebruiker.fromJSON(local.user)
                        localStorage.setItem(
                            'loggedUser',
                            JSON.stringify(angularGebruiker)
                        );
                        this.user.next(angularGebruiker);
                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }

    public registreer(voornaam: string, achternaam: string, telefoonNummer: string, email: string, password: string, passwordConfirmation: string, geboorteDatum: Date): Observable<boolean> {
        return this.http
            .post(
                `${environment.apiUrl}/Gebruiker/register`,
                { voornaam, achternaam, telefoonNummer, email, password, passwordConfirmation, geboorteDatum },
                { responseType: 'text' }
            )
            .pipe(
                map((token: any) => {
                    if (token) {
                        const local = JSON.parse(token);
                        localStorage.setItem(this._tokenKey, local.token);
                        var angularGebruiker = Gebruiker.fromJSON(local.user)
                        localStorage.setItem(
                            'loggedUser',
                            JSON.stringify(angularGebruiker)
                        );
                        this.user.next(angularGebruiker);
                        return true;
                    } else {
                        return false;
                    }
                })
            );
    }

    public updateGebruiker(id: string, voornaam: string, achternaam: string, telefoonNummer: string, email: string, geboorteDatum: Date): Observable<Gebruiker> {
        return this.http
            .put(
                `${environment.apiUrl}/Gebruiker/${id}`,
                { id, voornaam, achternaam, telefoonNummer, email, geboorteDatum },
                { responseType: 'text' }
            )
            .pipe(
                catchError(error => {
                    if (error.status == 401) {
                        this.logout();
                        this.router.navigate([`/login`], { state: { errorMessage: 'Uw login token is verstreken: log je opnieuw in!' } })
                    }
                    return of(null);
                }),
                map((gebruiker: any) => {
                    if (gebruiker) {
                        const local = JSON.parse(gebruiker);
                        /*localStorage.setItem(
                            'loggedUser',
                            JSON.stringify(gebruiker)
                        );*/
                        var angualargebruiker = Gebruiker.fromJSON(local)
                        this.user.next(angualargebruiker);
                        return angualargebruiker;
                    }
                })
            );
    }

    get token(): string {
        const localToken = localStorage.getItem(this._tokenKey);
        return !!localToken ? localToken : '';
    }

    public logout(): void {
        if (this.user.getValue()) {
            localStorage.removeItem(this._tokenKey);
            localStorage.removeItem('loggedUser');
            this.user.next(null);
        }
    }

    checkUserNameAvailability = (email: string): Observable<boolean> => {
        return this.http.get<boolean>(
            `${environment.apiUrl}/Gebruiker/checkusername`,
            {
                params: { email }
            }
        );
    };
}

function parseJwt(token) {
    if (!token) {
        return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}
