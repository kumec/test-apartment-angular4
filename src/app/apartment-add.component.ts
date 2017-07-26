import 'rxjs/add/operator/switchMap';
import {Component} from '@angular/core';
import {Apartment} from './apartment';
import {Router} from '@angular/router';
import {ApartmentService} from "./apartment.service";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Location} from "@angular/common";

@Component({
    selector: 'add-apartment',
    templateUrl: './apartment-add.component.html',
    styleUrls: ['./app.component.css']
})

export class ApartmentAddComponent {
    apartmentAddForm: FormGroup;
    apartment = new Apartment();

    constructor(private apartmentService: ApartmentService,
                private router: Router,
                private location: Location,
                private formBuilder: FormBuilder) {
        this.buildForm();
    };

    buildForm(): void {
        this.apartmentAddForm = this.formBuilder.group({
            count_rooms: [this.apartment.count_rooms, Validators.required],
            count_bathrooms: [this.apartment.count_bathrooms, Validators.required],
            square: [this.apartment.square, Validators.required],
            has_parking: [this.apartment.has_parking, Validators.required],
            comment: [this.apartment.comment],
            unit: [this.apartment.unit],
            building: [this.apartment.building, Validators.required],
            street: [this.apartment.street, Validators.required],
            city: [this.apartment.city, Validators.required],
            region: [this.apartment.region, Validators.required],
            country: [this.apartment.country, Validators.required],
            zip_code: [this.apartment.zip_code, Validators.required],
            owner_email: [this.apartment.owner_email, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        });
    }

    add(): void {
        let apartment = this.apartmentAddForm.value as Apartment;
        this.apartmentService.add(apartment)
            .then(response => {
                console.log('response', response);
                this.router.navigate(['/apartments']);
            })
    }

    goBack(): void {
        this.location.back();
    }
}
