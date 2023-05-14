import {Viewer, Worker} from "@react-pdf-viewer/core";
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout";

export const CustomPdfViewer = ({pdfUrl}) => {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const token = localStorage.getItem("token");

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '750px',
                    width: '1100px',
                    overflow: 'auto'
                }}
            >
                <Viewer fileUrl={pdfUrl}
                        plugins={[defaultLayoutPluginInstance]}
                        httpHeaders={
                            {
                                Authorization: `Bearer ${token}`,
                            }
                        }
                />
            </div>
        </Worker>
    )
}