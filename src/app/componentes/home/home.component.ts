import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //import router
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router
    ) {
  }

  ngOnInit(): void {
    const githubUserRouter: string = this.router.url.slice(1);
  }

  onSubmit(f: NgForm) {
    console.log(f.form.value.githubUserForm)
  }

}
