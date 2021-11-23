
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { loadingController } from '@ionic/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {} as User;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
    ) {}

  ngOnInit() {
  }

  async register(user: User) {
    if (this.formValidation()) {
      // show loader
      let loader = this.loadingCtrl.create({
        message: 'Please wait ...'
      });
      (await loader).present();

      try {
        await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(data => {
          console.log(data);


          // redirect to home page

          this.navCtrl.navigateRoot("home");

        });
      } catch(e) {
        this.showToast(e);
      }

      //dismiss loader
      (await loader).dismiss();
    }
  }

   formValidation() {

    if (!this.user.email && !this.user.password)
    {
      this.showToast('Please enter an email and password!');
      return false;
    }
     if (!this.user.email){
       this.showToast('Please enter email!');
       return false;
     }

     if (!this.user.password) {
       this.showToast('Please enter password!');
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
