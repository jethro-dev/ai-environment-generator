type Skybox = {
  id: number;
  obfuscated_id: string;
  user_id: number;
  username: string;
  status: string;
  queue_position: number;
  pusher_channel: string;
  pusher_event: string;
  error_message: null | string;
  type: string;
  title: string;
  prompt: string;
  seed: number;
  skybox_style_id: number;
  skybox_style_name: string;
  file_url: string;
  thumb_url: string;
  depth_map_url: string;
  created_at: string;
  updated_at: string;
  dispatched_at: string;
  processing_at: string;
  completed_at: string;
};

type Style = {
  id: string;
  name: string;
  description: string;
  "max-char": number;
  "negative-text-max-char": number;
  image: string;
  sort_order: number;
  premium: number;
  new: number;
  experimental: number;
  skybox_style_families_id: string;
};
