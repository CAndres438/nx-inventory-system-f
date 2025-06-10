import { Component } from '@angular/core';
import { TokenService } from '../../services/token';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  imports: [
    MatToolbarModule,
    MatIconModule
  ]
})
export class Navbar {



  constructor(private tokenService: TokenService
    , private router: Router
  ) { }

  get user() {
    return this.tokenService.user();
  }

  get userName(): string {
    return this.user?.name ?? '';
  }

  get avatarLetter(): string {
    return this.user?.name?.charAt(0).toUpperCase() ?? '';
  }


  logout(): void {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }
}
