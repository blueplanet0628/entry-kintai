import { RCS380 } from "./rc-s380";

const ACCEPTABLE_DEVICE_LIST = ["RC-S380"];

let staticReader: CardReader | null = null;

export interface CardReaderDevice {
	getIDm(): Promise<string>;
	close(): Promise<void>;
	reset(): Promise<void>;
}

export class CardReader {
	device: CardReaderDevice;
	timer = -1;

	private constructor(device: CardReaderDevice) {
		this.device = device;
	}

	public static async getDevice() {
		if (staticReader) return staticReader;

		try {
			const device = await navigator.usb.requestDevice({
				filters: [
					{
						vendorId: 0x054c,
						// 以下を　指定しても動くが、他の環境でも意図した挙動になるか分からないため、
						// ユーザーにデバイスを指定させた上でproductNameで確認する
						// protocolCode: 0x00,
						// classCode: 0xff,
						// subclassCode: 0x00,
					},
				],
			});
			await device.open();
			await device.selectConfiguration(1);
			await device.claimInterface(0);

			if (device.productName?.includes("RC-S380")) {
				const rcs380 = new RCS380(device);
				staticReader = new CardReader(rcs380);
				return staticReader;
			}

			throw new Error(
				`無効なデバイスが選択されました。対応しているデバイスは以下の通りです。${ACCEPTABLE_DEVICE_LIST.join(
					"/",
				)}`,
			);
		} catch (e: any) {
			console.log(e);
			alert(`カードリーダーが見つかりませんでした。${e.message}`);
		}
		return null;
	}

	public static async releaseDevice() {
		if (staticReader) {
			await staticReader.close();
			staticReader = null;
		}
	}

	public startIDmPolling(
		callback: (idm: string, error?: string) => Promise<void>,
		intervalMillis = 3000,
	) {
		if (this.timer !== -1) return;

		this.timer = window.setInterval(async () => {
			// タブが表示されていない場合は読み取りを行わない
			if (document.visibilityState !== "visible") return;

			try {
				const idm = await this.device.getIDm();
				if (idm) {
					callback(idm);
				}
			} catch (e: any) {
				console.log(e);
				callback("", `カードリーダーの読み取りに失敗しました。\n${e.message}`);
				// if (this.timer !== -1) window.clearInterval(this.timer);
				// await this.device.reset();
				this.startIDmPolling(callback, intervalMillis);
			}
		}, intervalMillis);
	}

	public stopIDmPolling() {
		if (this.timer !== -1) {
			window.clearInterval(this.timer);
			this.timer = -1;
		}
	}

	public async close() {
		await this.device.close();
	}
}
