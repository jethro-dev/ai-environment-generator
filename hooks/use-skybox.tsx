import { create } from "zustand";

const defaultSkybox = {
  id: 9352571,
  obfuscated_id: "05dc02cff4984370459eaf49681dee78",
  user_id: 44068,
  api_key_id: 1446,
  title: "World #9352571",
  seed: 1327978214,
  negative_text: null,
  prompt: "desert, huge mirror in middle, pyramid",
  username: "tech2",
  status: "complete",
  queue_position: 0,
  file_url:
    "https://images.blockadelabs.com/images/imagine/Cyberpunk_equirectangular-jpg_desert_huge_mirror_in_1327978214_9352571.jpg?ver=1",
  thumb_url:
    "https://images.blockadelabs.com/thumbs/imagine/thumb_Cyberpunk_thumb_desert_huge_mirror_in_1327978214_9352571.jpg?ver=1",
  depth_map_url:
    "https://images.blockadelabs.com/depths/imagine/Cyberpunk_depth-map-png_desert_huge_mirror_in_1327978214_9352571.png?ver=1",
  remix_imagine_id: null,
  remix_obfuscated_id: null,
  isMyFavorite: false,
  created_at: "2023-11-10T12:49:46+00:00",
  updated_at: "2023-11-15T17:34:10+00:00",
  error_message: null,
  pusher_channel: "status_update_05dc02cff4984370459eaf49681dee78",
  pusher_event: "status_update",
  type: "skybox",
  skybox_style_id: 35,
  skybox_id: 35,
  skybox_style_name: "Cyberpunk",
  skybox_name: "Cyberpunk",
  dispatched_at: "2023-11-10T12:49:46+00:00",
  processing_at: "2023-11-10T12:49:47+00:00",
  completed_at: "2023-11-10T12:50:03+00:00",
};

type useSkyboxStore = {
  skybox: Skybox;
  setSkybox: (skybox: Skybox) => void;
};

export const useSkybox = create<useSkyboxStore>((set) => ({
  skybox: defaultSkybox,
  setSkybox: (skybox) => set((state) => ({ skybox: skybox })),
}));
