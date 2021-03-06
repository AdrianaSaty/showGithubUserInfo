import { Component } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(public loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loadingService.isLoading.next(false);
  }
}
