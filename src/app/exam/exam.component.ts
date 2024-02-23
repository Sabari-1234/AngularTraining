import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';

import { ExamchartComponent } from '../examchart/examchart.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent {
  @ViewChild(ExamchartComponent) examChartComponent:
    | ExamchartComponent
    | undefined;

  constructor(private api: ApiService) {
    this.examChartComponent=undefined
  }
  count = 0;
  QandA = [
    {
      qId: 'question1',
      q: 'What is the primary role of a network administrator?',
      options: [
        'Managing and maintaining network infrastructure',
        'Developing mobile applications',
      ],
    },
    {
      qId: 'question2',
      q: 'Which programming language is commonly used for web development?',
      options: ['Java', 'JavaScript'],
    },
    {
      qId: 'question3',
      q: 'What is the main responsibility of a database administrator?',
      options: ['Managing and securing databases', 'Designing user interfaces'],
    },
    {
      qId: 'question4',
      q: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High-level Text Machine Language',
      ],
    },
    {
      qId: 'question5',
      q: 'What is the role of a cybersecurity analyst?',
      options: [
        'Protecting computer systems and networks from attacks',
        'Writing technical documentation',
      ],
    },
  ];

  sub = (data: any, form3: any) => {
    // this.api.postExam()

    let count1 = 0,
      count2 = 0,
      count3 = 0,
      count4 = 0,
      count5 = 0;
    if (data.question1 == 'Managing and maintaining network infrastructure') {
      this.count += 1;
      count1 = 1;
    }

    if (data.question2 == 'JavaScript') {
      this.count += 1;
      count2 = 1;
    }
    if (data.question3 == 'Managing and securing databases') {
      this.count += 1;
      count3 = 1;
    }
    if (data.question4 == 'Hyper Text Markup Language') {
      this.count += 1;
      count4 = 1;
    }
    if (
      data.question5 == 'Protecting computer systems and networks from attacks'
    ) {
      this.count += 1;
      count5 = 1;
    }

    this.api
      .postExam(
        JSON.stringify({
          q1: count1,
          q2: count2,
          q3: count3,
          q4: count4,
          q5: count5,
        })
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );

    alert(`score of ${data.name} is ${this.count} out of 5`);

    form3.reset();
    this.count = 0;

    this.examChartComponent?.ngOnInit();
  };
}
