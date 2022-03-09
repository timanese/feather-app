import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  post = {} as Post;
  private id: any;
  editorForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private fireStore: AngularFirestore,
    private toastCtrl: ToastController,
    private router: Router
    ) {
    this.id = this.activeRoute.snapshot.params['id'];
    // or i coudlve done this
    //this.id = this.activeRoute.snapshot.paramMap.get("id");
    console.log('The post ID to edit is: ' + this.id);
   }

  ngOnInit() {
    this.getPostById(this.id);
    this.editorForm = new FormGroup({
      editor: new FormControl(null)
    });
  }

  async getPostById(id: string) {
    // show loader
    let loader = this.loadingCtrl.create({
      message: 'Please Wait...'
    });
    (await loader).present();
    this.fireStore.doc('posts/' + id).valueChanges().subscribe(data => {
      this.post.title = data['title'];
      this.post.details = data['details'];
      this.post.content = data['content'];
    });
      //dismiss laoder
      (await loader).dismiss();
  }

  async updatePost(post: Post){
    if (this.formValidation()) {
      let loader = this.loadingCtrl.create({
        message: ' Please wait ...'
      });
      (await loader).present();

      try {
        await this.fireStore.doc('posts/' + this.id).update(post);
      } catch (e)  {
        this.showToast(e);
      }

      (await loader).dismiss();

      // redirects to the diary entries
      // redirecrt to diary entry page (tab 2)
      this.router.navigate(['/tabs']);

    }
  }


  formValidation() {
    if (!this.post.title){
      this.showToast('Please enter Title!!!!!');
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

