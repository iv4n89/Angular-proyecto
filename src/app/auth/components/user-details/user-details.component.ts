import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserForm } from '../../interfaces/user.interfaces';
import Swal from 'sweetalert2';
import { passwordMustntMatch } from 'src/app/shared/validators/custom-validators/custom-validators.component';
import { environment } from 'src/environments/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: [`../../pages/styles/auth.styles.css`]
})
export class UserDetailsComponent implements OnInit {

  file: File | null = null;
  fileUrl: string = "";
  _defaultAvatars: boolean = false;
  innerWidth: number;

  @Input('userDetails') user!: User;
  @Output() deleteEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() editando: EventEmitter<boolean> = new EventEmitter();
  @Output() editEmitter: EventEmitter<UserForm> = new EventEmitter();

  get name() {
    return this.user.name;
  }
  get email() {
    return this.user.email;
  }
  get role() {
    return this.user.role;
  }
  get avatar() {
    return this.userService.getUserImage(this.user);
  }

  avatars: string[] = [...environment.avatars];

  getAvatar(number: number) {
    return this.avatars[number];
  }

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(6)],
    password2: ['', Validators.minLength(6)],
    role: ['', [Validators.required]],
    img: ['']
  }, {
    validator: passwordMustntMatch('password', 'password2')
  });

  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.valoresForm();
  }

  editar() {
    this.editando.emit(!this.isEditing);
    this.isEditing = !this.isEditing;

    // this.isEditing = !this.isEditing;
  }

  defaultAvatars() {
    this._defaultAvatars = !this._defaultAvatars;
  }

  valoresForm() {
    this.userForm.controls.name.setValue(this.name);
    this.userForm.controls.email.setValue(this.email);
    this.userForm.controls.role.setValue(this.role);
  }

  tieneError(campo: string, errorName: string) {
    if (this.userForm.get(campo)?.dirty || this.userForm.get(campo)?.touched) {
      if (errorName === 'minLength') {
        return this.userForm.controls[campo].errors?.[errorName].minlength.actualLength >= this.userForm.controls[campo].errors?.[errorName].minlength.requiredLength;
      }
      return this.userForm.controls[campo].errors?.[errorName];
    }
    return false;
  }

  editUser() {
    const controls = Object.keys(this.userForm.controls);
    controls.forEach(control => {
      this.userForm.controls[control].markAsTouched();
    });
    if (this.userForm.valid && this.isEditing === true) {
      if (this.file) {
        this.userService.uploadUserImage(this.user.id!, this.file!)
          .subscribe(result => {
            this.editEmitter.emit(this.userForm.value);
          });
      } else {
        this.editEmitter.emit(this.userForm.value);
      }
    }
  }

  deleteUser() {
    Swal.fire({
      title: 'Borrar usuario',
      text: '¿Seguro que desea borrar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'No, volver',
      reverseButtons: true,

    }).then(result => {
      if (result.isConfirmed) {
        this.deleteEmitter.emit(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Su usuario no se ha borrado',
          icon: 'error',
        })
      }
    });
  }

  avatarUpload(event: any) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.file = event.target.files[0];
      this.fileUrl = reader.result as string;
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

}
