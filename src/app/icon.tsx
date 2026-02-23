import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
    width: 32,
    height: 32,
};

export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "black",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: 800,
                    fontSize: 16,
                    fontFamily: "monospace",
                }}
            >
                HB
            </div>
        ),
        {
            ...size,
        }
    );
}
