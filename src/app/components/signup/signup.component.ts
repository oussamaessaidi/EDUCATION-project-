import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
    test:Boolean=false;
    mesgError:string;
    path:any;
    isDisplayed:boolean=true
    isSelected:boolean;
    title:string="Add User";
    user:any={};
    userId:any;
    imagePreview:any;
    constructor(private formBuilder :FormBuilder,
      private userService:UserService,
      private router:Router ,
      private activatedRoute:ActivatedRoute) { }
  
    ngOnInit() {
   
     
     
   
      this.path=this.router.url;
     console.log("here my path", this.path)
    
      
       
       
        if (this.path=="/signup/teacher") {
          this.signupForm=this.formBuilder.group({
            firstName:['',[Validators.required,Validators.minLength(3)]],
            lastName:['',[Validators.required,Validators.minLength(4)]],
            email:['',[Validators.required,Validators.email]],
            password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]],
            cin:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
            tel:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
            gender:['',[Validators.required]],
            specialite:['',[Validators.required]],
            role:['teacher'],
            img:[''],
        
          })
          
        } else if((this.path=="/signup/student")) {
          this.signupForm=this.formBuilder.group({
            firstName:['',[Validators.required,Validators.minLength(3)]],
            lastName:['',[Validators.required,Validators.minLength(4)]],
            email:['',[Validators.required,Validators.email]],
            password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(12)]],
            cin:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
            tel:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
            gender:['',[Validators.required]],
            specialite:['',[Validators.required]],
            role:['student'],
            img:[''],
        
          })
          this.isDisplayed=false;
        }
        
              // Recuperer l id mil path
              this.userId=this.activatedRoute.snapshot.paramMap.get("id");
              if (this.userId) {
                this.title="Edit Match";
                this.userService.getUserById(this.userId).subscribe((data) => {
                 this.user = data.user;
               }
               );
             }
           

     
    }

    
  
    signup(){
  
  console.log(this.signupForm.get('gender').value);
  
      console.log("signup clicked", this.signupForm.value);
      this.userService.signup(this.signupForm.value,this.signupForm.value.img).subscribe( (data) => {
        console.log('here data after signup', data);
      if(data.message=="0"){
        this.mesgError="email exist";
      }  else{
        //sinon navigate to login
        this.router.navigate(['login']);
  
       
  
      }
      
      
      });
    }
    onImageSelected(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      console.log("here file",file);
    
      this.signupForm.patchValue({ img: file });
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
      this.imagePreview = reader.result as string
      };
      reader.readAsDataURL(file);
    }
  
  }
  