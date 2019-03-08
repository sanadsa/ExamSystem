import { QuestionService } from 'src/app/services/question.service';
import { ConstantFields } from './../../helpers/common-constants';
import { Question } from './../../models/question';
import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Answer } from 'src/app/models/answer';
import { eAnswerLayout } from 'src/app/enums/answerlayout';

@Component({
  selector: 'question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css']
})
export class QuestionModalComponent implements OnInit {
  @Input() question: Question;
  @Input() answers: Array<Answer>;
  closeResult: string;
  constsFields: ConstantFields;
  answerLayout: eAnswerLayout;

  constructor(private modalService: NgbModal,
    private service: QuestionService) {
    this.answers = new Array<Answer>();
    this.constsFields = new ConstantFields();
  }

  ngOnInit() {
  }

  public open(content) {
    this.service.getAnswers(this.question.ID).subscribe(response => {
      this.answers = response;
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
