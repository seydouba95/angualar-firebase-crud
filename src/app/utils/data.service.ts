import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Student } from '../model/student';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
    studentsList: Student[] = [];

  constructor(private fs: AngularFirestore) { }

  //add student 
  addStudent(student: Student) : Promise<any> {

    student.id = this.fs.createId();
    
    return this.fs.collection('students').add(student);
  }
  
  //get all students avec valuechanges()
  getAllStudents(): Observable<any>
   {
    return this.fs.collection('students').valueChanges();
  }

  //get All students avec snapshotchanges()
  getStudents(): Observable<any>{
    return this.fs.collection('students').snapshotChanges();
}

  //delete student quand on a pas directement id du document
deleteStudent(student: Student) {
  const studentRef = this.fs.collection('students', ref => ref.where('id', '==', student.id));

  studentRef.get().subscribe(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.ref.delete().then(() => {
        console.log('Student deleted Successfully');
      }).catch(error => {
        console.error('Error deleting student', error);
      });
    });
  });
}
  
  //delete avec snapshotchanges
  deletestudentother(studentId: string): Promise<void> {
    return this.fs.collection('students').doc(studentId).delete();
  }


  //update student
  updateStudent(id: string, updatedStudent: Student) {
    return this.fs.collection('students').doc(id).update(updatedStudent);
  }

 
  // Méthode pour obtenir les détails d'un étudiant par ID
  getStudentDetails(studentId: string): Observable<any> {
    return this.fs.doc<Student>(`students/${studentId}`).valueChanges();
  }
 
  //get student by id
   getStudentById(id: string) {
    return this.fs.collection('students').doc(id).valueChanges();
  }



}
