import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //import router
import { NgForm } from '@angular/forms';
import { GithubService } from 'src/app/services/github.service';
import { GithubUserInfo } from 'src/app/models/githubUserInfo';
import { GithubUserRepos } from 'src/app/models/githubUserRepos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  user = {} as GithubUserInfo;
  repo = {} as GithubUserRepos;
  repos: GithubUserRepos[] = []

  constructor(
    public router: Router,
    private githubService: GithubService
  ) { }

  ngOnInit(): void {
    const githubUserRouter: string = this.router.url.slice(1);
  }

  onSubmit(f: NgForm) {
    console.log(f.form.value.githubUserForm)
  }

  public getUserInfo() {
    this.githubService.getUserInfo('AdrianaSaty').subscribe((user: any) => {
      this.user = user;
    });
  }

  public getUserRepos() {
    this.githubService.getUserRepos('AdrianaSaty').subscribe((repos: any) => {
      this.repos = repos;
      console.log(this.repos[0].name)
    });
  }
}
