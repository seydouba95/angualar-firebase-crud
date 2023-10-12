import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  
studentsList : Student[] = [];



id: string = '';
first_name: string = '';
last_name: string = '';
email: string = '';
phone: string = '';
imageUrl: string = '';

newFirstName: string = '';
newLastName: string = '';
newEmail: string = '';
newPhone: string = '';


isEditing = false;

editingStudent: Student | null = null ; // Variable pour stocker l'étudiant en cours d'édition

selectedImage: File | null = null;

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage,
private auth: AuthService, private data: DataService) { 
   
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
     this.first_name =  '';
      this.last_name = '' ;
      this.phone= '';
      this.email = '';
      this.imageUrl = '' ;
    this.selectedImage = null;
  }
  //add student

onImageSelected(event: any) {
  const file: File = event.target.files[0];

  if (file) {
    const storagePath = `student-images/${file.name}`;
    const storageRef = this.storage.ref(storagePath);
    const uploadTask = storageRef.put(file);

    uploadTask.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.imageUrl = downloadURL; // Stockez l'URL de l'image
      });
    });
  }
}


    
 
  addStudent() {
    const newStudent: Student = {
       id: '',
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      imageUrl: this.imageUrl // Utilisez l'URL de l'image téléchargée
    };
    this.data.addStudent(newStudent);

  // Réinitialisez les champs du formulaire et l'URL de l'image
   this.resetForm();

   // Vous pouvez également réinitialiser l'élément input de type "file" si nécessaire
    const fileInput = document.getElementById('imageUrl') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
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
