import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.sass']
})
export class TransactionListComponent implements OnInit {

  transactions: any[] = [];
  startDate: string = '';
  endDate: string = '';
  selectedStatus: string = '';
  showSelectDateMessage: boolean = true;

  constructor(private transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {

  }

  onTransactionClick(id: string): void {
    this.router.navigate(['/transaction', id]);
  }

  applyFilters(): void {
    this.applyDateFilters();
  }

  applyDateFilters(): void {
    if (this.startDate && this.endDate) {
      if (!this.selectedStatus.length) {
        this.transactionService.getTransactionsByDateRange(this.startDate, this.endDate).subscribe(data => {
          this.transactions = data;
          this.showSelectDateMessage = false;
        });
      } else {
        this.transactionService.getTransactionsByDateRange(this.startDate, this.endDate, this.selectedStatus).subscribe(data => {
          this.transactions = data;
          this.showSelectDateMessage = false;
        });
      }
    }
  }
}
