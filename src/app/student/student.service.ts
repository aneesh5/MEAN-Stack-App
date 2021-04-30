import {Data} from '../data.module';
import {Subject, Subscriber} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

export class StudentService {
  private studentServData: Data[] = [];
  private studentUpdated = new Subject<Data[]>();

  constructor(private http: HttpClient) {}

  getData() {
    //return [...this.studentServData];
    this.http.get<{message:string, students: any }>('http://localhost:3000/form/savedetails')
      .pipe(map((studentData) => {
        return studentData.students.map(student => {
          return {
            FirstName: student.FirstName,
            LastName: student.LastName,
            MiddleName: student.MiddleName,
            EmailId: student.EmailId,
            Phone: student.Phone,
            Height: student.Height,
            Weight: student.Weight,
            DoorNo: student.DoorNo,
            Country:student.Country,
            State: student.State,
            Zipcode:student.Zipcode,
            id: student._id
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
    FirstName: string,
    LastName: string,
    MiddleName: string,
    DoorNo: string,
    Country: string,
    State: string,
    Zipcode: string,
    Height: number,
    Weight: number,
    EmailId: string,
    Phone: number,
    ) {
    const student: Data = {id:null, FirstName: FirstName, LastName: LastName, MiddleName: MiddleName,
      EmailId: EmailId, Phone: Phone, Height:Height, Weight:Weight, DoorNo:DoorNo, Country:Country, State:State, Zipcode:Zipcode};
    this.http.post<{message: string, studentId: string}>('http://localhost:3000/form/savedetails',student)
      .subscribe((responseData) => {
        console.log(responseData.message);
        const id = responseData.studentId;
        student.id = id;
        this.studentServData.push(student);
        this.studentUpdated.next([...this.studentServData]);
      });

  }

  deleteStudent(studentId: string) {
   this.http.delete("http://localhost:3000/form/savedetails/" + studentId)
    .subscribe(() => {
      console.log('Deleted!');
      const updatedRecords = this.studentServData.filter(student => student.id !== studentId);
      this.studentServData = updatedRecords;
      this.studentUpdated.next([...this.studentServData]);
    });
  }


}
