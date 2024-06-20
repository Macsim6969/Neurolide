import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MediaChanelsComponent } from "../../media-chanels.component";
import { MediaHeaderComponent } from "../components/media-header/media-header.component";
import { MediaListComponent } from "../components/media-list/media-list.component";
import { ListHeaderComponent } from "../components/list-header/list-header.component";
import { ListChannelsComponent } from "../components/list-channels/list-channels.component";
import { ListMobileComponent } from "../components/list-mobile/list-mobile.component";
import { ShareModule } from "../../../../shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { MediaFormService } from "../services/mediaForm.service";
import { MediaChannelService } from "../services/mediaChannel.service";


@NgModule({
  declarations: [
    MediaChanelsComponent,
    MediaHeaderComponent,
    MediaListComponent,
    ListHeaderComponent,
    ListChannelsComponent,
    ListMobileComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    TranslateModule
  ],
  exports: [
    MediaListComponent,
    ListMobileComponent,
    MediaHeaderComponent
  ],
  providers: [MediaFormService, MediaChannelService]
})

export class MediaModuleClass { }