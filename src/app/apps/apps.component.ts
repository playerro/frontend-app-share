import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ToolbarService} from '../services/toolbar.service';
import {App, AppSort} from '../models/app-type';
import {AppService} from '../services/app.service';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'domain', 'comment', 'created', 'source', 'status', 'action'];
  dataSource: MatTableDataSource<App>;

  data: App[] = [];
  resultLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  siteUrl = environment.siteUrl;
  staticUrl = environment.staticUrl;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private toolbarService: ToolbarService,
              private appService: AppService,
              private snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.appService.getSelfApps(this.createSort());
        }),
        map((data: string) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          const apps = JSON.parse(data);
          console.log(apps);
          this.resultLength = apps.length;

          this.dataSource = new MatTableDataSource(apps);
          return apps;
        }),
        catchError((err) => {
          this.isLoadingResults = false;

          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => this.data = data);
  }

  ngOnInit() {
    this.toolbarService.setTitle('Мои приложения');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createSort(): AppSort {
    return {
      sort: this.sort.active,
      order: this.sort.direction,
      page: this.paginator.pageIndex
    };
  }

  getAppLink(application: App) {
    if (application.isStatic) {
      return this.staticUrl + '/' + application.domain;
    }
    return application.domain + '.' + this.siteUrl;
  }

  deleteApp(app: App, index: number) {
    this.appService.deleteApp(app).subscribe((success) => {
      this.snackBar.open('Приложение удаляется', 'Закрыть', {duration: 3000});
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }, error => {
      this.snackBar.open('Произошла ошибка при удалении приложения', 'Закрыть', {duration: 3000});
      console.log(error);
    });
  }

}
