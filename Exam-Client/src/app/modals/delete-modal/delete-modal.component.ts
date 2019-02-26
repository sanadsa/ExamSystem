import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'es-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @Input() questionId: number;
  @Output() onDeleteQuestion: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  public open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }

  public deleteQuestion(questionId) {
    this.onDeleteQuestion.emit(questionId);
    this.modalService.dismissAll();
  }

}
