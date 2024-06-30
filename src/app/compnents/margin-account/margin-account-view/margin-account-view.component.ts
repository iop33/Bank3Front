import {Component, OnInit} from '@angular/core';
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {AccountService} from "../../../services/account.service";
import {MarginAccount, TransactionDto} from "../../../models/models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-margin-account-view',
  templateUrl: './margin-account-view.component.html',
  styleUrls: ['./margin-account-view.component.css']
})
export class MarginAccountViewComponent implements OnInit{

  account = {} as MarginAccount;
  accountEmail = ''
  transactions = [] as TransactionDto[];

  constructor(private accountService: AccountService, private router: Router){
    //Mock podaci za racun, skloniti kada se doda ruta na beku
    // this.account = account

  }

  ngOnInit() {
    let tk = parseJson(atob(sessionStorage.getItem("token")!.split('.')[1]));
    this.accountEmail = tk.sub
    if (tk.role && tk.role === 'ROLE_COMPANY'){
      this.accountService.getMarginAccountForCompany(tk.id).subscribe( data => {
        this.account = data;
        //Otkomentarisati kada se odradi ruta na beku
        this.updateTransactions()
        // this.account = data
      })
    } else {
      this.accountService.getMarginAccountForUser(tk.id).subscribe( data => {
        this.account = data;
        this.updateTransactions()
        //Otkomentarisati kada se odradi ruta na beku
        // this.account = data
      })
    }

    //Mock transakcije, otkomentarisati gornju liniju kada se zavrsi bek za marzne racune
    // this.transactions = [
    //   {
    //     accountFrom: '1111111111111111',
    //     accountTo: '2222222222222222',
    //     amount: 1500,
    //     currencyMark: 'RSD',
    //     sifraPlacanja: 1001,
    //     pozivNaBroj: '123-456-789',
    //     date: new Date('2023-06-25').getTime()
    //   },
    //   {
    //     accountFrom: '3333333333333333',
    //     accountTo: '1111111111111111',
    //     amount: 2000,
    //     currencyMark: 'RSD',
    //     sifraPlacanja: 1002,
    //     pozivNaBroj: '987-654-321',
    //     date: new Date('2023-06-24').getTime()
    //   },
    //   {
    //     accountFrom: '1111111111111111',
    //     accountTo: '4444444444444444',
    //     amount: 500,
    //     currencyMark: 'RSD',
    //     sifraPlacanja: 1003,
    //     pozivNaBroj: '321-654-987',
    //     date: new Date('2023-06-23').getTime()
    //   },
    //   {
    //     accountFrom: '5555555555555555',
    //     accountTo: '1111111111111111',
    //     amount: 750,
    //     currencyMark: 'RSD',
    //     sifraPlacanja: 1004,
    //     pozivNaBroj: '654-321-987',
    //     date: new Date('2023-06-22').getTime()
    //   }
    // ];
  }

  updateTransactions() {
    this.accountService.getAllMarginTransactionsByAccountId(this.account.accountNumber).subscribe(res => {
      this.transactions = res;
    });
  }
  redirectToTransaction(transaction: TransactionDto): void {
    this.router.navigate(['/transaction-details'], { queryParams: { transaction: JSON.stringify(transaction) } });
  }
  getDayFromDate(dateString: number): number {
    const date = new Date(dateString);
    return date.getDate();
  }

  getMonthFromDate(dateString: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateString);
    return months[date.getMonth()];
  }

  getYearFromDate(dateString: number): number {
    const date = new Date(dateString);
    return date.getFullYear();
  }

}