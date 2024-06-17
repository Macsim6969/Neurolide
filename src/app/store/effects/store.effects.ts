import { Actions, createEffect, ofType } from "@ngrx/effects";
import { setAllUsers, setRegiset, setUserData, startGetData } from "../actions/store.actions";
import { tap, withLatestFrom } from "rxjs";
import { BackendService } from "../../shared/services/backend.service";
import { Store, select } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { selectAllUsers, selectStore, selectUserData, selectUserId } from "../selectors/store.selectors";
import { Injectable } from "@angular/core";
import { MonitoringService } from "../../shared/services/monitoring.service";

@Injectable()
export class AuthEffects {


  startAuth = createEffect(
    () => this.actions$.pipe(
      ofType(startGetData),
      withLatestFrom(this.store.pipe(select(selectUserId))),
      tap(([action, id]) => {
        this.backendService.getUserProfile(id);
        this.backendService.getMonitoringData(id);
        this.backendService.getAlluser();
        this.backendService.getCardsPayment(id);
        this.backendService.getCardsTransactions(id);
      })
    )
    ,
    { dispatch: false }
  );

  register = createEffect(
    () => this.actions$.pipe(
      ofType(setRegiset),
      tap(() => {
        const rules = JSON.parse(localStorage.getItem('rules'))
        const id = JSON.parse(localStorage.getItem('id'))
        this.monitoringService.checkRules(id, rules)
      })
    ),
    { dispatch: false }
  )

  setUserData = createEffect(
    () => this.actions$.pipe(
      ofType(setUserData),
      withLatestFrom(this.store.select(selectUserId)),
      tap(([action, id]) => {
        this.backendService.getUserProfile(id)
      })
    ),
    { dispatch: false }
  )

  setAllUser = createEffect(
    () => this.actions$.pipe(
      ofType(setAllUsers),
      tap(() => {
        this.backendService.getAlluser();
      })
    )
  )

  constructor(private actions$: Actions,
    private backendService: BackendService,
    private store: Store<{ store: StoreInterface }>,
    private monitoringService: MonitoringService
  ) { }


}