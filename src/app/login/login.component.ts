import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Data1 } from '../data1.module';
import { LoginService } from './login.service';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData: Data1[] = [];
  private loginSub: Subscription;
  form: FormGroup;
  public loginInvalid = false;

  userid: string;
  password: string;

  logoutmsg: string;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService,
    private changeDetectorRef: ChangeDetectorRef

  ) {
      this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.loginService.getData();
    this.loginSub = this.loginService.getStudentUpdateListener()
      .subscribe((loginData: Data1[]) => {
        this.loginData=loginData;
      });
  }

  onSubmit() {
    let uname,pass;
    if(this.form.invalid){
      return;
    }
    this.userid = this.form.get('username').value;
    this.password = this.form.get('password').value;
    for (let data of this.loginData) {
      let UserName = Object.keys(data)[0];
      let PassWord = Object.keys(data)[1];

      uname = data[UserName];
      pass = data[PassWord];
      if(this.userid === uname && this.password === pass){
        console.log();
        this.router.navigate(["form"]);
      }

    }
    this.loginInvalid = true;
  }

  onRegister() {

      this.userid = this.form.get('username').value;
      this.password = this.form.get('password').value;
      alert('Registered Successfully');
      this.loginService.addData(this.userid,this.password);
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}
