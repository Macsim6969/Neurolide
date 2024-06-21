import { Component, OnDestroy, OnInit } from "@angular/core";
import { GlobalIconsService } from "../../../../shared/services/globalIcon.service";
import { StoreInterface } from "../../../../store/model/store.model";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { selectOffersData } from "../../../../store/selectors/store.selectors";
import { OfferInterface } from "../interface/offer.interface";
import { OffersService } from "../services/offers.service";

@Component({
  template: ''
})

export abstract class OffersDataClass implements OnInit, OnDestroy {
  protected destroy$: Subject<void> = new Subject<void>();
  protected mainData: OfferInterface[];
  public offers: OfferInterface[];
  protected activePayout: string[] = [];
  constructor(
    protected store: Store<{ store: StoreInterface }>,
    protected globalIconsService: GlobalIconsService,
    protected offersService: OffersService,
  ) { }

  ngOnInit(): void {
    this.streamOffersDataFromStore();
  }

  private streamOffersDataFromStore() {
    this.store.select(selectOffersData).pipe(takeUntil(this.destroy$))
      .subscribe((data: OfferInterface[]) => {
        if (data) {
          this.mainData = data;
          this.offers = Object.values(data);
        }
      });
  }

  public removeOffers(id: number) {
    this.offersService.removeOffers(this.offers, this.mainData, id)
  }

  public setNewChanges(id: number, activePayout: string) {
    this.offersService.setNewChanges(this.offers, this.mainData, id, activePayout)
  }

  public setVipStatus(id: number) {
    this.offersService.setVipStatus(this.offers, this.mainData, id)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}