import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPostPageRoutingModule } from './add-post-routing.module';

import { AddPostPage } from './add-post.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPostPageRoutingModule,
    QuillModule.forRoot()
  ],
  declarations: [AddPostPage]
})
export class AddPostPageModule {}
