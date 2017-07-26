import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Apartment} from './apartment';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {ApartmentService} from "./apartment.service";

@Component({
    selector: 'apartment-detail',
    templateUrl: './apartment-detail.component.html',
    styleUrls: ['./app.component.css']
})

export class ApartmentDetailComponent implements OnInit {
    apartment: Apartment;

    constructor(private apartmentService: ApartmentService,
                private route: ActivatedRoute,
                private location: Location) {
    };

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.apartmentService.getApartment(params['id']))
            .subscribe(apartment => this.apartment = apartment);
    }

    goBack(): void {
        this.location.back();
    }
}
