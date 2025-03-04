import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-dashboard-layout.component.html',
  styleUrl: './admin-dashboard-layout.component.scss',
})
export class AdminDashboardLayoutComponent {


  authService = inject(AuthService);

  user = computed(() => this.authService.user());
 }
