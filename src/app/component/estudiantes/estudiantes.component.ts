import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  name = new FormControl('', Validators.required);

  studentsList: Student[] = [];
  studentObj: Student = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  mobile: string = '';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.data.getAllStudents().subscribe(res => {

      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error al obtener los datos del estudiante');
    })
  }

  resetForm(){
    this.id='';
    this.first_name='';
    this.last_name='';
    this.email='';
    this.mobile='';
  }

  addStudent() {

    if (this.first_name == '' || this.last_name == '' || this.mobile == '' || this.email == '') {
      alert('Llena todos los campos de entrada');
      return;
    }
  
    this.studentObj = {
      id: '',  
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      mobile: this.mobile
    };
  
    this.data.addStudent(this.studentObj).then(() => {
      alert('Estudiante agregado');
      this.resetForm();
      this.getAllStudents();
    }).catch(err => {
      console.error('Error al agregar el estudiante:', err); 
      alert('Error al agregar el estudiante');
    });
  }

  updateStudent() {
    if (this.studentObj.id === '') {
      alert('Selecciona un estudiante para actualizar');
      return;
    }
  
    this.studentObj.first_name=this.first_name;
    this.studentObj.last_name=this.last_name;
    this.studentObj.email=this.email;
    this.studentObj.mobile=this.mobile;
  
    this.data.updateStudent(this.studentObj).then(() => {
      alert('Estudiante actualizado');
      this.resetForm();
      
    }).catch(err => {
      console.error('Error al actualizar el estudiante:', err); 
      alert('Error al actualizar el estudiante');
    });
  }
 

  editStudent(student: Student) {
    this.studentObj = student;
    this.first_name = student.first_name;
    this.last_name = student.last_name;
    this.email = student.email;
    this.mobile = student.mobile;
    console.log('Estudiante seleccionado para editar:', this.studentObj);
  }

  deleteStudent(student: Student) {
    if (window.confirm('Estás seguro de que quieres eliminar al estudiante ' + student.first_name + ' ' + student.last_name + ' ?')) {
      this.data.deleteStudent(student);
    }
  }

}
