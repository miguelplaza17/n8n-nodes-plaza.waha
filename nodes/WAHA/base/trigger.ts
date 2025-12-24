import {
	type IDataObject,
	INodeProperties,
	INodeTypeBaseDescription,
	type IWebhookFunctions,
	type IWebhookResponseData,
} from 'n8n-workflow';

export const BASE_TRIGGER_DESCRIPTION: INodeTypeBaseDescription = {
	displayName: 'WAHA Trigger',
	name: 'wahaTrigger',
	icon: 'file:waha.svg',
	group: ['trigger'],
	description: 'Handle WAHA events via webhooks',
};
export const TRIGGER_DESCRIPTION = {
	defaults: {
		name: 'WAHA Trigger',
	},
	inputs: [],
	credentials: [],
	webhooks: [
		{
			name: 'default' as const,
			httpMethod: 'POST',
			responseMode: 'onReceived',
			path: 'waha',
		},
	],
};

export const CONFIGURE_WEBHOOK_NOTE: INodeProperties = {
	displayName:
		'Remember to configure WAHA instance (session or server) to send events to <b>Webhook URL</b>. ' +
		'<br/>Check <b>Docs</b> link above☝️',
	name: 'webhookNote',
	type: 'notice',
	typeOptions: {
		theme: 'info',
	},
	default: '',
};

export function makeEventSelectionProperty(events: string[]): INodeProperties {
	return {
		displayName: 'Event',
		name: 'event',
		type: 'options',
		options: events.map((event) => ({
			name: event,
			value: event,
		})),
		default: events[0],
		required: true,
		description: 'The WAHA event type to listen for',
	};
}

export function makeWebhookForSingleEvent() {
	async function webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const selectedEvent = this.getNodeParameter('event') as string;

		const eventType = bodyData.event as string | undefined;

		// Only trigger workflow if the received event matches the selected event
		if (eventType === undefined || eventType !== selectedEvent) {
			return {};
		}

		const req = this.getRequestObject();
		const data = this.helpers.returnJsonArray(req.body as IDataObject);

		return {
			workflowData: [data],
		};
	}

	return webhook;
}
