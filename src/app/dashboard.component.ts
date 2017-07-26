import {Component, OnInit} from '@angular/core';
import {ApartmentService} from "./apartment.service";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./app.component.css']
})

export class DashboardComponent implements OnInit {
    totalApartments: number;

    constructor(private apartmentService: ApartmentService) {
    };

    ngOnInit(): void {
        this.apartmentService.getApartments()
            .then(response => this.totalApartments = response.length);
    }

}
