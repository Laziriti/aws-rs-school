import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ManageProductsService extends ApiService {
  constructor(injector: Injector) {
    super(injector);
  }

  uploadProductsCSV(file: any): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }
    const url = this.getUrl('import', 'createProduct');

    return  this.http.post(url, file)

  }

  private getPreSignedUrl(fileName: string): Observable<string> {
    const url = this.getUrl('import', 'createProduct');

    return this.http.get<string>(url, {
      params: {
        name: fileName,
      },
    });
  }
}
