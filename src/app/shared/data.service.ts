import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';
import { Cursos } from '../model/cursos';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  // Agregar estudiante
  addStudent(student : Student) {
    student.id = this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  // Listar Estudiantes
  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges();
  }

  // Eliminar estudiante
  deleteStudent(student : Student) {
    return this.afs.doc('/Students/'+student.id).delete();
  }

  // Actualizar estudiante
  updateStudent(student: Student) {
    return this.afs.doc('/Students/'+student.id).update({
      first_name:student.first_name,
      last_name:student.last_name,
      email:student.email,
      mobile:student.mobile,
    });
  }

  // METODOS PARA CURSOS
  // Agregar curso
  addCursos(cursos : Cursos) {
    cursos.id = this.afs.createId();
    return this.afs.collection('/Cursos').add(cursos);
  }

  // Listar Cursos
  getAllCursos() {
    return this.afs.collection('/Cursos').snapshotChanges();
  }

  // Eliminar Cursos
  deleteCursos(cursos : Cursos) {
    return this.afs.doc('/Cursos/'+cursos.id).delete();
  }

  // Actualizar Cursos
  updateCursos(cursos : Cursos) {
    return this.afs.doc('/Cursos/'+cursos.id).update({
      name:cursos.name,
      description:cursos.description,
      creditos:cursos.creditos,    
    });
  }
}
