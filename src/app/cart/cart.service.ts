import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import axios from 'axios';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  /** Key - item id, value - ordered amount */
  #cartSource = new BehaviorSubject<Record<string, number>>({});
  isItemsSeted = false;
  cart$ = this.#cartSource.asObservable();
  totalInCart$: Observable<number> = this.cart$.pipe(
    map((cart) => {
      const values = Object.values(cart);

      if (!values.length) {
        return 0;
      }

      return values.reduce((acc, val) => acc + val, 0);
    }),
    shareReplay({
      refCount: true,
      bufferSize: 1,
    })
  );

  constructor() { }

  setItems(): void {
    if (!this.isItemsSeted) {
      axios.get(
        `${environment.apiEndpoints.cart}/profile/cart`,
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem('authorization_token')}`
          }
        }
      ).then(({ data: { data: { cart } } }) => {
        const results: any = {};
        cart.items.forEach((element: any) => {
          results[element.product.id] = element.count;
          // this.addItem(element.product.id)
        });
        console.log(results)
        this.#cartSource.next(results);
        this.#cartSource.next(results);
      });
      this.isItemsSeted = true;
    }
  }

  addItem(id: string): void {
    this.updateCount(id, 1);
  }

  removeItem(id: string): void {
    this.updateCount(id, -1);
  }

  empty(): void {
    this.#cartSource.next({});
  }

  private async updateCount(id: string, type: 1 | -1) {
    const val = this.#cartSource.getValue();
    const items = {
      ...val,
    };

    if (!(id in items)) {
      items[id] = 0;
    }

    if (type === 1) {
      console.log(items)
      const resultItems: any = [];
      Object.keys(items).forEach(element => {
        if (element !== 'items' && element !== 'id') {
          resultItems.push({
            product: {
              id: element,
              title: 'string',
              description: 'string',
              price: 111,
            },
            count: items[element]
          })
        }
      });
      await axios.put(`${environment.apiEndpoints.cart}/profile/cart`, {
        id: 'Laziriti',
        items: resultItems
      }, {
        headers: {
          Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
        },
      })
      items[id] = ++items[id];
      this.#cartSource.next(items);
      return;
    }

    if (items[id] === 0) {
      console.warn('No match. Skipping...');
      return;
    }

    items[id]--;

    if (!items[id]) {
      delete items[id];
    }
    console.log(items)
    const resultItems: any = [];
    Object.keys(items).forEach(element => {
      if (element !== 'item' && element !== 'id') {
        resultItems.push({
          product: {
            id: element,
            title: 'string',
            description: 'string',
            price: 111,
          },
          count: items[element]
        })
      }
    });
    await axios.put(`${environment.apiEndpoints.cart}/profile/cart`, {
      id: 'Laziriti',
      items: resultItems
    }, {
      headers: {
        Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
      },
    })

    this.#cartSource.next(items);
  }
}
