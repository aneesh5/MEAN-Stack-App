import {Data1} from '../data1.module';
import {Subject, Subscriber} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

export class LoginService {
  private studentServData: Data1[] = [];
  private studentUpdated = new Subject<Data1[]>();

  constructor(private http: HttpClient) {}

  getData() {
    //return [...this.studentServData];
    this.http.get<{message:string, logins: any }>('http://localhost:3000/auth/login')
      .pipe(map((studentData) => {
        return studentData.logins.map(login => {
          return {
            Username: login.Username,
            Password: login.Password,
            id: login._id
          };
        });
      }))
      .subscribe(transformedStudents => {
        this.studentServData = transformedStudents;
        this.studentUpdated.next([...this.studentServData]);
      });
  }

  getStudentUpdateListener() {
    return this.studentUpdated.asObservable();
  }

  addData(
    Username: string,
    Password: string,
    ) {
    const login = {id: null,Username: Username, Password: Password};
    this.http.post<{message: string, studentId: string}>('http://localhost:3000/auth/login',login)
      .subscribe((responseData) => {
        console.log(responseData.message);
        const id = responseData.studentId;
        login.id = id;
        this.studentServData.push(login);
        this.studentUpdated.next([...this.studentServData]);
      });

  }

}
