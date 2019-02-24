import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionComponent } from './components/question/question.component';
import { TestComponent } from './components/test/test.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestFormComponent } from './components/test-form/test-form.component';
import { QuestionModalComponent } from './components/question-modal/question-modal.component';
import { ExaminedComponent } from './components/examined/examined.component';
import { ExamComponent } from './components/exam/exam.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    RegisterAdminComponent,
    MainMenuComponent,
    QuestionFormComponent,
    RestorePasswordComponent,
    QuestionListComponent,
    QuestionComponent,
    TestComponent,
    TestFormComponent,
    TestListComponent,
    QuestionModalComponent,
    ExaminedComponent,
    ExamComponent,
    ConfirmModalComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
