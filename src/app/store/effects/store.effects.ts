import { Actions, createEffect, ofType } from "@ngrx/effects";
import { startGetData } from "../actions/store.actions";
import { tap, withLatestFrom } from "rxjs";
import { BackendService } from "../../shared/services/backend.service";
import { Store, select } from "@ngrx/store";
import { StoreInterface } from "../model/store.model";
import { selectUserId } from "../selectors/store.selectors";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {
  
  startAuth = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startGetData),
        withLatestFrom(this.store.pipe(select(selectUserId))),
        tap(([action, id]) =>{
          this.backendService.getUserProfile(id);
          this.backendService.getMonitoringData(id);
        })
      )
    ,
    {dispatch: false}
  );

  constructor(private actions$: Actions, 
    private backendService: BackendService,
    private store: Store<{store: StoreInterface}>
  ){}


}