import { Component, OnInit } from '@angular/core';
import { Division } from '../models/subdivision';
import { NavegacionParametrosService } from '../Services/global/navegacion-parametros.service';

@Component({
  selector: 'app-dashboard-division',
  templateUrl: './dashboard-division.page.html',
  styleUrls: ['./dashboard-division.page.scss'],
})
export class DashboardDivisionPage implements OnInit {

  public division:Division
  constructor(
    private navParametrosService:NavegacionParametrosService
  ) {  
    this.division = new Division();
    if(this.navParametrosService.param instanceof Division){
      this.division = this.navParametrosService.param
    }
  }

  ngOnInit() {
  }
}
