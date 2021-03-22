import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //import router
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  user = {} as User;

  constructor(
    public router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const githubUserRouter: string = this.router.url.slice(1);
  }

  onSubmit(f: NgForm) {
    console.log(f.form.value.githubUserForm)
  }

  public getUserInfo() {
    this.userService.getUserInfo('AdrianaSaty').subscribe((user: any) => {
      this.user = user;
    });
  }

}
