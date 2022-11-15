import { createSignal, JSX } from 'solid-js';

import { Card } from "../components/layout/card";

export function HomePage() {
    const [src, setSrc] = createSignal<MediaStream>();
    const [preview, setPreview] = createSignal<string>();

    let v: HTMLVideoElement;
    let c: HTMLCanvasElement;

    const width = 320;    // We will scale the photo width to this
    let height = 0;     // This will be computed based on the input stream

    let streaming = false;

    const handleClick = (data: string, event: MouseEvent) => {
        navigator.mediaDevices.getUserMedia({
            video: true, audio: false
        })
        .then(stream => {
            v.srcObject = stream;
            v.play();
        })
        .catch(error => {
            console.error(`An error occurred: ${error}`);
        })
    }

    const setRef = (r: HTMLVideoElement) => {
        v = r;

        v.addEventListener('canplay', (event) => {
            if (!streaming) {
                height = (v.videoHeight / v.videoWidth) * width;

                v.setAttribute("width", `${width}`);
                v.setAttribute("height", `${height}`);
                c.setAttribute("width", `${width}`);
                c.setAttribute("height", `${height}`);
                streaming = true;
            }
        });
    }

    const takePicture = () => {
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;
        if (width && height) {
            c.width = width;
            c.height = height;
            ctx.drawImage(v, 0, 0, width, height);

            const data = c.toDataURL('image/png');
            setPreview(data);
        } else {
            clearPhoto();
        }

    }

    const clearPhoto = () => {
        const ctx = c.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = "#AAA";
        ctx.fillRect(0, 0, c.width, c.height);
        const data = c.toDataURL('image/png');
        setPreview(data);
    }


    return <>
        <button onClick={[ handleClick, 'asd' ]}>Open Camera</button>

        <div class="camera">
            <video ref={setRef} id="video">Video stream not available.</video>
            <button onClick={takePicture}>Take photo</button>
        </div>

        <canvas ref={r => c = r} style={{ display: 'none' }}></canvas>
        <div class="output">
            <img src={preview()} alt="The screen capture will appear in this box." />
        </div>
    </>
}
