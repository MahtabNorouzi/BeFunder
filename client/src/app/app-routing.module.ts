import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
// import { UserPanelComponent } from './user-panel/user-panel.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { InvestmentContractDialogComponent } from './investment-contract-dialog/investment-contract-dialog.component';
import { InvestmentDialogComponent } from './investment-dialog/investment-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ListProjectsComponent } from './projects/list-projects/list-projects.component'
import { AddProjectComponent } from './projects/borrower/add-project/add-project.component';
import { ApproveProjectsComponent } from './projects/buyer-projects/approve-projects/approve-projects.component';
import { BorrowerProjectsComponent } from './projects/borrower/borrower-projects/borrower-projects.component';
import { BorrowerMainComponent } from './projects/borrower/borrower-main/borrower-main.component';
import { PayProjectsComponent } from './projects/buyer-projects/pay-projects/pay-projects.component';
import { BuyerMainComponent } from './projects/buyer-projects/buyer-main/buyer-main.component';

const routes: Routes = [
  // { path: 'user-panel', component: UserPanelComponent , canActivate : [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'listprojects', component: ListProjectsComponent },
  { path: 'approveprojects', component: ApproveProjectsComponent,  canActivate : [AuthGuard] },
  { path: 'payprojects', component: PayProjectsComponent,  canActivate : [AuthGuard] },
  { path: 'borrowerprojects', component: BorrowerProjectsComponent,  canActivate : [AuthGuard] },
  { path: 'buyermain', component: BuyerMainComponent,  canActivate : [AuthGuard] },
  { path: 'addprojects', component: AddProjectComponent, canActivate : [AuthGuard] },  
  { path: 'borrowermain', component: BorrowerMainComponent, canActivate : [AuthGuard] },  
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'} ,
  { path: 'projectdetail', component: ProjectDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
