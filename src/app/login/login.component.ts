import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  eye=true
  passfun=(event:any)=>{
    event.target.value=event.target.value.replace(/\s/g,'')

  }

  mailfun=(event:any)=>{
    event.target.value=event.target.value.replace(/\s/g,'')
  }
  eyeChange=()=>{

    this.eye=!this.eye

  }
  fun=()=>{
    console.log('click')
  }
}
