import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //import router
import { NgForm } from '@angular/forms';
import { GithubService } from 'src/app/services/github.service';
import { GithubUserInfo } from 'src/app/models/githubUserInfo';
import { GithubUserRepos } from 'src/app/models/githubUserRepos';
import { convertDateToLocaleString } from 'src/helpers';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  userInfo = {} as GithubUserInfo;
  repos: GithubUserRepos[] = []
  reposStarred: GithubUserRepos[] = []
  githubUser: string = '';
  convertDateToLocaleString = convertDateToLocaleString;

  constructor(
    public router: Router,
    private githubService: GithubService
  ) { }

  ngOnInit(): void {
    this.githubUser = this.router.url.slice(1);
    if(this.githubUser) { 
      this.userInfo.name = this.githubUser
      this.getUserInfo(this.githubUser)
    } 
    
  }

  onSubmit(f: NgForm) {
    this.githubUser = f.form.value.githubUserForm;
    this.router.navigate([`${this.githubUser}`])
    this.getUserInfo(this.githubUser)
    // console.log(f.form.value.githubUserForm)
  }

  
  public getUserInfo(user: string) {
    if(user) {
      this.githubService.getUserInfo(user).subscribe((user: any) => {
        this.userInfo = user;

      });
    }
  }

  public getUserRepos() {
    this.githubService.getUserRepos('AdrianaSaty').subscribe((repos: any) => {
      this.repos = repos;
    });
  }
  
  public getUserReposStarred() {
    this.githubService.getReposStarred('AdrianaSaty').subscribe((repos: any) => {
      this.reposStarred = repos;
    });
  }
}
