import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsRoutingModule } from './contents-routing.module';
import { StartingPageComponent } from './starting-page/starting-page.component';


@NgModule({
  declarations: [
    StartingPageComponent
  ],
  imports: [
    CommonModule,
    ContentsRoutingModule
  ]
})
export class ContentsModule { }
