import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient :HttpClient ) { }

  postdata(data:any):Observable<any>{
       return this.httpClient.post<any>("http://localhost:3000/posts",data)
        .pipe(map((res:any)=>{
          return res
        }))
        
  }

  getData():Observable<any>{
    return this.httpClient.get<any>("http://localhost:3000/posts")
        .pipe(map((res:any)=>{
          return res
        }))
  }

  deleteDataById(id: number): Observable<any> {
   
    return this.httpClient.delete<any>(`http://localhost:3000/posts/${id}`)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  updateData(id: number, newData: any): Observable<any> {
   
    return this.httpClient.put<any>(`http://localhost:3000/posts/${id}`, newData)
    
    .pipe(map((res:any)=>{
      return res
    }))

   
  }

  postExam(data:any){
    return this.httpClient.post<any>("http://localhost:3000/exam",data)
    .pipe(map((res:any)=>{
      return res
    }))
    
  }

  getExam(){
    return this.httpClient.get<any>("http://localhost:3000/exam")
        .pipe(map((res:any)=>{
          return res
        }))
  }

  

}
