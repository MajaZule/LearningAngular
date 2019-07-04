import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})      // we have to use it because we are injecting a service into a service
export class DataStorageService {
  
  constructor(private http: HttpClient) {}
}