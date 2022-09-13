import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            'x-rapidapi-key': 'd449ba0edcmshc9695be0dee53f8p14ca46jsnaec30c9c285d',
            'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
        });
        const params = {
            key: '4bd565ec669f45c1ab12ab3fe64cf909',
        }

        const clone = req.clone({
            headers,
            setParams: params
        });

        return next.handle(clone);
    }
}