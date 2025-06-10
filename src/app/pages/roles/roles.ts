import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from '../../services/roles';
import { Role } from '../../models/roles';
import { CreateEditRoleComponent } from './create-edit-role/create-edit-role';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.html',
  styleUrls: ['./roles.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatCard,
    MatCardTitle,
    MatIcon,
    MatTable,
    CommonModule,
    MatTableModule
  ]
})
export class RolesComponent implements OnInit {
  roleList: Role[] = [];
  displayedColumns: string[] = ['displayName', 'active', 'actions'];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => this.roleList = roles,
      error: () => this.errorMessage = 'Error al cargar los roles'
    });
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateEditRoleComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.successMessage) {
        this.successMessage = result.successMessage;
        setTimeout(() => this.successMessage = null, 4000);
        this.loadRoles();
      }
    });
  }

  openEditModal(role: Role): void {
    const dialogRef = this.dialog.open(CreateEditRoleComponent, {
      width: '400px',
      data: role
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.successMessage) {
        this.successMessage = result.successMessage;
        setTimeout(() => this.successMessage = null, 4000);
        this.loadRoles();
      }
    });
  }

  toggleRole(role: Role): void {
     this.roleService.toggleRole(role.id, !role.active).subscribe({
      next: () => {
        this.successMessage = `Rol ${role.active ? 'desactivado' : 'activado'} correctamente`;
        this.loadRoles();
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Error al actualizar el estado del rol';
        setTimeout(() => this.errorMessage = null, 3000);
      }
    });
  }
}
