import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { InventoryService } from '../../../services/inventory';
import { Inventory } from '../../../models/inventory';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-edit-inventory',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './create-edit-inventory.html',
  styleUrls: ['./create-edit-inventory.scss']
})
export class CreateEditInventoryComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  today: Date = new Date();
  errorMessage: string | null = null;
  originalValue: any;


  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private dialogRef: MatDialogRef<CreateEditInventoryComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data?: Inventory
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      quantity: [this.data?.quantity || '', [Validators.required, Validators.min(1)]],
      dateIn: [this.data?.dateIn || '', Validators.required]
    });

    this.originalValue = this.form.getRawValue();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = this.form.value;

    if (this.isEditMode && JSON.stringify(payload) === JSON.stringify(this.originalValue)) {
      this.errorMessage = 'No se detectaron cambios';
      return;
    }


    const request = this.isEditMode
      ? this.inventoryService.updateInventory(this.data!.id, payload)
      : this.inventoryService.createInventory(payload);

    this.errorMessage = null;
    request.subscribe({
      next: () => {
        this.dialogRef.close({
          successMessage: this.isEditMode
            ? 'Producto actualizado correctamente'
            : 'Producto creado correctamente'
        });
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Error al guardar';
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
