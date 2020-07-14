import { ProjectService } from './../../services/project.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
form: FormGroup;
id:any;
  constructor(private projet: ProjectService) {
    
   }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      description : new FormControl('', [Validators.required]),
      technologies :  new FormControl('', [Validators.required]),
      user : new FormArray([]),

    })

  }
  get user() {return this.form.get('user') as FormArray; }
  ques(): FormGroup {
    return new FormGroup({
      description: new FormControl(''),
      tasks :  new FormArray([]),
      
    });
  }
  get tasks(){return this.form.get('tasks') as FormArray}
  task(): FormGroup{
    return new FormGroup({
      title : new FormControl(''),
      content : new FormControl(''),


    })
  }
  addProject(){

    if(this.form.status==='VALID' && this.form.controls['user'].touched===true){
      this.projet.addProject(this.form.value).subscribe( data =>{
        console.log(this.form.value)
        this.id = data;
        this.form.value.user.map(userStory =>{
          let idUserStory;
          this.projet.addUserStory(userStory.description, this.id).subscribe( data =>{
            idUserStory = data;
            userStory.tasks.map( task =>{
              this.projet.addTasks(idUserStory, task).subscribe()
            })
          })
        })
        })
    }

  
  }
  addUserStory(){
    this.user.push(this.ques());
  }
  deleteUserStory(index: number){
    
  }
  addTask(){
  this.tasks.push(this.task());
  }
  deleteTask(){

  }
}
