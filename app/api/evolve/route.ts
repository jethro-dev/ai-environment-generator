import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt, skybox_style_id, remix_imagine_id } = body;

  console.log({ prompt, skybox_style_id, remix_imagine_id });

  console.log("Running GENERATE_POST request...");
  try {
    const response = await axios.post(
      `https://backend.blockadelabs.com/api/v1/skybox`,
      {
        prompt,
        skybox_style_id,
        remix_imagine_id,
        enhance_prompt: true,
      },
      {
        headers: {
          "x-api-key":
            "2ftlSWB0iDL2ZyUoryGuga74M2cIuppFemRVwyerOeBeHi4Ze681HmdwbNUx",
        },
      }
    );

    let data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.log("[GENERATE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
