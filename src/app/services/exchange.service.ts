import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {
  Daily,
  Future,
  Intraday,
  Monthly,
  Options,
  Stock,
  Weekly,
  Forex,
  MyStock,
  MyFuture,
  RequestDto,
  Actuary,
  Contract,
  FutureContract,
  MyForex
} from "../models/models";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  apiUrlExchangeService: string = environment.exchangeServiceUrl + "/api/v1"
  apiUrlOptions: string = environment.exchangeServiceUrl + "/api/v1/option"
  apiUrlStocks: string = environment.exchangeServiceUrl + "/api/v1/stock"
  apiUrlForex: string = environment.exchangeServiceUrl + "/api/v1/forex"
  apiAgentProfit: string = environment.exchangeServiceUrl + "/api/v1/actuary/profit"

  constructor(private httpClient : HttpClient) { }

  getAllStocks(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Stock[]>(`${this.apiUrlExchangeService}/stock`,{headers} )
  }
  getAllFutures(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Future[]>(`${this.apiUrlExchangeService}/future`,{headers} )
  }
  getAllForex(): Observable<Forex[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<Forex[]>(`${this.apiUrlExchangeService}/forex`, { headers });
  }
  getCompanyMyForex(firmId: number): Observable<MyForex[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<MyForex[]>(`${this.apiUrlForex}/myForex/getAllForCompany/${firmId}`, { headers });
  }
  getAllOptions(){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Future[]>(`${this.apiUrlExchangeService}/options/getAll`,{headers} )
  }

  getIntraday(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Intraday[]>(`${this.apiUrlExchangeService}/history/intraday/${ticker}`,{headers} )
  }

  getDaily(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Daily[]>(`${this.apiUrlExchangeService}/history/daily/${ticker}`,{headers} )
  }

  setOrderRequest(id: number, orderRequest: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });

    // const body = { orderRequest };

    return this.httpClient.post<any>(`${this.apiUrlExchangeService}/actuary/setOrderRequest/${id}?orderRequest=${orderRequest}`, { headers });
  }

  getWeekly(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Weekly[]>(`${this.apiUrlExchangeService}/history/weekly/${ticker}`,{headers} )
  }

  getMonthly(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Monthly[]>(`${this.apiUrlExchangeService}/history/monthly/${ticker}`,{headers} )
  }

  getByTicker(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Stock>(`${this.apiUrlExchangeService}/stock/${ticker}`,{headers} )
  }
  getAllCalls(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Options[]>(`${this.apiUrlOptions}/calls/${ticker}`,{headers} )
  }
  getAllPuts(ticker: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.httpClient.get<Options[]>(`${this.apiUrlOptions}/puts/${ticker}`,{headers} )
  }

  buyStock(userId: number, companyId: number, employeeId: number, ticker:string, amount: number,
           limitValue:number, stopValue: number, aon: boolean,
           margine:boolean){
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        })
        const body = {userId, companyId, employeeId, ticker, amount, limitValue, stopValue, aon, margine};
        return this.httpClient.post<any>(`${this.apiUrlStocks}/buyStock`,body,{ headers })
      }

  getAllOrdersToApprove(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<RequestDto[]>(`${this.apiUrlExchangeService}/stock/ordersToApprove/getAll`);
  }

  approveStockOrder(id:number, approved: boolean){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })

    return this.httpClient.get<RequestDto>(`${this.apiUrlExchangeService}/stock/ordersToApprove/approve/${id}?approved=${approved}`, {headers});
  }

  resetLimitUsed(id: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });

    return this.httpClient.get<Actuary>(`${this.apiUrlExchangeService}/actuary/restartLimitUsed/${id}`, { headers });
  }

  getAllAgents(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });

    return this.httpClient.get<Actuary[]>(`${this.apiUrlExchangeService}/actuary/getAll`, { headers });
  }

  setLimit(id: number, limit: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    console.log(id)
    console.log(limit)
    return this.httpClient.get<Actuary>(`${this.apiUrlExchangeService}/actuary/setLimit/${id}?limit=${limit}`, { headers });
  }

    getMyStocks(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAll`, { headers });
    }
    getMyFutures(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });


      return this.httpClient.get<MyFuture[]>(`${this.apiUrlExchangeService}/future/myFuture/getAll`, { headers });
    }
    sellStock(employeeId: number, ticker:string, amount: number, limitValue:number, stopValue: number, aon: boolean, margine:boolean){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      const body = {employeeId, ticker, amount, limitValue, stopValue, aon, margine};
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/stock/sellStock`, body, { headers });
    }
    buyFuture(futureId: number, employeeId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      const body = {futureId, employeeId};
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/future/buyFuture`, body, { headers });
    }
    sellFuture(futureId: number, employeeId: number, amount: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });

      const body = {futureId, employeeId, amount};
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/future/sellFuture`, body, { headers });
    }

    getAllSentContracts(companyId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllSent/${companyId}`, { headers });
    }
    getAllReceivedContracts(companyId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllReceived/${companyId}`, { headers });
    }

    getAllContracts(companyId: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAll/${companyId}`, { headers });
    }

    getAllSupervisor(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllSupervisor`, { headers });
    }

    companyAcceptContract(contractId: number, comment: string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      const body = { contractId, comment}
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/companyAccept`, body, { headers });
    }
    companyDeclineContract(contractId: number, comment: string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      const body = { contractId, comment}
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/companyDecline`, body, { headers });
    }

    buyCompanyStockOtc(sellerId: number, buyerId: number, ticker: string, amount: number, price: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      const body = { sellerId: sellerId, buyerId: buyerId, ticker: ticker, amount: amount, price: price}
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/stock/buyCompanyStockOtc`, body, { headers });
    }

    buyUserStockOtc(sellerId: number, buyerId: number, ticker: string, amount: number, price: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      const body = { userSellerId: sellerId, userBuyerId: buyerId, ticker: ticker, amount: amount, price: price}
      return this.httpClient.post<any>(`${this.apiUrlExchangeService}/stock/buyUserStockOtc`, body, { headers });
    }

    getPublicStocks(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAllForUserOtcBuy/${userId}`, { headers });
    }
    getCompanyPublicStocks(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAllForCompanyOtcBuy/${userId}`, { headers });
    }


    getUserMyStocks(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAllForUser?userId=${userId}`, { headers });
    }

    getCompanyMyStocks(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyStock[]>(`${this.apiUrlExchangeService}/stock/myStock/getAllForCompany?companyId=${companyId}`, { headers });
    }

    getCompanyMyFutures(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<MyFuture[]>(`${this.apiUrlExchangeService}/stock/myFuture/getAllForCompany?companyId=${companyId}`, { headers });
    }


    getAllSentRequestsUser(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllSentUser/${userId}`, { headers });
    }

    getAllSentRequestsCompany(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllSent/${companyId}`, { headers });
    }

    getAllSentFutureRequestsCompany(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<FutureContract[]>(`${this.apiUrlExchangeService}/future-contract/getAllSent/${companyId}`, { headers });
    }

    getAllReceivedRequestsUser(userId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllReceivedUser/${userId}`, { headers });
    }

    getAllReceivedRequestsCompany(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<Contract[]>(`${this.apiUrlExchangeService}/contract/getAllReceived/${companyId}`, { headers });
    }

    getAllReceivedFutureRequestsCompany(companyId : number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      return this.httpClient.get<FutureContract[]>(`${this.apiUrlExchangeService}/future-contract/getAllReceived/${companyId}`, { headers });
    }

    setStockViewUser(ticker: string, userId: number, amount: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      let data = {
        ticker, ownerId: userId, amount
      }
      return this.httpClient.put<any>(`${this.apiUrlExchangeService}/stock/myStock/makeUserStockPublic`, data, { headers });
    }


    setStockViewCompany(ticker: string, userId: number, amount: number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      let data = {
        ticker, ownerId: userId, amount
      }
      return this.httpClient.put<any>(`${this.apiUrlExchangeService}/stock/myStock/makeCompanyStockPublic`, data, { headers });
    }

    acceptOrDeclineOffer(contractId: number, accept: boolean, comment: string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      let data = {
        contractId, comment
      }
      if(accept){
        return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/companyAccept`, data, { headers });
      }
        return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/companyDecline`, data, { headers });
    }
    acceptOrDeclineOfferSupervisor(contractId: number, accept: boolean, comment: string){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      });
      let data = {
        contractId, comment
      }
      if(accept){
        return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/supervisorAccept`, data, { headers });
      }
        return this.httpClient.post<any>(`${this.apiUrlExchangeService}/contract/supervisorDecline`, data, { headers });
    }
  getAgentProfits(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.httpClient.get<any>(`${this.apiAgentProfit}/getAll`, {headers});
  }

}





