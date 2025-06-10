import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Inventory } from '../../models/inventory';
import { InventoryService } from '../../services/inventory';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateEditInventoryComponent } from '../inventory/create-edit-inventory/create-edit-inventory';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss'
})
export class InventoryComponent implements OnInit {
  inventoryList: Inventory[] = [];
  filterForm!: FormGroup;
  today: Date = new Date();
  errorMessage: string | null = null;
  successMessage: string | null = null;


  displayedColumns: string[] = [
    'name',
    'quantity',
    'dateIn',
    'createdBy',
    'modifiedBy',
    'dateModified',
    'actions'
  ];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: [''],
      startDate: [null],
      endDate: [null],
      createdBy: [null]
    });

    this.loadInventory();
  }

  loadInventory(): void {
    const filters = this.filterForm.value;
    this.inventoryService.filterInventory(filters).subscribe({
      next: (data) => this.inventoryList = data,
      error: () => {
        this.errorMessage = 'Error al cargar el inventario';
        setTimeout(() => this.errorMessage = null, 3000);
      }
    });
  }

  onSubmit(): void {
    this.loadInventory();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateEditInventoryComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.successMessage) {
        this.successMessage = result.successMessage;
        setTimeout(() => this.successMessage = null, 3000);
        this.loadInventory();
      }
    });

  }

  openEditModal(item: Inventory): void {
    const dialogRef = this.dialog.open(CreateEditInventoryComponent, {
      width: '500px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.successMessage) {
        this.successMessage = result.successMessage;
        setTimeout(() => this.successMessage = null, 3000);
        this.loadInventory();
      }
    });
  }

  deleteItem(id: number): void {
    const confirmDelete = confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmDelete) return;

    this.inventoryService.deleteInventory(id).subscribe({
      next: () => {
        this.successMessage = 'Producto eliminado correctamente';
        this.loadInventory();

        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'No se pudo eliminar el producto';
        setTimeout(() => this.errorMessage = null, 3000);
      }
    });
  }
}
