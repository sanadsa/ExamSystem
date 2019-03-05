import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'es-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  field: string;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.field = params.get('field');
    })
  }

  public navToExamReport() {
    this.router.navigate(["/examReport", { field: this.field }])
  }

  public navToMenu() {
    this.router.navigate(["/mainmenu"]);
  }

}
