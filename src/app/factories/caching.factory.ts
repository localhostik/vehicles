import { CachingRequest } from '../services/cachingRequest.service';
import { XHRBackend, Http, RequestOptions } from '@angular/http';

export function CachingFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new CachingRequest(xhrBackend, requestOptions);
}
