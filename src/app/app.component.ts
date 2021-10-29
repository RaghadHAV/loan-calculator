import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  @Input() enabled = true;
  title = 'Loan Calculator';
  loanAmount = 0;
  interestRate = 0;
  // monthlyIncomeField = 44;
  // requestedAmountField = 0;
  // loanTermField = 0;
  // childrenField = "";
  // coapplicantField = "";
  errorMessege = '';
  showBtn = false;

SubmitFunction(calculateLoanForm: NgForm) {
   this.showBtn = true;
    console.log("calculateLoanForm.value.childrenField", calculateLoanForm.value.childrenField)
    const headers = { 'X-API-KEY': 'swb-222222', 'Content-Type': 'application/json' }
    const body = {
      "monthlyIncome": calculateLoanForm.value.monthlyIncomeField, "requestedAmount": calculateLoanForm.value.requestedAmountField,
      "loanTerm": calculateLoanForm.value.loanTermField, "children": calculateLoanForm.value.childrenField, "coapplicant": calculateLoanForm.value.coapplicantField
    }

    this.http.post<any>('https://homework.fdp.workers.dev/', body, { headers: headers }).pipe(catchError(this.handleError)).subscribe(data => {
      console.log("data", data)
      this.loanAmount = data.loanAmount;
      this.interestRate = data.interestRate;
    }, (error) => {
      this.errorMessege = error;
    });
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessege = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessege = `An error occurred: ${error.error}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errorMessege = `Backend returned code ${error.status}, body was: `, error.error;
    }
    errorMessege += ' Something bad happened; please try again later.';
    // Return an observable with a user-facing error message.
    return throwError(errorMessege);
  }

}
