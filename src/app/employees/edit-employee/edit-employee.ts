import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../services/employee';

@Component({
  selector: 'app-edit-employee',
  imports: [],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css',
})
export class EditEmployee {
  employee:any;

  constructor(
  private route: ActivatedRoute,
  private empService: Employee
) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    // this.empService.getEmployeeById(+id).subscribe((res:any) => {
    //   this.employee = res;
    // });
  }
}
}