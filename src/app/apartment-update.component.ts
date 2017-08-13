import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Apartment} from './apartment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApartmentService} from "./apartment.service";
import {Location} from '@angular/common';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'update-apartment',
    templateUrl: './apartment-update.component.html',
    styleUrls: ['./app.component.css']
})

export class ApartmentUpdateComponent implements OnInit {
    apartmentUpdateForm: FormGroup;
    apartment: Apartment;
    id: '';
    token: '';

    constructor(private apartmentService: ApartmentService,
                private router: Router,
                private route: ActivatedRoute,
                private location: Location,
                private formBuilder: FormBuilder) {
    };

    ngOnInit(): void {
        var obsComb = Observable.combineLatest(this.route.params, this.route.queryParams,
            (params, qparams) => ({params, qparams}));


        obsComb.subscribe(ap => {
            this.id = ap.params['id'];
            this.token = ap.qparams['token'];
        });

        this.route.params
            .switchMap((params: Params) => this.apartmentService.getApartmentForEdit(this.id, this.token))
            .subscribe(apartment => {
                this.apartment = apartment;
                this.buildForm();
            });
    }

    buildForm(): void {
        this.apartmentUpdateForm = this.formBuilder.group({
            countRooms: [this.apartment.countRooms, Validators.required],
            countBathrooms: [this.apartment.countBathrooms, Validators.required],
            square: [this.apartment.square, Validators.required],
            hasParking: [this.apartment.hasParking, Validators.required],
            comment: [this.apartment.comment],
            unit: [this.apartment.unit],
            building: [this.apartment.building, Validators.required],
            street: [this.apartment.street, Validators.required],
            city: [this.apartment.city, Validators.required],
            region: [this.apartment.region, Validators.required],
            country: [this.apartment.country, Validators.required],
            zipCode: [this.apartment.zipCode, Validators.required],
        });
    }

    update(): void {
        let apartment = this.apartmentUpdateForm.value as Apartment;
        this.apartmentService.update(apartment, this.id, this.token)
            .then(() => {
                this.router.navigate(['/apartments']);
            })
    }

    remove(): void {
        this.apartmentService.remove(this.id, this.token)
            .then(() => {
                this.router.navigate(['/apartments']);
            })
    }

    goBack(): void {
        this.location.back();
    }
}
