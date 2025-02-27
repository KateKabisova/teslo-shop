import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {

  pages = input(0);
  currentPage = input<number>(1);

  activePage =linkedSignal(this.currentPage);

  getPages = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
