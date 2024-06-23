import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTransactionsByDateRange(startDate: string, endDate: string,status?:string): Observable<any[]> {
    let url = `${this.apiUrl}?startDate=${startDate}&endDate=${endDate}`;
    if(status) url+=`&status=${status}`
    return this.http.get<any[]>(url);
  }

  getTransactionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateComment(id:string,comments:string):Observable<any>{
    return this.http.post(this.apiUrl+'/update', { id,comments }).pipe(
      catchError(error => {
        console.error('Error updating transaction comments:', error);
        throw error;
      })
    );
  }

}
