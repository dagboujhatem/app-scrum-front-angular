import { Project } from './models/project';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient,  private tokenStorage:TokenStorageService) { }
  URL1 = 'http://localhost:9000/api/project/';
  URL2 = 'http://localhost:9000/userStory/';
  URL3 = 'http://localhost:9000/taches/';

  userConnecter = this.tokenStorage.getUser();
  usernameConnecter = this.userConnecter.username;

  getProjects(): Observable<any>{
    return this.http.get(`${this.URL1}` + 'getAllProjects' + '/'+ this.usernameConnecter)
  }

  addProject(project: Project): Observable<any>{
    return this.http.post(`${this.URL1}` + 'add-project' + '/' + this.usernameConnecter, project)
  }
  addUserStory(userStory, idProject) : Observable<any>{
    userStory = {description:userStory}
    return this.http.post(`${this.URL2}` + 'addUserStory' + '/' + idProject, userStory)
  }
  addTasks (id, task): Observable<any>{
    task = {title :task.task,
            content : "",
            state : "todo",
    }
    return this.http.post(`${this.URL3}` + 'add' + '/' + id , task, httpOptions)
  }
}
