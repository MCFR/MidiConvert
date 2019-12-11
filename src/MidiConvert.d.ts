export interface Note {
	time: number,
	name: string,
	midi: number,
	velocity: number,
	duration: number,

	fromJSON(json):Note,

	match(note): boolean,

	toJSON(): Object
}

export interface Track {
	id?: number,
	isPercussion: boolean,
	channelNumber: number,
	name: string,
	instrument: string,
	instrumentNumber: number,
	instrumentFamily: string,
	notes: Array<Note>,
	startTime: number,
	duration: number,
	length: number,

	fromJSON(json): Track,

	note(midi, time, duration, velocity): Note,
	noteOn(midi, time, velocity): Track,
	noteOff(midi, time): Track,
	cc(num, time, value): Track,
	patch(id),
	channel(id),
	scale(amount): Track,
	slice(startTime, endTime): Track,
	removeNote(noteId): Track,
	encode (trackEncoder, header),

	toJSON(): Object
}

export interface ControlChange {
	name: string,
	number: number,
	time: string,
	value: number,
}

export interface MIDI {
	header: {
		name: string,
		bpm: number,
		timeSignature: [number, number],
		PPQ: number,
	},

	startTime: number,
	duration: number,

	tracks: Array<Track>,

	controlChanges: {
		[key: number]: ControlChange
	},

	fromJSON(json): MIDI,
	load(url, data, method),
	decode(bytes): MIDI,
	encode(): String,
	toArray(): Uint8Array,
	toJSON(): Object,
	track(): Track,
	get(trackName): Track,
	slice(startTime, endTime): MIDI
	removeTrack(trackId): MIDI
	addTrackAtStart(name): Track

}

export function parse(raw: ArrayBuffer|string): MIDI;
export function load(url: string, data?: any, method?: 'GET'|'POST'): Promise<MIDI>;
export function create(): MIDI;
export function fromJSON(json: object): MIDI;

export interface StringsByID {
	[index: number]: string;
}

export const instrumentByPatchID: StringsByID;
export const instrumentFamilyByID: StringsByID;
export const drumKitByPatchID: StringsByID;
