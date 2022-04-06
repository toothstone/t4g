import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

export interface Datum {
  department: string;
  description: string;
  datasets: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private http: HttpClient
  ) {}

  dataSource!: MatTableDataSource<Datum>;

  title = 'datasets-dashboard';
  columnsToDisplay = ["department", "description", "datasets"]
  
  ngOnInit() {
    this.getDataSets()
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
      });
  }
  getDataSets() {
    return this.http.get<Datum[]>('https://raw.githubusercontent.com/tech4germany/coding-challenge/main/backend-response.json');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
