import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../components/navbar/navbar';
import { Sidebar } from '../components/sidebar/sidebar';
import { TokenService } from '../services/token';

@Component({
  standalone: true,
  imports: [RouterOutlet, Navbar, Sidebar],
  template: `
    <app-navbar></app-navbar>
<div style="display: flex; min-height: 100vh;">
  @if (isLoggedIn) {
    <app-sidebar></app-sidebar>
  }
  <main style="flex-grow: 1; padding: 1rem;">
    <router-outlet></router-outlet>
  </main>
</div>
  `
})
export class LayoutComponent {
  constructor(private tokenService: TokenService) { }

  get isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }
}
