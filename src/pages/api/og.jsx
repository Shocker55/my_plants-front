import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

async function loadGoogleFont({ family, weight, text }) {
  const params = new URLSearchParams({
    family: `${family}${weight ? `:wght@${weight}` : ""}`,
  });
  if (text) {
    params.append("text", text);
  } else {
    params.append("subset", "latin");
  }

  const url = `https://fonts.googleapis.com/css2?${params.toString()}`;
  console.log(url);

  const css = await fetch(url).then((res) => res.text());

  const fontUrl = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1];

  if (!fontUrl) {
    throw new Error("Font file not found in CSS fetched from Google Fonts");
  }

  return fetch(fontUrl).then((res) => res.arrayBuffer());
}

export default async function handler(req) {
  try {
    const notoSansArrayBuffer = await loadGoogleFont({
      family: "Noto Sans JP",
      weight: 700,
    });
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : undefined;
    console.log(title);

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url(https://${process.env.NEXT_PUBLIC_S3_BUCCKET}/ogp/ogp-background.png)`,
            backgroundColor: "#fff",
            backgroundSize: "100% 100%",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "left",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          {title ? (
            <div
              style={{
                width: "100%",
                fontSize: 60,
                fontStyle: "normal",
                fontWeight: "bold",
                color: "#000",
                padding: "0 120px",
                lineHeight: 1.3,
                marginBottom: "30px",
                wordWrap: "break-word",
              }}
            >
              {title}
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                fontSize: 80,
                fontStyle: "normal",
                fontWeight: "bold",
                color: "green",
                marginBottom: "30px",
                wordWrap: "break-word",
                justifyContent: "center",
              }}
            >
              My Plants
            </div>
          )}
          {title ? (
            <div
              style={{
                width: "100%",
                fontSize: 40,
                fontStyle: "normal",
                fontWeight: "bold",
                color: "green",
                padding: "0 120px",
                lineHeight: 1.3,
              }}
            >
              🌿 My Plants
            </div>
          ) : null}
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "NotoSansJP",
            data: notoSansArrayBuffer,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
