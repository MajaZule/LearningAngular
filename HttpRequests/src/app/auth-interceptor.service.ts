import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('u will get ur request');
        console.log(req.url);
        const modifiedRequest = req.clone({
            headers: req.headers.append('Auth', 'hihiii')
        });
        return next.handle(modifiedRequest);
    }
}