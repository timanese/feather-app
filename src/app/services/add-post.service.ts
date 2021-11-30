import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  editorForm: FormGroup;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  async createPost(post: Post){
    if (this.formValidation(post)) {
      // show loader
      // eslint-disable-next-line prefer-const
      let loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();

      try {
        await this.firestore.collection('posts').add(post);
        // this.firestore.doc('post/').get(post);
      } catch(e) {
        this.showToast(e);
      }

      // dismiss loader
      (await loader).dismiss();
      // redirect to diary entry page (tab 2)
      this.router.navigate(['/tabs']);

    }
  }

  formValidation(post: Post) {
     if (!post.title){
       this.showToast('Please enter Title!');
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


  // this is for the quill editor
  // shouldve used services so everything would be more modularized
  onSubmit() {
    console.log(this.editorForm.get('editor').value);
  }

}
