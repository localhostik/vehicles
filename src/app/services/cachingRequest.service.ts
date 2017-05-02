import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BaseResponseOptions, ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';

@Injectable()
export class CachingRequest extends Http {
  public static readonly baseResponseOptions: any = new BaseResponseOptions();
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) { super(backend, defaultOptions); }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return new Observable((observer) => {   
      let currentUrl = typeof url === 'string' ? url : url.url;
      let storage = localStorage.getItem(currentUrl);
      let localStorageData = JSON.parse(storage);
      let response;

      if (localStorageData && new Date(localStorageData.updateTime) > new Date()) {       
        response = CachingRequest.newResponse(currentUrl, localStorageData.data);
      }
      else {        
        super.request(url, options).subscribe((value: Response) => {
          response = value;
          try {
            //300000 = 5min; 30000 = 30sec
            localStorage.setItem(value.url, JSON.stringify(
              {
                data: value.json().data,
                updateTime: new Date(new Date().getTime() + (value.url.match(new RegExp(/(?:(location|geo)+)/gi)) ? 300000 : 30000))
              }
            ));
          }
          catch (e) {           
            console.log('Impossible to save: ' + e);
            response = CachingRequest.newResponse(currentUrl, localStorageData.data);
          }
        });
      }
      if (response != undefined) {
        observer.next(response);
        observer.complete();
      }
    });
  }

  private static newResponse(url: string, data: object): Response {
    const responseOptions = new ResponseOptions(CachingRequest.baseResponseOptions);
    return new Response(responseOptions.merge({ url, body: JSON.stringify({ data }) }));
  }
}