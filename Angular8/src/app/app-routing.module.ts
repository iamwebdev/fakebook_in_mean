import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendSuggestionComponent } from './friend-suggestion/friend-suggestion.component';
import { SentRequestComponent } from './sent-request/sent-request.component';
import { RecievedRequestComponent } from './recieved-request/recieved-request.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path: '', component:SignupComponent},
  {path: 'signin', component:SigninComponent},
  {path: 'my-profile', component:ProfileComponent},
  {path: 'friend-suggestions', component:FriendSuggestionComponent},
  {path: 'sent-requests', component:SentRequestComponent},
  {path: 'recieved-requests', component:RecievedRequestComponent},
  {path: 'friend-list', component:FriendListComponent},
  {path: 'chat', component:ChatComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
