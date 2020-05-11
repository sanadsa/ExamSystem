import { FakeAuthenticationService } from './../../services/authentication.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdminComponent } from './login-admin.component';

describe('LoginAdminComponent', () => {
  let component: LoginAdminComponent;
  let fixture: ComponentFixture<LoginAdminComponent>;
  function expected() {"i am sanad"};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginAdminComponent ],
      providers:[FakeAuthenticationService]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdminComponent);
    component = fixture.componentInstance;

    
    
    fixture.detectChanges();

  });

  it('should create', () => {
   // expect(component).toBeTruthy();
   expect (component.restorePassword("1")).toEqual(expected);

  });
});
