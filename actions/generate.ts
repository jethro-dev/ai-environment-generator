"use server";

export async function generate({
  prompt,
  skybox_style_id = 9,
  remix_imagine_id,
}: {
  prompt: string;
  skybox_style_id?: number;
  remix_imagine_id?: number;
}) {
  console.log("Running SERVER ACTIONS: GENERATE");
  console.log({ prompt, skybox_style_id, remix_imagine_id });

  const url = "https://backend.blockadelabs.com/api/v1/skybox";

  try {
    const response = await fetch(url, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Specify the content type in the headers
        "x-api-key": process.env.NEXT_PUBLIC_BLOCKADE_API_KEY as string,
      },
      body: JSON.stringify({
        prompt,
        skybox_style_id,
        enhance_prompt: true,
        remix_imagine_id: remix_imagine_id ? remix_imagine_id : null,
      }), // Convert the JavaScript object to a JSON string
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("[GENERATE_POST]", error);
  }
}
