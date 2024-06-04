import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatCardActions, MatCardContent, MatCardHeader, MatCardModule } from "@angular/material/card";
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";


@NgModule({
  declarations: [
  ],
  exports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  imports: [
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})

export class ShareModule {
}
