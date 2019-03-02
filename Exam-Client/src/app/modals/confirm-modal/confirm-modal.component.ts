import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Output() onFinish = new EventEmitter();
  constructor(config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit() {
  }

  close() {
    this.modalService.dismissAll();
  }

  finishTest() {
    this.onFinish.emit();
  }
}
