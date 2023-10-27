import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};
// const fontURL = new URL(
//   `https://${process.env.NEXT_PUBLIC_S3_BUCCKET}/assets/subset_font.ttf`,
//   import.meta.url
// );

// const font = fetch(fontURL).then((res) => res.arrayBuffer());

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    // const fontData = await font;

    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "MyPlants";

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
          <div
            style={{
              width: "100%",
              fontSize: 40,
              fontStyle: "normal",
              fontWeight: "bold",
              color: "#000",
              padding: "0 120px",
              lineHeight: 1.3,
            }}
          >
            🌿 My Plants
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // fonts: [
        //   {
        //     name: "NotoSansJP",
        //     data: fontData,
        //     style: "normal",
        //   },
        // ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
