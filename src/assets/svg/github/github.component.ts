import { Component } from '@angular/core';

@Component({
  selector: 'app-github-svg',
  templateUrl: './github.component.svg',
})
export class GithubSvgComponent {
  fillColor = '#673ab7';
  colors = ['white', 'black', '#673ab79']

  changeColor() {
    const index = Math.floor(Math.random() * this.colors.length);
    this.fillColor = this.colors[index];
  }
}