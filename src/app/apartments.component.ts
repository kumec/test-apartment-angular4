import {Component, OnInit} from '@angular/core';
import {Apartment} from './apartment';
import {ApartmentService} from './apartment.service';
import {Router} from '@angular/router';

@Component({
    selector: 'my-apartments',
    templateUrl: './apartment.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ApartmentService]
})

export class ApartmentsComponent implements OnInit {
    apartments: Apartment[];

    constructor(private router: Router,
                private apartmentService: ApartmentService) {
    }

    /**
     * Gets the existing apartments
     */
    getApartments(): void {
        this.apartmentService.getApartments()
            .then(apartments => {
                this.apartments = apartments;
            });
    }

    ngOnInit(): void {
        this.getApartments();
    }

    update(id: string): void {
        this.router.navigate(['/update', id]);
    }

    viewDetail(id: string): void {
        this.router.navigate(['/detail', id]);
    }
}
