import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryContentPageRoutingModule } from './entry-content-routing.module';

import { EntryContentPage } from './entry-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryContentPageRoutingModule
  ],
  declarations: [EntryContentPage]
})
export class EntryContentPageModule {}
