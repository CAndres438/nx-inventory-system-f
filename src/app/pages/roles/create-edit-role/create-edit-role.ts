import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../../services/roles';
import { Role } from '../../../models/roles';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-edit-role',
  templateUrl: './create-edit-role.html',
  styleUrls: ['./create-edit-role.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, NgIf, MatDialogModule, MatInputModule]
})
export class CreateEditRoleComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateEditRoleComponent>,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data?: Role
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    this.form = this.fb.group({
      displayName: [this.data?.displayName || '', Validators.required],
      systemName: ['']
    });

    if (this.isEditMode) {
      this.form.removeControl('systemName');
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const payload = this.form.value;

    const request = this.isEditMode
      ? this.roleService.updateRole(this.data!.id, payload)
      : this.roleService.createRole(payload);

    this.errorMessage = null;
    request.subscribe({
      next: () => {
        this.dialogRef.close({
          successMessage: this.isEditMode
            ? 'Rol actualizado correctamente'
            : 'Rol creado correctamente'
        });
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Error al guardar el rol';
        setTimeout(() => this.errorMessage = null, 4000);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
