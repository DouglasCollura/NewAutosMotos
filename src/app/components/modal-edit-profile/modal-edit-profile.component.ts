import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoloNumeroTelf } from 'src/assets/script/general';
import { ModalEditProfileService } from './modal-edit-profile.service';

@Component({
    selector: 'app-modal-edit-profile',
    templateUrl: './modal-edit-profile.component.html',
    styleUrls: ['./modal-edit-profile.component.scss']
})
export class ModalEditProfileComponent implements OnInit {
    @Output() success: EventEmitter<string> = new EventEmitter();
    form: FormGroup;

    constructor(
        private ModalEditProfileService: ModalEditProfileService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            email: ['', Validators.email],
            mobile_number: [0],
            logo_path: [null]
        })
    }

    modal = false;
    user: any = [];

    get g() { return this.form.controls }

    ngOnInit(): void {
        // ESPERA ATENTO A ALGUN CAMBIO EN EL SERVICIO DEL MODAL
        this.ModalEditProfileService.change.subscribe(res => {
            this.modal = res.isOpen;
            this.user = res.user;
            this.form.controls['email'].setValue(res.user.email);
            this.form.controls['mobile_number'].setValue(res.user.mobile_number);
        })

        // ESPERA ATENTO A ALGUN CAMBIO EN EL SERVICIO DEL MODAL
        this.ModalEditProfileService.run.subscribe(res => this.modal = res)
    }
    email = '';
    mobile_number = '';

    // CIERRA MODAL
    close() {
        this.ModalEditProfileService.onRun()
    }

    isLoading = false;

    update() {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('email', this.form.controls['email'].value)
        formData.append('mobile_number', this.form.controls['mobile_number'].value)

        this.ModalEditProfileService.updateUser(formData)
            .then(res => {
                this.isLoading = false;
                this.close()
                this.success.emit(res.data)
            })
    }

    SoloNumeroTelf(ev:any){
        return SoloNumeroTelf(ev);
    }
}
