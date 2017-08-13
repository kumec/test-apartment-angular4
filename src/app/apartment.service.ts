import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Apartment} from "./apartment";
import {Headers, Http} from '@angular/http';

@Injectable()
export class ApartmentService {

    private host = window.location.hostname;
    private headers = new Headers({'Content-Type': 'application/json'});
    private apartmentsURL = `http://${this.host}:8080/apartment`;

    constructor(private http: Http) {
    };

    /**
     * Return all apartments
     * @returns {Promise<Apartment[]>}
     */
    getApartments(): Promise<Apartment[]> {
        return this.http.get(this.apartmentsURL)
            .toPromise()
            .then(response => {
                return response.json() as Apartment[];
            })
            .catch(this.handleError);
    }

    /**
     * Returns apartment based on id
     * @param id:string
     * @returns {Promise<Apartment>}
     */
    getApartment(id: string): Promise<Apartment> {
        const url = `${this.apartmentsURL}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Apartment)
            .catch(this.handleError);
    }

    /**
     * Returns apartment based on id for edit
     * @param id:string
     * @param token:string
     *
     * @returns {Promise<Apartment>}
     */
    getApartmentForEdit(id: string, token: string): Promise<Apartment> {
        if (token) {
            const url = `${this.apartmentsURL}/${id}?token=${token}`;
            return this.http.get(url)
                .toPromise()
                .then(response => response.json() as Apartment)
                .catch(this.handleError);
        } else {
            this.handleError('Need token!');
        }

    }

    /**
     * Adds new apartment
     * @param apartment:Apartment
     * @returns {Promise<Apartment>}
     */
    add(apartment: Apartment): Promise<Apartment> {
        return this.http.post(this.apartmentsURL, JSON.stringify(apartment), {headers: this.headers})
            .toPromise()
            .then(response => { if (response.status != 201 ){ response.json() as Apartment} } )
            .catch(this.handleError)
    }

    /**
     * Updates apartment that matches to id
     * @param apartment:Apartment
     * @param id:string
     * @param token:string
     * @returns {Promise<Apartment>}
     */
    update(apartment: Apartment, id: string, token: string): Promise<Apartment> {
        return this.http.put(`${this.apartmentsURL}/${id}?token=${token}`, JSON.stringify(apartment), {headers: this.headers})
            .toPromise()
            .then(response => { if (response.status != 204 ){ response.json() as Apartment} })
            .catch(this.handleError)
    }

    /**
     * Removes apartment
     * @param id:string
     * @param token:string
     * @returns {Promise<Apartment>}
     */
    remove(id: string, token: string): Promise<any> {
        return this.http.delete(`${this.apartmentsURL}/${id}?token=${token}`)
            .toPromise()
            .then(response => console.log(response))
            .catch(this.handleError)
    }

    /**
     * Handles error thrown during HTTP call
     * @param error:any
     * @returns {Promise<never>}
     */
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
