import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {
  post = {} as Post;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {}

  async createPost(post: Post){
    if (this.formValidation()) {
      // show loader
      // eslint-disable-next-line prefer-const
      let loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();

      try {
        await this.firestore.collection('posts').add(post);
      } catch(e) {
        this.showToast(e);
      }

      // dismiss loader
      (await loader).dismiss();
      // redirecrt to diary entry page (tab 2)
      this.router.navigate(['/tabs']);

    }
  }

  formValidation() {

    if (!this.post.title && !this.post.details)
    {
      this.showToast('Please enter a Title and detail!');
      return false;
    }
     if (!this.post.title){
       this.showToast('Please enter Title!');
       return false;
     }

     if (!this.post.details) {
       this.showToast('Please enter detail!');
       return false;
     }

     return true;
   }

  showToast(message: string) {
    this.toastCtrl.create({
      // eslint-disable-next-line object-shorthand
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}
