import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { TagsComponent } from './admin/tags/tags.component';
import { IndexComponent } from './index/index.component';
import { AdminMainLayoutComponent } from './admin/admin-main-layout/admin-main-layout.component';
import { AuthGuard } from './_guards/auth.guard';
import { TempComponent } from './temp/temp.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'about', component: AboutComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'portfolio', component: ProfileComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin', component: AdminMainLayoutComponent, canActivateChild: [AuthGuard], children: [
        { path: 'home', component: HomeComponent },
        { path: 'tags', component: TagsComponent }
    ] },
    // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
