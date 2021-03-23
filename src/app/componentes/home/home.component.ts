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
  showUserRepos: boolean = false;
  userReposButtonText: string = 'Show User Repos';
  showUserReposStarred: boolean = false;
  userReposStarredText: string = 'Show Starred Repos';
  calledGetUserRepos: boolean = false;
  calledGetUserReposStarred: boolean = false;
  language1: string = 'Typescript';
  language2: string = 'CSS';
  language3: string = 'HTML';
  percentage1: string = '70%';
  percentage2: string = '20%';
  percentage3: string = '10%';

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
    this.cleanReposInfo();
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
    if(!this.calledGetUserRepos) {
      this.githubService.getUserRepos(this.userInfo.login).subscribe((repos: any) => {
        this.repos = repos;
      });
    }
    this.calledGetUserRepos = true;
    this.showUserRepos = !this.showUserRepos;
    this.toggleButtonText();
  }
  
  public getUserReposStarred() {
    if(!this.calledGetUserReposStarred) {
      this.githubService.getReposStarred(this.userInfo.login).subscribe((repos: any) => {
        this.reposStarred = repos;
      });
    }
    this.calledGetUserReposStarred = true;
    this.showUserReposStarred = !this.showUserReposStarred;
    this.toggleButtonText();
  }

  public toggleButtonText() {
    this.showUserRepos ? this.userReposButtonText = 'Hide User Repos' : this.userReposButtonText = 'Show User Repos';
    this.showUserReposStarred ? this.userReposStarredText = 'Hide Starred Repos' : this.userReposStarredText = 'Show Starred Repos';
  }

  public cleanReposInfo() {
    this.showUserRepos = false;
    this.showUserReposStarred = false;
    this.calledGetUserRepos = false;
    this.calledGetUserReposStarred = false;
    this.toggleButtonText();
  }
}
