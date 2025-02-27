
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductService } from '@products/services/product.service';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';



@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  private productsService = inject(ProductService);
  paginationService = inject(PaginationService);

  // activatedRote = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.activatedRote.queryParamMap.pipe(
  //     map(params => (params.get('page') ? +params.get('page')!:1)),
  //     map( page => (isNaN(page)? 1:page))
  //   ),{
  //     initialValue:1,
  //   }
  // )


  // offset:request.page *9, lo que hara es que coja los 9 registros
  //page:this.currentPage()-1} para que empiece desde la pagina 0
  productsResource = rxResource({
    request: () => ({page:this.paginationService.currentPage()-1}),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset:request.page *9,
      });
    },
  });
}


