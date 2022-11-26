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
  constructor(private httpClient:HttpClient) { }

  getData(){
    if(this.membersList.value){
      this.httpClient.get<Results[]>(this.dataUrl).subscribe((data)=>{
        this.membersList.next(data);
        console.log(data);
      });
    }
    return this.membersList;
  }

  deleteMember(item:Results){
    let newMemberList = this.membersList.value.filter((member)=>{
      return member.id!==item.id;
    });
    this.membersList.next(newMemberList);
  }

  editMember(item:Results){

  }
}
