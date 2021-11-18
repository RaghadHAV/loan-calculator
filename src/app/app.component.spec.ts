import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Data } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule],
      providers: [AppComponent],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    app = fixture.componentInstance;

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Loan Calculator'`, () => {
    expect(app.title).toEqual('Loan Calculator');
  });

  it('Test SubmitFunction', () => {
    const formData = <NgForm>{
      value: {
        monthlyIncome: 500000,
        requestedAmount: 20000000,
        loanTerm: 36,
        children: 'NONE',
        coapplicant: 'NONE'
      }
    };
    const responseData = {
      interestRate: 2500,
      loanAmount: 20000000
    };

    app.SubmitFunction(formData);
    const req = httpTestingController.expectOne(app.targetUrl);
    req.flush(responseData);
    expect(app.showBtn).toBeTrue();
  });

  it('Sending wrong data', () => {
    const submittedData = {
      monthlyIncome: -1,
      requestedAmount: -1,
      loanTerm: -1,
      children: 'NONE',
      coapplicant: 'NONE'
    };

    const responseData = { status: 404 }

    httpClient.post<Data>(app.targetUrl, submittedData, app.httpOptions)
      .subscribe(data => expect(data).toEqual(responseData));

    const req = httpTestingController.expectOne(app.targetUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(responseData);

    httpTestingController.verify(); 
  });

  it('Should Submit the data and return the Loan Amount and Interest Rate', () => {
    const submittedData = {
      monthlyIncome: 500000,
      requestedAmount: 20000000,
      loanTerm: 36,
      children: 'NONE',
      coapplicant: 'NONE'
    };

    const responseData = {
      interestRate: 2500,
      loanAmount: 20000000
    };

    httpClient.post<Data>(app.targetUrl, submittedData, app.httpOptions)
      .subscribe(data => expect(data).toEqual(responseData));

    const req = httpTestingController.expectOne(app.targetUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(responseData);

    httpTestingController.verify();
  });

  it('Should create a form with 3 inputs fields and 2 select', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[name="monthlyIncomeField"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="requestedAmountField"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="loanTermField"]')).toBeTruthy();
    expect(compiled.querySelector('select[name="childrenField"]')).toBeTruthy();
    expect(compiled.querySelector('select[name="coapplicantField"]')).toBeTruthy();
  });

  it('Should render the button "save"', () => {
    const compiled = fixture.debugElement.query(By.css('#saveBtn'));
    expect(compiled).toBeTruthy();
  })

  it('Should have a method "SubmitFunction()"', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.SubmitFunction).not.toBe(undefined);
  });

  it('Should call the "SubmitFunction()" when the "save" button is clicked',
    fakeAsync(() => {
      const sfSpy = spyOn(app, 'SubmitFunction');
      fixture.detectChanges();
      let btn = fixture.debugElement.query(By.css('#saveBtn'));
      btn.nativeElement.click();
      tick();
      fixture.detectChanges();
      expect(sfSpy).toHaveBeenCalled();
    })
  );

  it('Check SubmitFunction() is called when form submitted', fakeAsync(() => {
    const sfSpy = spyOn(app, 'SubmitFunction');
    fixture.detectChanges();
    let form = fixture.debugElement.query(By.css('form'));

    const fakeEvent = (e: any) => {
      e.preventDefault();
    }

    form.triggerEventHandler('submit', fakeEvent);
    tick();
    fixture.detectChanges();
    expect(sfSpy).toHaveBeenCalled();

  }));


  afterEach(() => {
    httpTestingController.verify();
  });
});



