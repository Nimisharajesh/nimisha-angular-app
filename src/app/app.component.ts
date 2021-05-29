import { Component } from '@angular/core';
import { ApiService } from '../app/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchText: any = '';
  suggestions: any = [];
  companyList: any = [];
  griddata: any = '';

  constructor(private api: ApiService){}

  ngOnInit() {
    this.getCompanyList();
  } 
  getCompanyList(): void {
    this.api.getAll().subscribe(
      (res: any) => {
        this.companyList = res['data'];
      },
      (err: any) => {
        console.log(err)
      }
    );
  }


  fetchnames(val : any){
    if(val){
      this.suggestions = this.companyList.filter((item: any) => {return  item.name.toLowerCase().search(val.toLowerCase()) != -1})
    }else{
      this.suggestions = [];
    }
  }
  selectedItem(item: any){
    this.searchText = item.model;
    this.suggestions = [];
    if(item){
      this.api.getcompany(item.id).subscribe(
        (res: any) => {
          this.griddata = res;
        },
        (err: any) => {
          console.log(err)
        }
      );
    }
    
  }



}
