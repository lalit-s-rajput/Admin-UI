import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Results} from '../../core/interface/results';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  dataUrl = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
  membersList = new BehaviorSubject<Results[]>([]);
  filteredList = new BehaviorSubject<Results[]>([]);
  constructor(private httpClient:HttpClient) { }

  getData(){
    if(!this.filteredList.value.length){
      this.httpClient.get<Results[]>(this.dataUrl).subscribe((data)=>{
        this.membersList.next(data);
        this.filteredList.next(data);
      });
    }
    return this.filteredList;
  }

  deleteMember(items:string[]){
    let newMemberList = this.filteredList.value.filter((member)=>{
       return !items.includes(member.id);
    });
    // let newMemberList = this.filteredList.value.filter((member)=>{
    //   return member.id!==item.id;
    // });
    this.filteredList.next(newMemberList);
  }

  editMember(item:Results){
    let itemIndex = this.filteredList.value.findIndex((obj)=>{
      return obj.id == item.id;
    });
    this.filteredList.value[itemIndex] = item;
    this.filteredList.next(this.filteredList.value);
  }
  filterData(key:string){
    if(key.length){
      let newData = this.membersList.value.filter((member)=>{
        return member.email.toLowerCase().includes(key) || member.name.toLowerCase().includes(key) || member.role.toLowerCase().includes(key);
      });
      this.filteredList.next(newData);
    }else{
      this.filteredList.next(this.membersList.value);
    }
  }
}
