import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //import router

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router) { 
  }

  ngOnInit(): void {
    const githubUser: string = this.router.url.slice(1);

  }

}
