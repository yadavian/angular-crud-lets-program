import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { EmployeeModel } from "./employee.model";
import { ApiService } from "../service/api.service";
import { DeviceTokenService } from '../service/device-token.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObject: EmployeeModel = new EmployeeModel();
  employeesData !: any;
  showBtnAdd: boolean = true;
  showBtnUpdate: boolean = true;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private deviceTokenService: DeviceTokenService) { }

  ngOnInit(): void {
    this.deviceTokenService.setDeviceToken("hiankityadav");
    this.formValue = this.formBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      phone: [''],
      salary: [''],
    })

    this.deviceTokenService.getDeviceToken()

    this.getAllEmployees()
  }

  onAddEmployee() {
    this.formValue.reset();
    this.showBtnAdd = true;
    this.showBtnUpdate = false;
  }

  click_postEmployeeDetails() {
    this.employeeModelObject.fname = this.formValue.value.fname;
    this.employeeModelObject.lname = this.formValue.value.lname;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.phone = this.formValue.value.phone;
    this.employeeModelObject.salary = this.formValue.value.salary;

    this.apiService.postEmployee(this.employeeModelObject).subscribe(res => {
      console.log(res);
      // alert("Employee Added.")
      this.formValue.reset();
      this.fn_close_model()
      this.getAllEmployees()
    }, error => {
      alert("error adding record.")
    })
  }

  getAllEmployees() {
    this.apiService.getEmployee().subscribe(res => {
      console.log(res);
      this.employeesData = res
    }, error => {
      alert("error getting record.")
    })
  }

  deleteEmployee(row: any) {
    this.apiService.deleteEmployee(row.id).subscribe(res => {
      console.log(res);
      this.getAllEmployees()
    }, error => {
      alert("error deleting record.")
    })
  }

  editEmployee(row: any) {
    this.showBtnAdd = false;
    this.showBtnUpdate = true;

    this.employeeModelObject.id = row.id;
    this.formValue.controls['fname'].setValue(row.fname);
    this.formValue.controls['lname'].setValue(row.lname);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployee() {
    this.employeeModelObject.fname = this.formValue.value.fname;
    this.employeeModelObject.lname = this.formValue.value.lname;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.phone = this.formValue.value.phone;
    this.employeeModelObject.salary = this.formValue.value.salary;
    this.apiService.updateEmployee(this.employeeModelObject, this.employeeModelObject.id).subscribe(res => {
      console.log(res)
      this.fn_close_model()
      this.getAllEmployees()
    }, error => {
      console.log('error editing record.')
    })
  }

  fn_close_model() {
    let btn_çancel = document.getElementById('btn_çancel')
    btn_çancel?.click();
  }

}
