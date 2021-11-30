/* eslint-disable @typescript-eslint/dot-notation */
import { PhotoService } from './../services/photo.service';
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  posts: any;
  constructor(
    public photoService: PhotoService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore) {}

  ionViewWillEnter() {
    this.getPosts();
  }

  async getPosts() {
    // console.log("get posts");

    // show loader
    // eslint-disable-next-line prefer-const
    let loader = await this.loadingCtrl.create({
      message: 'Please wait ...'
    });
    (await loader).present();

    try {
      this.firestore
        .collection('posts')
        .snapshotChanges()
        .subscribe(data => {
          this.posts = data.map(e => ({
              id: e.payload.doc.id,
              title: e.payload.doc.data()['title'],
              details: e.payload.doc.data()['details'],
              // content: e.payload.doc.data()['content']
            }));

          // dismiss loader
          loader.dismiss();
        });
    } catch (e) {
      this.showToast(e);
    }
  }

  async deletePost(id: string) {
    let loader = await this.loadingCtrl.create({
      message: 'Please wait ...'
    });

    (await loader).present();

    try {

    await this.firestore.doc('posts/' + id).delete();
    (await loader).dismiss();
    } catch(e) {
      this.showToast(e);
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }


}
