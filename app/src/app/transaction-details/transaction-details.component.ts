// import { Component, Input, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { TransactionService } from '../transaction.service';

// @Component({
//   selector: 'app-transaction-details',
//   templateUrl: './transaction-details.component.html',
//   styleUrls: ['./transaction-details.component.sass']
// })
// export class TransactionDetailsComponent implements OnInit {

//   transaction: any;

//   constructor(private route: ActivatedRoute, private transactionService: TransactionService) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');

//     if(id!=null){
//       this.transactionService.getTransactionById(id).subscribe(data => {
//         this.transaction = data;
//       });
//     }
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.sass']
})
export class TransactionDetailsComponent implements OnInit {

  transactionForm!: FormGroup;
  transaction: any;
  id:string | null='';
  updateStatus:boolean=false

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id=id;

    if (id) {
      this.transactionService.getTransactionById(id).subscribe(data => {
        this.transaction = data;
        this.initForm();
      });
    }
  }

  initForm(): void {
    this.transactionForm = this.fb.group({
      id: [{ value: this.transaction.id, disabled: true }],
      Date: [{ value: this.transaction.Date, disabled: true }],
      comments: [this.transaction.comments]
    });
  }

  onSubmit(): void {
    const updatedComments = this.transactionForm.value.comments;
    this.transactionService.updateComment(this.id!,updatedComments).subscribe(data=>{
      this.updateStatus=true;
    });
  }

}
