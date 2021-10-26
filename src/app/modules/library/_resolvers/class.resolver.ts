import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassModel } from '../_models/class.model';
import { ClassHTTPService } from '../_services/class/class-http/class-http.service';

@Injectable({
    providedIn: "root"
})
export class ClassResolver implements Resolve<ClassModel> {
    constructor(private classService: ClassHTTPService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ClassModel> {
        return this.classService.getItemById(route.params["id"]);
    }
}