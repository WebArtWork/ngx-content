import { Component } from '@angular/core';
import {
	FormService
} from 'src/app/modules/form/form.service';

import { ContentService, Content } from "src/app/core/services/content.service";
import { FormInterface } from 'src/app/modules/form/interfaces/form.interface';
import { AlertService, CoreService } from 'wacom';
import { TranslateService } from 'src/app/modules/translate/translate.service';

@Component({
	templateUrl: './contents.component.html',
	styleUrls: ['./contents.component.scss']
})
export class ContentsComponent {
	columns = ['name', 'url'];

	form: FormInterface = this._form.getForm('content', {
		formId: 'content',
		title: 'Content',
		components: [
			{
				name: 'Photo',
				key: 'thumb',
				fields: [
					{
						name: 'Label',
						value: 'Header picture'
					}
				]
			},
			{
				name: 'Text',
				key: 'url',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill url'
					},
					{
						name: 'Label',
						value: 'Url'
					}
				]
			},
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill title'
					},
					{
						name: 'Label',
						value: 'Title'
					}
				]
			},
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill description'
					},
					{
						name: 'Label',
						value: 'Description'
					}
				]
			},
			{
				name: 'Text',
				key: 'content',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill content'
					},
					{
						name: 'Label',
						value: 'Content'
					}
				]
			}
		]
	});

	config = {
		create: () => {
			this._form
				.modal<Content>(this.form, {
					label: this._translate.translate('Common.Create'),
					click: (created: unknown, close: () => void) => {
						if (!(created as Content).url.startsWith('/')) {
							(created as Content).url = '/' + (created as Content).url;
						}
						this._cs.create(created as Content);
						close();
					}
				})
				.then(this._cs.create.bind(this));
		},
		update: (doc: Content) => {
			this._form
				.modal<Content>(this.form, [], doc)
				.then((updated: Content) => {
					if (updated) {
						if (!updated.url.startsWith('/')) {
							updated.url = '/' + updated.url;
						}
						this._core.copy(updated, doc);
						this._cs.save(doc);
					}
				});
		},
		delete: (doc: Content) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this content?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._cs.delete(doc);
						}
					}
				]
			});
		}
	};

	get rows(): Content[] {
		return this._cs.contents;
	}

	constructor(
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _cs: ContentService
	) {}
}
