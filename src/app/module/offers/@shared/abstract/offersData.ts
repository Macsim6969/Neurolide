import { Component, OnDestroy, OnInit } from "@angular/core";
import { GlobalIconsService } from "../../../../shared/services/globalIcon.service";
import { StoreInterface } from "../../../../store/model/store.model";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { selectOffersData } from "../../../../store/selectors/store.selectors";
import { OfferInterface } from "../interface/offer.interface";

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
    protected globalIconsService: GlobalIconsService
    // protected mediaChannelService: MediaChannelService,
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
    // this.mediaChannelService.removeMedia(this.mediaChannels, this.mainData, id)
  }

  public setNewChanges(id: number, idChannel: number) {
    // this.mediaChannelService.setNewChanges(this.mediaChannels, this.mainData, id, this.activePayout[idChannel])

  }

  public setVipStatus(id: number) {
    // this.mediaChannelService.setVipStatus(this.mediaChannels, this.mainData, id)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}