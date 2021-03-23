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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public convertDateToLocaleString = convertDateToLocaleString;
  public userInfo = {} as GithubUserInfoResponse ;
  public repos: GithubUserReposResponse[] = [];
  public reposLanguage: any[] = []; // todo
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
    // MOCK !!!!!
    this.repos = [
      {
        "id": 194315895,
        "node_id": "MDEwOlJlcG9zaXRvcnkxOTQzMTU4OTU=",
        "name": "face_recognition",
        "full_name": "milenaframirez/face_recognition",
        "private": false,
        "owner": {
          "login": "milenaframirez",
          "id": 22173095,
          "node_id": "MDQ6VXNlcjIyMTczMDk1",
          "avatar_url": "https://avatars.githubusercontent.com/u/22173095?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/milenaframirez",
          "html_url": "https://github.com/milenaframirez",
          "followers_url": "https://api.github.com/users/milenaframirez/followers",
          "following_url": "https://api.github.com/users/milenaframirez/following{/other_user}",
          "gists_url": "https://api.github.com/users/milenaframirez/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/milenaframirez/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/milenaframirez/subscriptions",
          "organizations_url": "https://api.github.com/users/milenaframirez/orgs",
          "repos_url": "https://api.github.com/users/milenaframirez/repos",
          "events_url": "https://api.github.com/users/milenaframirez/events{/privacy}",
          "received_events_url": "https://api.github.com/users/milenaframirez/received_events",
          "type": "User",
          "site_admin": false
        },
        "html_url": "https://github.com/milenaframirez/face_recognition",
        "description": "The world's simplest facial recognition api for Python and the command line",
        "fork": true,
        "url": "https://api.github.com/repos/milenaframirez/face_recognition",
        "forks_url": "https://api.github.com/repos/milenaframirez/face_recognition/forks",
        "keys_url": "https://api.github.com/repos/milenaframirez/face_recognition/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/milenaframirez/face_recognition/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/milenaframirez/face_recognition/teams",
        "hooks_url": "https://api.github.com/repos/milenaframirez/face_recognition/hooks",
        "issue_events_url": "https://api.github.com/repos/milenaframirez/face_recognition/issues/events{/number}",
        "events_url": "https://api.github.com/repos/milenaframirez/face_recognition/events",
        "assignees_url": "https://api.github.com/repos/milenaframirez/face_recognition/assignees{/user}",
        "branches_url": "https://api.github.com/repos/milenaframirez/face_recognition/branches{/branch}",
        "tags_url": "https://api.github.com/repos/milenaframirez/face_recognition/tags",
        "blobs_url": "https://api.github.com/repos/milenaframirez/face_recognition/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/milenaframirez/face_recognition/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/milenaframirez/face_recognition/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/milenaframirez/face_recognition/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/milenaframirez/face_recognition/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/milenaframirez/face_recognition/languages",
        "stargazers_url": "https://api.github.com/repos/milenaframirez/face_recognition/stargazers",
        "contributors_url": "https://api.github.com/repos/milenaframirez/face_recognition/contributors",
        "subscribers_url": "https://api.github.com/repos/milenaframirez/face_recognition/subscribers",
        "subscription_url": "https://api.github.com/repos/milenaframirez/face_recognition/subscription",
        "commits_url": "https://api.github.com/repos/milenaframirez/face_recognition/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/milenaframirez/face_recognition/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/milenaframirez/face_recognition/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/milenaframirez/face_recognition/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/milenaframirez/face_recognition/contents/{+path}",
        "compare_url": "https://api.github.com/repos/milenaframirez/face_recognition/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/milenaframirez/face_recognition/merges",
        "archive_url": "https://api.github.com/repos/milenaframirez/face_recognition/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/milenaframirez/face_recognition/downloads",
        "issues_url": "https://api.github.com/repos/milenaframirez/face_recognition/issues{/number}",
        "pulls_url": "https://api.github.com/repos/milenaframirez/face_recognition/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/milenaframirez/face_recognition/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/milenaframirez/face_recognition/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/milenaframirez/face_recognition/labels{/name}",
        "releases_url": "https://api.github.com/repos/milenaframirez/face_recognition/releases{/id}",
        "deployments_url": "https://api.github.com/repos/milenaframirez/face_recognition/deployments",
        "created_at": "2019-06-28T18:14:22Z",
        "updated_at": "2019-06-28T18:14:25Z",
        "pushed_at": "2019-06-28T17:44:28Z",
        "git_url": "git://github.com/milenaframirez/face_recognition.git",
        "ssh_url": "git@github.com:milenaframirez/face_recognition.git",
        "clone_url": "https://github.com/milenaframirez/face_recognition.git",
        "svn_url": "https://github.com/milenaframirez/face_recognition",
        "homepage": "",
        "size": 103846,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "Python",
        "has_issues": false,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 0,
        "license": {
          "key": "mit",
          "name": "MIT License",
          "spdx_id": "MIT",
          "url": "https://api.github.com/licenses/mit",
          "node_id": "MDc6TGljZW5zZTEz"
        },
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master"
      },
      {
        "id": 322149301,
        "node_id": "MDEwOlJlcG9zaXRvcnkzMjIxNDkzMDE=",
        "name": "milenaframirez",
        "full_name": "milenaframirez/milenaframirez",
        "private": false,
        "owner": {
          "login": "milenaframirez",
          "id": 22173095,
          "node_id": "MDQ6VXNlcjIyMTczMDk1",
          "avatar_url": "https://avatars.githubusercontent.com/u/22173095?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/milenaframirez",
          "html_url": "https://github.com/milenaframirez",
          "followers_url": "https://api.github.com/users/milenaframirez/followers",
          "following_url": "https://api.github.com/users/milenaframirez/following{/other_user}",
          "gists_url": "https://api.github.com/users/milenaframirez/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/milenaframirez/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/milenaframirez/subscriptions",
          "organizations_url": "https://api.github.com/users/milenaframirez/orgs",
          "repos_url": "https://api.github.com/users/milenaframirez/repos",
          "events_url": "https://api.github.com/users/milenaframirez/events{/privacy}",
          "received_events_url": "https://api.github.com/users/milenaframirez/received_events",
          "type": "User",
          "site_admin": false
        },
        "html_url": "https://github.com/milenaframirez/milenaframirez",
        "description": null,
        "fork": false,
        "url": "https://api.github.com/repos/milenaframirez/milenaframirez",
        "forks_url": "https://api.github.com/repos/milenaframirez/milenaframirez/forks",
        "keys_url": "https://api.github.com/repos/milenaframirez/milenaframirez/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/milenaframirez/milenaframirez/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/milenaframirez/milenaframirez/teams",
        "hooks_url": "https://api.github.com/repos/milenaframirez/milenaframirez/hooks",
        "issue_events_url": "https://api.github.com/repos/milenaframirez/milenaframirez/issues/events{/number}",
        "events_url": "https://api.github.com/repos/milenaframirez/milenaframirez/events",
        "assignees_url": "https://api.github.com/repos/milenaframirez/milenaframirez/assignees{/user}",
        "branches_url": "https://api.github.com/repos/milenaframirez/milenaframirez/branches{/branch}",
        "tags_url": "https://api.github.com/repos/milenaframirez/milenaframirez/tags",
        "blobs_url": "https://api.github.com/repos/milenaframirez/milenaframirez/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/milenaframirez/milenaframirez/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/milenaframirez/milenaframirez/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/milenaframirez/milenaframirez/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/milenaframirez/milenaframirez/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/milenaframirez/milenaframirez/languages",
        "stargazers_url": "https://api.github.com/repos/milenaframirez/milenaframirez/stargazers",
        "contributors_url": "https://api.github.com/repos/milenaframirez/milenaframirez/contributors",
        "subscribers_url": "https://api.github.com/repos/milenaframirez/milenaframirez/subscribers",
        "subscription_url": "https://api.github.com/repos/milenaframirez/milenaframirez/subscription",
        "commits_url": "https://api.github.com/repos/milenaframirez/milenaframirez/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/milenaframirez/milenaframirez/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/milenaframirez/milenaframirez/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/milenaframirez/milenaframirez/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/milenaframirez/milenaframirez/contents/{+path}",
        "compare_url": "https://api.github.com/repos/milenaframirez/milenaframirez/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/milenaframirez/milenaframirez/merges",
        "archive_url": "https://api.github.com/repos/milenaframirez/milenaframirez/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/milenaframirez/milenaframirez/downloads",
        "issues_url": "https://api.github.com/repos/milenaframirez/milenaframirez/issues{/number}",
        "pulls_url": "https://api.github.com/repos/milenaframirez/milenaframirez/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/milenaframirez/milenaframirez/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/milenaframirez/milenaframirez/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/milenaframirez/milenaframirez/labels{/name}",
        "releases_url": "https://api.github.com/repos/milenaframirez/milenaframirez/releases{/id}",
        "deployments_url": "https://api.github.com/repos/milenaframirez/milenaframirez/deployments",
        "created_at": "2020-12-17T01:46:41Z",
        "updated_at": "2020-12-17T03:01:11Z",
        "pushed_at": "2020-12-17T03:01:08Z",
        "git_url": "git://github.com/milenaframirez/milenaframirez.git",
        "ssh_url": "git@github.com:milenaframirez/milenaframirez.git",
        "clone_url": "https://github.com/milenaframirez/milenaframirez.git",
        "svn_url": "https://github.com/milenaframirez/milenaframirez",
        "homepage": null,
        "size": 383,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 0,
        "license": null,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "main"
      }
    ]
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
      this.githubService.getUserRepos(this.githubUser).subscribe((repos: GithubUserReposResponse[]) => {
        this.repos = repos;
      });

      // como chamar isso assincrono?
      this.repos.forEach((element: GithubUserReposResponse, index: number) => {
        this.getUserReposLanguages(element.name, index);
      });
    }

    console.log('repos', this.repos)
    console.log('reposLanguage', this.reposLanguage)

    this.calledGetUserRepos = true;
    this.showUserRepos = !this.showUserRepos;
    this.toggleButtonText();
  }

  public getUserReposLanguages(repo: string, index: number) {
    this.githubService.getUserRepoLanguage(this.githubUser, repo).subscribe((languages: GithubUserRepoLanguageResponse) => {
      if(Object.keys(languages).length !== 0) {
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
            percentage1: `${convertNumberToPercentage(bytesCodeLanguage1/totalNumberOfBytesCode)}%`,
            percentage2: `${convertNumberToPercentage(bytesCodeLanguage2/totalNumberOfBytesCode)}%`,
            percentage3: `${convertNumberToPercentage(bytesCodeLanguage3/totalNumberOfBytesCode)}%`,
          }
          )
      } else {
        this.showChartData.push(false);
      }

      console.log(this.chartData)
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
