import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ContentsComponent } from './contents.component';
import { Routes, RouterModule } from '@angular/router';
import { ContentsCreateComponent } from './contents-create/contents-create.component';

const routes: Routes = [{
	path: '',
	component: ContentsComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		ContentsComponent,
  ContentsCreateComponent
	],
	providers: []

})

export class ContentsModule { }
