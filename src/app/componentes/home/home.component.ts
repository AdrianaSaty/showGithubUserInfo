import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //import router
import { NgForm } from '@angular/forms';
import { GithubService } from 'src/app/services/github.service';
import { GithubUserInfoResponse } from 'src/app/models/api/githubUserInfoResponse';
import { GithubUserReposResponse } from 'src/app/models/api/githubUserReposResponse';
import { convertDateToLocaleString, convertNumberToPercentage } from 'src/helpers';
import { GithubUserRepoLanguageResponse } from 'src/app/models/api/githubUserRepoLanguageResponse';
import { GithubUserReposStarredResponse } from 'src/app/models/api/githubUserReposStarredResponse';
import { ChartData } from 'src/app/models/pages/home';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public convertDateToLocaleString = convertDateToLocaleString;
  public userInfo = {} as GithubUserInfoResponse;
  public repos: GithubUserReposResponse[] = [];
  public reposLanguage: any[] = [];
  public reposStarred: GithubUserReposStarredResponse[] = [];
  public githubUser: string = '';
  public showUserRepos: boolean = false;
  public userReposButtonText: string = 'Show User Repos';
  public showUserReposStarred: boolean = false;
  public userReposStarredText: string = 'Show Starred Repos';
  public calledGetUserRepos: boolean = false;
  public calledGetUserReposStarred: boolean = false;
  public chartData: ChartData[] = []
  public showChartData: boolean[] = []

  constructor(
    public router: Router,
    private githubService: GithubService
  ) { }

  ngOnInit(): void {
    this.githubUser = this.router.url.slice(1);
    if (this.githubUser) {
      this.userInfo.name = this.githubUser
      this.getUserInfo(this.githubUser)
    }
  }

  onSubmit(f: NgForm) {
    this.githubUser = f.form.value.githubUserForm;
    this.cleanReposInfo();
    this.router.navigate([`${this.githubUser}`])
    this.getUserInfo(this.githubUser)
  }


  public getUserInfo(user: string) {
    if (user) {
      this.githubService.getUserInfo(user).subscribe((user: GithubUserInfoResponse) => {
        this.userInfo = user;
      });
    }
  }

  public getUserRepos() {
    if (!this.calledGetUserRepos) {
      this.githubService.getUserRepos(this.githubUser).pipe(
        switchMap(repos => {
          repos.forEach((element: GithubUserReposResponse, index: number) => {
            this.getUserReposLanguages(element.name, index);
          });
          return this.repos = repos;
        })
      ).subscribe()
    }
    this.calledGetUserRepos = true;
    this.showUserRepos = !this.showUserRepos;
    this.toggleButtonText();
  }

  public getUserReposLanguages(repo: string, index: number) {
    this.githubService.getUserRepoLanguage(this.githubUser, repo).subscribe((languages: GithubUserRepoLanguageResponse) => {
      if (Object.keys(languages).length !== 0) {
        this.reposLanguage.push(languages);
        this.showChartData.push(true);
        let totalNumberOfBytesCode: number = this.reposLanguage[index][Object.keys(this.reposLanguage[index])[0]] + this.reposLanguage[index][Object.keys(this.reposLanguage[index])[1]] + this.reposLanguage[index][Object.keys(this.reposLanguage[index])[2]];
        let bytesCodeLanguage1: number = this.reposLanguage[index][Object.keys(this.reposLanguage[index])[0]];
        let bytesCodeLanguage2: number = this.reposLanguage[index][Object.keys(this.reposLanguage[index])[1]];
        let bytesCodeLanguage3: number = this.reposLanguage[index][Object.keys(this.reposLanguage[index])[2]];
        this.chartData.push(
          {
            language1: Object.keys(this.reposLanguage[index])[0],
            language2: Object.keys(this.reposLanguage[index])[1],
            language3: Object.keys(this.reposLanguage[index])[2],
            percentage1: `${convertNumberToPercentage(bytesCodeLanguage1 / totalNumberOfBytesCode)}%`,
            percentage2: `${convertNumberToPercentage(bytesCodeLanguage2 / totalNumberOfBytesCode)}%`,
            percentage3: `${convertNumberToPercentage(bytesCodeLanguage3 / totalNumberOfBytesCode)}%`,
          }
        )
      } else {
        this.showChartData.push(false);
      }
    })
  }

  public getUserReposStarred() {
    if (!this.calledGetUserReposStarred) {
      this.githubService.getReposStarred(this.userInfo.login).subscribe((repos: GithubUserReposStarredResponse[]) => {
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
    this.repos = [];
    this.reposLanguage = [];
    this.chartData = [];
    this.showChartData = [];
    this.toggleButtonText();
  }
}
