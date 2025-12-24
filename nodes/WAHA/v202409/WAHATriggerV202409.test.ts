import { WAHATriggerV202409 } from './WAHATriggerV202409';
import { NodeConnectionType } from 'n8n-workflow';

test('WAHATriggerV202409.outputs', () => {
	const node = new WAHATriggerV202409();
	expect(node.description.outputs).toEqual([NodeConnectionType.Main]);
});

test('WAHATriggerV202409.properties', () => {
	const node = new WAHATriggerV202409();
	const eventProperty = node.description.properties?.find(p => p.name === 'event');

	expect(eventProperty).toBeDefined();
	expect(eventProperty?.type).toBe('options');
	expect(eventProperty?.required).toBe(true);

	// Verify all events are available as options
	const eventOptions = (eventProperty as any)?.options || [];
	expect(eventOptions.length).toBe(20);

	const eventValues = eventOptions.map((opt: any) => opt.value);
	expect(eventValues).toContain('session.status');
	expect(eventValues).toContain('message');
	expect(eventValues).toContain('message.reaction');
	expect(eventValues).toContain('message.any');
	expect(eventValues).toContain('message.ack');
	expect(eventValues).toContain('message.revoked');
	expect(eventValues).toContain('state.change');
	expect(eventValues).toContain('group.join');
	expect(eventValues).toContain('group.leave');
	expect(eventValues).toContain('presence.update');
	expect(eventValues).toContain('poll.vote');
	expect(eventValues).toContain('poll.vote.failed');
	expect(eventValues).toContain('chat.archive');
	expect(eventValues).toContain('call.received');
	expect(eventValues).toContain('call.accepted');
	expect(eventValues).toContain('call.rejected');
	expect(eventValues).toContain('label.upsert');
	expect(eventValues).toContain('label.deleted');
	expect(eventValues).toContain('label.chat.added');
	expect(eventValues).toContain('label.chat.deleted');
});
