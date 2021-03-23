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
        retry(2),
        catchError(this.handleError)
      )
  }

  getUserRepos(user: string): Observable<GithubUserReposResponse[]> {
    return this.httpClient.get<GithubUserReposResponse[]>(`${this.url}/users/${user}/repos`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getUserRepoLanguage(user: string, repo: string): Observable<GithubUserRepoLanguageResponse> {
    return this.httpClient.get<GithubUserRepoLanguageResponse>(`${this.url}/repos/${user}/${repo}/languages`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  getReposStarred(user: string): Observable<GithubUserReposStarredResponse[]> {
    return this.httpClient.get<GithubUserReposStarredResponse[]>(`${this.url}/users/${user}/starred`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
