import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  subjectNotifier: Subject<null> = new Subject<null>();
  eventEmitterNotifier: EventEmitter<null> = new EventEmitter();

 
  constructor() { }
 
  notifyAboutChange() {
    this.eventEmitterNotifier.emit();
  }
}
