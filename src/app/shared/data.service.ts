import { Injectable } from '@angular/core';
import {  AngularFirestore} from "@angular/fire/compat/firestore";
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private angularFireStore: AngularFirestore) { }

  //add student 
  addStudent(student: Student){
  student.id = this.angularFireStore.createId();
  return this.angularFireStore.collection('students').add(student);
  }

  //get all students
  getAllStudents(){
    return this.angularFireStore.collection('students').snapshotChanges();
  }

  //delete student
  deleteStudent(student: Student){
    return this.angularFireStore.doc('/students/' + student.id).delete();

  }

  //update student
  updateStudent(studentId: string, updatedData: any): Promise<void> {
    const studentRef = this.angularFireStore.collection('students').doc(studentId);
    return studentRef.update(updatedData);
  }

  
}
 