import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {} as User;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private router: Router
    ) {}

  ngOnInit() {
  }

  async login(user: User)
  {
    if (this.formValidation()) {
      // show loader
      // eslint-disable-next-line prefer-const
      let loader = this.loadingCtrl.create({
        message: ' Please wait ...'
      });
      (await loader).present();

      try {
        await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(data => {
          this.router.navigate(['/tabs']);
          console.log(data);

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
