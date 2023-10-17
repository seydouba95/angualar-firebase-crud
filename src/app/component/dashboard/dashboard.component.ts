import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/utils/auth.service';
import { DataService } from 'src/app/utils/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
  

export class DashboardComponent implements OnInit {

  
  studentsList: Student[] = [];
studentForm: FormGroup;
  p: number = 1;
  searchTerm: string = '';
  isEditing = false;

  filteredStudents: Student[] = [];
  

  
  constructor(private data: DataService, private fb: FormBuilder,
  private router: Router, private authServ: AuthService,private afAuth: AngularFireAuth) { 
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['',Validators.required]

    });
  }

  




  ngOnInit(): void {
    
 //  this.getStudents();
   this.getAllStudents();
 this.filterStudents();
    
  
  }

 
  

 
  //ajout etudiant
  onSubmit() {
    
    if (this.studentForm.valid) {

      const newStudent = this.studentForm.value;
      
      this.data.addStudent(newStudent).then(() => {
        console.log('Student added Successfully');

      // Réinitialisez les champs du formulaire et l'URL de l'image
        this.studentForm.reset();

      }).catch((error) => {
        console.error('Error adding student', error);
      });

      
    }
  }

  // List of Students valuechange
  getStudents() {
    this.data.getAllStudents().subscribe((data) => {
      this.studentsList = data;
    this.filteredStudents = data; // Initialisez filteredStudents avec la liste complète au départ

    }, (err) => {
      console.log('Error while fetching student data');
    });
  }

  //get all students snapshotchanges
  getAllStudents() {
    this.data.getStudents().subscribe((data) => {
      this.studentsList = data.map((item : any) => {
        const student = item.payload.doc.data() as Student;
        console.log(item.payload.doc);
        student.id = item.payload.doc.id; // Ajoutez l'ID du document
         // Initialisez filteredStudents avec la liste complète au départ
        
      return student;
      });
      // Après avoir récupéré les données, initialisez filteredStudents avec la liste complète
    this.filteredStudents = this.studentsList;
    }, (err) => {
      console.log('Error while fetching student data');
    });
  }

  //delete student
  deleteStudent(student: Student) {
  if (window.confirm('Are you sure you want to delete ' + student.firstName + ' ' + student.lastName + ' ?')) {
    this.data.deleteStudent(student);
  }
  }


  //delete student 2
  deleteStudentother(studentId: string, student: Student) {
  
    if (window.confirm('Are you sure you want to delete ' + student.firstName + ' ' + student.lastName + ' ?')) {
      this.data.deletestudentother(studentId).then(() => {
        console.log('Student deleted Successfully');
      }).catch((error) => {
        console.error('Error deleting student', error);
      });
    }
  }


  //update student 
   //update student 
  updateStudent(student: Student) {
    const studentId = student.id;
    this.router.navigate(['/update-student', studentId]);
  }

  //search function 
  filterStudents() {

  // Assurez-vous que searchTerm est défini
   if (this.searchTerm.trim() === '') {
      this.filteredStudents = this.studentsList; // Réinitialisez la liste complète lorsque la recherche est vide
    } else {
      this.filteredStudents = this.studentsList.filter(student => {
        // Appliquez votre logique de filtrage ici, par exemple, recherche dans les prénoms et noms
        return student.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
               student.lastName.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  }
    

  

  logout() {
    this.authServ.logout();
  }
  

 
}

  











