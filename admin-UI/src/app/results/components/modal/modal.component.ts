import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  _modalData:any;
  @Input() set modalData(value:any){
    this._modalData = value;
    this.createForm(this._modalData);
  };
  @Output() editedData = new EventEmitter();
  @Output() cancel = new EventEmitter();
  memberForm = this.fb.group({});
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  createForm(data:any){
    this.memberForm.addControl('name',this.fb.control(data.name,Validators.required));
    this.memberForm.addControl('email',this.fb.control(data.email,[Validators.required,Validators.email]));
    this.memberForm.addControl('role',this.fb.control(data.role,Validators.required));
  }
  emitCancel(){
    this.cancel.emit(true);
  }
  onSubmit(){
    this.editedData.emit(Object.assign({},{id:this._modalData.id,...this.memberForm.value}));
    this.emitCancel();
  }
}
