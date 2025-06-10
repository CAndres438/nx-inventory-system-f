import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../services/token';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  isCollapsed = false;

  constructor(private tokenService: TokenService) {}

  get isAdmin(): boolean {
    return this.tokenService.hasRole('ROLE_ADMIN');
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
