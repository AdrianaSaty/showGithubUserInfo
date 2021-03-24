import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GithubUserInfoResponse } from '../models/api/githubUserInfoResponse';
import { GithubUserReposResponse } from '../models/api/githubUserReposResponse';
import { GithubUserRepoLanguageResponse } from '../models/api/githubUserRepoLanguageResponse';
import { GithubUserReposStarredResponse } from '../models/api/githubUserReposStarredResponse';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  url = 'https://api.github.com'; // api rest fake

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getUserInfo(user: string): Observable<GithubUserInfoResponse> {
    return this.httpClient.get<GithubUserInfoResponse>(`${this.url}/users/${user}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getUserRepos(user: string): Observable<GithubUserReposResponse[]> {
    return this.httpClient.get<GithubUserReposResponse[]>(`${this.url}/users/${user}/repos`)
      .pipe(
        catchError(this.handleError)
      )
  }

  getUserRepoLanguage(user: string, repo: string): Observable<GithubUserRepoLanguageResponse> {
    return this.httpClient.get<GithubUserRepoLanguageResponse>(`${this.url}/repos/${user}/${repo}/languages`)
      .pipe(
        catchError(this.handleError)
      )
  }


  getReposStarred(user: string): Observable<GithubUserReposStarredResponse[]> {
    return this.httpClient.get<GithubUserReposStarredResponse[]>(`${this.url}/users/${user}/starred`)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        alert('Please, check your internet connection!')
        break;
      case 500:
        alert("Sorry, we're having a problem communicating with our servers")
        break;
      default:
        alert(error.error.message)
        break;
    }
    return throwError(error);
  };


}
