import { Component, OnInit } from '@angular/core';
import { Cursos } from 'src/app/model/cursos';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit{

  cursosList : Cursos[] = [];
  cursosObj : Cursos = {
    id: '',
    name: '',
    description: '',
    creditos: ''
  };
  id : string = '';
  name : string = '';
  description : string = '';
  creditos : string = '';

  constructor(private auth : AuthService, private data : DataService) { }

  ngOnInit(): void {
    this.getAllCursos();
  }

  getAllCursos() {
    this.data.getAllCursos().subscribe(res => {
  
      this.cursosList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
       })
  
    }, err => {
      alert('Error al obtener cursos');
    }) 
   }

  resetForm() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.creditos = '';
  }
  
  addCursos() {
    
    if(this.name == '' || this.description == '' || this.creditos == '') {
      alert('Llena todos los campos de entrada');
      return;
    }

    this.cursosObj = {
      id: '', 
      name: this.name,
      description: this.description,
      creditos: this.creditos
    };

    this.data.addCursos(this.cursosObj).then(() => {
      alert('Curso agregado');
      this.resetForm();
      this.getAllCursos();
    }).catch(err => {
      console.error('Error al agregar curso', err);
      alert('Error al agregar curso')
    });

  }
  
  updateCursos() {
    if (this.cursosObj.id === '') {
      alert('Selecciona un estudiante para actualizar');
      return;
    }
  
    this.cursosObj.name=this.name;
    this.cursosObj.description=this.description;
    this.cursosObj.creditos=this.creditos;
  
    this.data.updateCursos(this.cursosObj).then(() => {
      alert('Curso actualizado');
      this.resetForm();
      
    }).catch(err => {
      console.error('Error al actualizar el curso:', err); // Log para depuración
      alert('Error al actualizar el curso');
    });   
  }

  editCursos(cursos: Cursos) {
    this.cursosObj = cursos;
    this.name = cursos.name;
    this.description = cursos.description;
    this.creditos = cursos.creditos;
    
    console.log('Estudiante seleccionado para editar:', this.cursosObj); // Agregado para depuración
  }
  
  deleteCursos(cursos : Cursos) {
    if(window.confirm('Estás seguro de que quieres eliminar '+cursos.name+' '+cursos.description+' ?')) {
      this.data.deleteCursos(cursos);
    }
    }
}
