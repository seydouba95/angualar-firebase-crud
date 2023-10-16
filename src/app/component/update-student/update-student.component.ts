import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { DataService } from 'src/app/utils/data.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
studentId: string | null; // Gardez à l'esprit que cela pourrait être null

  // Modifiez ceci pour correspondre à votre modèle d'étudiant
  student: { id: string, firstName: string, lastName: string } = { id: '', firstName: '', lastName: '' };

  studentList: Student[] = [];
  p: number = 1;
          
  constructor(private route: ActivatedRoute,private studentService: DataService,private router: Router) {
  
}

  ngOnInit() {
 
    this.studentId = this.route.snapshot.paramMap.get('id');

    if (this.studentId === null) {
      // Gérer le cas où 'id' est null, par exemple, rediriger vers une page d'erreur.
    } else {
      // Vous avez une valeur valide pour 'id', vous pouvez récupérer les détails de l'étudiant ici.
      this.getStudentDetails();
    }

    this.getAllStudents();
   
  }

   getAllStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.studentList = data.map((item : any) => {
        const student = item.payload.doc.data() as Student;
        console.log(item.payload.doc);
      student.id = item.payload.doc.id; // Ajoutez l'ID du document
      return student;
    });
    }, (err) => {
      console.log('Error while fetching student data');
    });
  }
  
    getStudentDetails() {
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe((student: any) => {
        // Assurez-vous que les propriétés correspondent au type attendu
        this.student.id = student.id;
        this.student.firstName = student.firstName;
        this.student.lastName = student.lastName;
      });
    }
  }

      
  

 updateStudent() {
  if (this.studentId) {
    this.studentService.updateStudent(this.studentId, this.student).then(() => {
      console.log('Student updated successfully');
      // Redirigez l'utilisateur vers la page appropriée après la mise à jour.
      this.router.navigate(['/dashboard'])
    }).catch(error => {
      console.error('Error updating student', error);
    });
  }
}






  

}
