import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Data } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule],
      providers: [AppComponent],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Loan Calculator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Loan Calculator');
  });
  it(`All input field is non-empty`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let submitBtn = document.getElementById("#saveBtn")
   
    app.enabled = false;
    fixture.detectChanges();
    // expect(submitBtn).toEqual('Loan Calculator');
  });

});

describe('HttpClient testing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule],
      providers: [AppComponent],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    
  });
  it('Test the post request', () => {
    const responseData = { interestRate: 2500, loanAmount: 20000000 }
    const sentData = {
      monthlyIncome: 500000, requestedAmount: 20000000,
      loanTerm: 36, children: "NONE", coapplicant: "NONE"
    }
  
  })
});
