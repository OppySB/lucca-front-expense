import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ITranslationResource {
  prefix: string;
  suffix: string;
  namespace?: string;
}

export class AppTranslateLoader implements TranslateLoader {

    public constructor(
    private readonly http: HttpClient,
    private readonly resources: ITranslationResource[]
    ) {
    }

    public getTranslation(lang: string): Observable<unknown> {
        const requests = this.resources.map(resource => {
            const headers = new HttpHeaders();
            if (resource.namespace) {
                headers.set('namespace', resource.namespace);
            }
            const path = resource.prefix + lang + resource.suffix;
            return this.http.get(path, { headers }).pipe(
                map((response: HttpResponse<unknown>) => ({ response, resource })),
                catchError(res => {
                    console.error('Something went wrong for the following translation file:', path);
                    console.error(res.message);
                    return of({});
                }));
        });
        return forkJoin(requests).pipe(map((responses: { response: HttpResponse<unknown>, resource: ITranslationResource }[]) => {
            return responses.reduce((translations, {
                response,
                resource
            }: { response: HttpResponse<unknown>, resource: ITranslationResource }) =>
                (
                    {
                        ...translations,
                        [resource.namespace && resource.namespace.length > 0 ? resource.namespace.toUpperCase() : 'APP']: response
                    }
                ),
            {}
            );
        }));
    }

}
