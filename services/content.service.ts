import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

export interface Content {
	_id: string;
	name: string;
	description: string;
	stores: string[];
}

@Injectable({
	providedIn: 'root'
})
export class ContentService {
	contents: Content[] = [];

	_contents: any = {};

	new(): Content {
		return {} as Content;
	}

	constructor(
		private mongo: MongoService,
		private alert: AlertService
	) {
		this.contents = mongo.get('content', {}, (arr: any, obj: any) => {
			this._contents = obj;
		});
	}

	create(
		content: Content = this.new(),
		callback = (created: Content) => {},
		text = 'content has been created.'
	) {
		if (content._id) {
			this.save(content);
		} else {
			this.mongo.create('content', content, (created: Content) => {
				callback(created);
				this.alert.show({ text });
			});
		}
	}

	doc(contentId: string): Content {
		if(!this._contents[contentId]){
			this._contents[contentId] = this.mongo.fetch('content', {
				query: {
					_id: contentId
				}
			});
		}
		return this._contents[contentId];
	}

	update(
		content: Content,
		callback = (created: Content) => {},
		text = 'content has been updated.'
	): void {
		this.mongo.afterWhile(content, ()=> {
			this.save(content, callback, text);
		});
	}

	save(
		content: Content,
		callback = (created: Content) => {},
		text = 'content has been updated.'
	): void {
		this.mongo.update('content', content, () => {
			if(text) this.alert.show({ text, unique: content });
		});
	}

	delete(
		content: Content,
		callback = (created: Content) => {},
		text = 'content has been deleted.'
	): void {
		this.mongo.delete('content', content, () => {
			if(text) this.alert.show({ text });
		});
	}
}
