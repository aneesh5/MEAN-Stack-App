import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { NgForm, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StudentService } from './student/student.service';
import { LoginService } from './login/login.service';
import { HttpClientModule } from '@angular/common/http';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [StudentService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
