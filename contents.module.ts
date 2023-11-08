import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core';
import { ContentsComponent } from './contents.component';
import { Routes, RouterModule } from '@angular/router';

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
		ContentsComponent
	],
	providers: []

})

export class ContentsModule { }
