import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { map } from 'rxjs';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
  styleUrl: './gender-page.component.scss',
})
export class GenderPageComponent {

  route = inject(ActivatedRoute);
  gender = toSignal(this.route.params.pipe(
    map(({ gender }) => gender)
  ));

  productsService = inject(ProductService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1
    }),
    loader: ({ request }) => {
      return this.productsService.getProducts({ gender: request.gender, offset: request.page * 9, });
    },
  });


}
