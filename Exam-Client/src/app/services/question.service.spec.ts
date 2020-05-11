import { QuestionService } from 'src/app/services/question.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { eQuestionType } from '../enums/questiontype';

describe('#getQuestionById', () => {
    it('returned Observable should match the right data', () => {
        let questionService: QuestionService;
        let httpTestingController: HttpTestingController;
        const mockQuestions = [
            {
                ID: 1,
                Field: 'field',
                QuestionType: eQuestionType.SingleChoice,
                Title: 'title',
                Active: true,
                QuestionContent: 'content',
                LastUpdate: Date.now,
                PossibleAnswers: null,
                Layout: null,
                tags: 'tages',
                NumOfTests: 0
            },
            {
                ID: 2,
                Field: 'field',
                QuestionType: eQuestionType.SingleChoice,
                Title: 'title',
                Active: true,
                QuestionContent: 'content',
                LastUpdate: Date.now,
                PossibleAnswers: null,
                Layout: null,
                tags: 'tages',
                NumOfTests: 0
            }
        ];

        questionService.getQuestionById(1)
            .subscribe(questionesData => {
                expect(questionesData[0].Title).toEqual('title');
            });

        const req = httpTestingController.expectOne(
            'http://localhost:8089/topics/1/courses'
        );

        req.flush(mockQuestions);
    });
});