import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { AddPostService } from '../services/add-post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  post = {} as Post;
  editorForm: FormGroup;
  constructor(public addPostService: AddPostService) { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      editor: new FormControl(null)
    });
  }

  async createPost(post: Post) {
    this.addPostService.createPost(this.post);
  }


  // this is for the quill editor
  // shouldve used services so everything would be more modularized
  onSubmit(): void {
    console.log(this.editorForm.get('editor').value);
  }

}
