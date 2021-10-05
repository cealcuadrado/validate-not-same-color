import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.toastr.success("Hola, mundo!");
  }
}
