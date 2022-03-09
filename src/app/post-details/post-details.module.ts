import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostDetailsPageRoutingModule } from './post-details-routing.module';
import { QuillModule } from 'ngx-quill';
import { PostDetailsPage } from './post-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostDetailsPageRoutingModule,
    QuillModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [PostDetailsPage]
})
export class PostDetailsPageModule {}
