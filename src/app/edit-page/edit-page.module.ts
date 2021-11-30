import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPagePageRoutingModule } from './edit-page-routing.module';
import { QuillModule } from 'ngx-quill';
import { EditPagePage } from './edit-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPagePageRoutingModule,
    QuillModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [EditPagePage]
})
export class EditPagePageModule {}
