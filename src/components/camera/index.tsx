import { createEffect, createSignal } from 'solid-js';

import styles from './Camera.module.css';

const defaultPreviewSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGlJREFUeF7t1AEJADAMA8HVv5Oa3GAuHq4KwqVkdvceR4AAgYDAGKxASyISIPAFDJZHIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRB46/vA5AUJNVYAAAAASUVORK5CYII=';

type Props = {
    picture?: string;
    onPictureTaken?: (picture: string) => void;
}
export function Camera({ picture, onPictureTaken }: Props) {
    const initialPreview = picture || defaultPreviewSrc;
    const [preview, setPreview] = createSignal<string>(initialPreview);

    createEffect(() => {
        if (onPictureTaken && preview() != initialPreview) {
            onPictureTaken(preview());
        }
    })

    const width = 320; // We will scale the photo width to this
    let height = 0; // This will be computed based on the input stream

    let streaming = false;
    let video: HTMLVideoElement;
    let canvas: HTMLCanvasElement;

    const setVideoRef = (ref: HTMLVideoElement) => {
        video = ref;

        prepareCamera();
    };

    const prepareCamera = () => {
        video.addEventListener('canplay', (event) => {
            if (!streaming) {
                height = (video.videoHeight / video.videoWidth) * width;

                video.setAttribute('width', `${width}`);
                video.setAttribute('height', `${height}`);
                canvas.setAttribute('width', `${width}`);
                canvas.setAttribute('height', `${height}`);
                streaming = true;
            }
        });
    };

    const takePicture = (e: MouseEvent) => {
        e.preventDefault();

        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(video, 0, 0, width, height);

            const data = canvas.toDataURL('image/png');
            setPreview(data);
        } else {
            clearPhoto();
        }
    };

    const clearPhoto = () => {
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = '#AAA';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/png');
        setPreview(data);
    };

    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false,
        })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((error) => {
            console.error(`An error occurred: ${error}`);
        });

    return (
        <div class="grid">
            <div class="camera">
                <video ref={setVideoRef} id="video">
                    Video stream not available.
                </video>
                <button onClick={takePicture}>Take photo</button>
            </div>

            <canvas
                ref={(ref) => (canvas = ref)}
                style={{ display: 'none' }}
            ></canvas>
            <div class={styles.PhotoPreviewContainer}>
                <img
                    class={styles.PhotoPreview}
                    src={preview()}
                    alt="The screen capture will appear in this box."
                />
            </div>
        </div>
    );
}
