import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import {LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
text: string;
id: string;
date: any;
isNew = true;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    // subcribe to the selectedLog observable
    this.logService.selectedLog.subscribe(log => {
      if (log.id !== null){
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }
  onSubmit(){
  // Check if it is a new log
    if (this.isNew){
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      };
      // Add log
      this.logService.addLog(newLog);
    }else{
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      };
      this.logService.updateLog(updLog);
    }
    this.clearState();
  }
  clearState(){
    this.isNew  = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.logService.clearState();
  }

generateId(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        // tslint:disable-next-line:no-bitwise one-variable-per-declaration
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }
}
