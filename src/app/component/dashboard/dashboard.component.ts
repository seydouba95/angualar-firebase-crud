import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  
studentsList : Student[] = [];
studentObj: Student = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: ''
};



id: string = '';
first_name: string = '';
last_name: string = '';
email: string = '';
phone: string = '';

newFirstName: string = '';
newLastName: string = '';
newEmail: string = '';
newPhone: string = '';


isEditing = false;

editingStudent: Student | null = null ; // Variable pour stocker l'étudiant en cours d'édition


  constructor(private auth: AuthService, private data: DataService) { 
   
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  //logout function
 // register(){
//this.auth.logout();
  //}

  //list of all students
  getAllStudents(){
    this.data.getAllStudents().subscribe(res => {
         this.studentsList = res.map( (e:any)=> {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
         })
    },err =>{
alert('Error while fetching student data');
    })
  }
  

  //reset form
  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.phone = '';
  }
  //add student
  addStudent(){
    this.isEditing = false; // Désactivez le mode d'édition

    if (this.first_name == '' || this.last_name == '' || this.phone == '' || this.email == '') {
      alert('Fill all input fields');
      return;
    }

    this.studentObj.id = '';
    this.studentObj.email = this.email;
    this.studentObj.first_name = this.first_name;
    this.studentObj.last_name = this.last_name;
    this.studentObj.phone = this.phone;

    this.data.addStudent(this.studentObj);
    this.resetForm();

  }


  editStudent(student: Student) {
    this.editingStudent = student; // Stockez l'étudiant sélectionné
    this.isEditing = true; // Activez le mode d'édition
    // Remplissez les champs du formulaire de mise à jour avec les données de l'étudiant sélectionné
    this.newFirstName = student.first_name;
    this.newLastName = student.last_name;
    this.newEmail = student.email;
    this.newPhone = student.phone;
  }
  
  


  
  updateStudent() {
    if (!this.editingStudent) {
      return;
    }
  
    const updatedData = {
      first_name: this.newFirstName,
      last_name: this.newLastName,
      email: this.newEmail,
      phone: this.newPhone,
    };
  
    this.data.updateStudent(this.editingStudent.id, updatedData)
      .then(() => {
        // Mise à jour réussie
        console.log('Student updated successfully.');
        // Réinitialisez les champs et désactivez le mode d'édition
        this.resetForm();
        this.isEditing = false;
        console.log('Étudiant updated :',updatedData ); // Ajoutez cette ligne pour vérifier les données de l'étudiant
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error('Error updating student:', error);
      });
  }
  
  


  

  //delete student
  deleteStudent(student:Student){
    if (window.confirm('Are you sure you want to delete ' +student.first_name+' '+student.last_name+' ?')) {
      this.data.deleteStudent(student);
    }
  }

}
