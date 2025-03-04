import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '@products/services/product.service';
import { ProductDetailsComponent } from "../product-details/product-details.component";

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
  styleUrl: './product-admin-page.component.scss',
})
export class ProductAdminPageComponent {

  activatedRoute = inject(ActivatedRoute);
  router =  inject(Router);
  productService = inject(ProductService)

  productId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['id']))
  );


  productResource = rxResource({
    request: () => ({ id: this.productId() }),
    loader: ({ request }) => {
      return this.productService.getProductById(request.id);
    },
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products']);
    }
  });
}
