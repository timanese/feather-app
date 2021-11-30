import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GrantAccessToLoginGuard } from './grant-access-to-login.guard';

const routes: Routes = [
  // {path: " ", redirectTo: "login", pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [GrantAccessToLoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-post',
    loadChildren: () => import('./add-post/add-post.module').then( m => m.AddPostPageModule)
  },
  {
    path: 'delete',
    loadChildren: () => import('./delete/delete.module').then( m => m.DeletePageModule)
  },
  {
    path: 'edit-page/:id',
    loadChildren: () => import('./edit-page/edit-page.module').then( m => m.EditPagePageModule)
  },
  {
    path: 'entry-content',
    loadChildren: () => import('./entry-content/entry-content.module').then( m => m.EntryContentPageModule)
  }


];

// const routes: Routes = [
//   { path: "", redirectTo: "login", pathMatch: "full" },
//   {
//     path: "tabs",
//     loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
//   },
//   {
//     path: "login",
//     loadChildren: () =>
//       import("./login/login.module").then(m => m.LoginPageModule)
//   },
//   {
//     path: "register",
//     loadChildren: () =>
//       import("./register/register.module").then(m => m.RegisterPageModule)
//   }
// ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
