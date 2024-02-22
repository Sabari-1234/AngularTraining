import { Component } from '@angular/core';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {
 total:Number=0
 constructor( private api:ApiService){}

 
 submit=(data:any)=>{
  console.log(data.tamil)

  
  const total = Number(data.tamil) + Number(data.english) + Number(data.maths) + Number(data.science) + Number(data.social);
  this.api.postdata(JSON.stringify({...data,totalMark:total})).subscribe((res:any)=>{

      console.log(res)
      alert('data added successfully')
    },
    (err:any)=>{
      console.error(err)
      alert('something went wrong')
    })
    
  
 }

}
