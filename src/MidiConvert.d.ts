export interface Note {
	time: number,
	name: string,
	midi: number,
	velocity: number,
	duration: number,
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

	toJSON(): MIDI,
	encode(): string,
  toArray(): Uint8Array,
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
