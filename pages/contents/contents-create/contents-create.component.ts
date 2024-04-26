import { Component } from '@angular/core';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-contents-create',
  templateUrl: './contents-create.component.html',
  styleUrl: './contents-create.component.scss'
})
export class ContentsCreateComponent {
	constructor(private _ss: ContentService) { }
	chatGPT = `[{name: 'Entity Name'}]`;
	close: () => void;
	entities = '';
	store: string;
	create() {
		const entities = JSON.parse(this.entities);
		for (const entity of entities) {
			entity.stores = this.store ? [this.store] : [];
			this._ss.create(entity);
		}
	}
}
