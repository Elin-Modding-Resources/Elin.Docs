<template>
  <div
    class="bgm-player flex flex-col h-160 bg-zinc-950 dark:bg-neutral-900 rounded-3xl overflow-hidden border border-zinc-800 dark:border-neutral-700 shadow-2xl"
  >
    <div class="flex flex-1 min-h-0">
      <div
        class="w-65 bg-zinc-900 dark:bg-neutral-950 flex flex-col border-r border-zinc-800 dark:border-neutral-700"
      >
        <div class="px-6 pt-6">
          <div
            class="text-xs font-semibold tracking-widest text-zinc-500 dark:text-neutral-400 mb-3"
          >
            {{ t("library") }}
          </div>

          <div
            @click="switchToAll"
            class="nav-item flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all mb-1"
            :class="
              currentView === 'all'
                ? 'bg-violet-500 text-white shadow-md shadow-violet-500/30'
                : 'hover:bg-zinc-800 dark:hover:bg-neutral-800 text-zinc-300 dark:text-neutral-300'
            "
          >
            <span class="text-xl">♪</span>
            <span class="font-medium"
              >{{ t("allTracks") }} ({{ bgmItems.length }})</span
            >
          </div>
        </div>

        <div class="flex-1 flex flex-col min-h-0 px-6 pt-5">
          <div
            class="text-xs font-semibold tracking-widest text-zinc-500 dark:text-neutral-400 mb-3"
          >
            {{ t("playlists") }}
          </div>

          <div class="flex-1 overflow-y-auto custom-scroll space-y-1 pr-2">
            <div
              v-for="playlist in playlists"
              :key="playlist.name"
              @click="switchPlaylist(playlist)"
              class="nav-item flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all text-sm"
              :class="
                currentPlaylist?.name === playlist.name
                  ? 'bg-violet-500 text-white shadow-md shadow-violet-500/30'
                  : 'hover:bg-zinc-800 dark:hover:bg-neutral-800 text-zinc-300 dark:text-neutral-300'
              "
            >
              <span class="text-xl">📁</span>
              <span class="font-medium truncate">{{ playlist.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 flex flex-col bg-zinc-950 dark:bg-neutral-900">
        <div
          class="h-14 border-b border-zinc-800 dark:border-neutral-700 bg-zinc-900/70 dark:bg-neutral-900/70 flex items-center px-4 gap-3"
        >
          <div
            class="font-semibold text-zinc-100 dark:text-neutral-100 truncate min-w-0 flex-1"
          >
            {{ currentTitle }}
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <div class="relative w-36 md:w-48">
              <div
                class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t('searchPlaceholder')"
                class="w-full bg-zinc-800 border border-zinc-700 rounded-2xl pl-9 py-1.5 text-sm focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div
              class="text-xs px-3 py-1 rounded-full bg-zinc-800 dark:bg-neutral-800 text-zinc-400 whitespace-nowrap"
            >
              {{ filteredTracks.length }} {{ t("tracks") }}
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-3 space-y-1 custom-scroll">
          <div
            v-for="(track, index) in filteredTracks"
            :key="track.id"
            @click="playTrack(index)"
            class="group flex items-center gap-4 px-5 py-3.5 rounded-2xl cursor-pointer transition-all hover:bg-zinc-900 dark:hover:bg-neutral-800"
            :class="{
              'bg-violet-500/10 dark:bg-violet-500/15': isCurrentTrack(track),
            }"
          >
            <div
              class="w-8 text-right font-mono text-sm text-zinc-500 dark:text-neutral-500 group-hover:text-violet-400 transition-colors"
              :class="{ 'text-violet-400': isCurrentTrack(track) }"
            >
              {{ (getOriginalIndex(track) + 1).toString().padStart(2, "0") }}
            </div>

            <div class="flex-1 min-w-0">
              <div
                class="text-sm font-medium text-zinc-200 dark:text-neutral-200 truncate"
                :class="{
                  'text-violet-300 dark:text-violet-400': isCurrentTrack(track),
                }"
              >
                {{ track.name }}
              </div>
              <div class="text-xs text-zinc-500 dark:text-neutral-500 truncate">
                #{{ track.id }}
                {{ track.author?.replace(/&\s*$/, "") || "Unknown" }}
              </div>
            </div>

            <div
              v-if="isCurrentTrack(track)"
              class="flex items-center gap-2 text-violet-400"
            >
              <div
                class="w-2 h-2 rounded-full bg-violet-400 animate-pulse"
              ></div>
              <span class="text-xs font-medium">PLAYING</span>
            </div>
          </div>

          <div
            v-if="filteredTracks.length === 0"
            class="text-center py-12 text-zinc-500"
          >
            NONE
          </div>
        </div>
      </div>
    </div>

    <div
      class="border-t border-zinc-800 dark:border-neutral-700 bg-zinc-900 dark:bg-neutral-950"
    >
      <ClientOnly>
        <div ref="playerRef" class="w-full"></div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { useData } from "vitepress";
import "aplayer/dist/APlayer.min.css";
import bgmItemsRaw from "/playlist/bgm_items.json";

const bgmItems = bgmItemsRaw as any[];
const playlistModules = import.meta.glob("/playlist/Playlist_*.json", {
  eager: true,
  import: "default",
});

const playlists = Object.values(playlistModules) as {
  name: string;
  entries: number[];
}[];
const trackMap = new Map(bgmItems.map((item: any) => [item.id, item]));

const i18n = {
  zh: {
    library: "音乐库",
    allTracks: "全部曲目",
    playlists: "播放列表",
    tracks: "首",
    searchPlaceholder: "搜索曲目...",
  },
  en: {
    library: "LIBRARY",
    allTracks: "All Tracks",
    playlists: "PLAYLISTS",
    tracks: "tracks",
    searchPlaceholder: "Search tracks...",
  },
  ja: {
    library: "音楽ライブラリ",
    allTracks: "すべてのトラック",
    playlists: "プレイリスト",
    tracks: "曲",
    searchPlaceholder: "検索...",
  },
} as const;

const { lang } = useData();
const t = (key: keyof typeof i18n.zh) =>
  i18n[lang.value as keyof typeof i18n][key];

const playerRef = ref<HTMLElement | null>(null);
let aplayer: any = null;

const currentView = ref<"all" | string>("all");
const currentPlaylist = ref<any>(null);
const currentAudioList = ref<any[]>([]);
const searchQuery = ref("");

const currentTitle = computed(() => {
  if (currentView.value === "all") return t("allTracks");
  return currentPlaylist.value?.name || "";
});

const filteredTracks = computed(() => {
  const tracks = currentTracks.value;
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return tracks;

  return tracks.filter(
    (track: any) =>
      track.name.toLowerCase().includes(q) ||
      (track.author && track.author.toLowerCase().includes(q)) ||
      track.id.toString().includes(q),
  );
});

const currentTracks = computed(() => {
  if (currentView.value === "all") return bgmItems;
  if (!currentPlaylist.value) return [];
  return currentPlaylist.value.entries
    .map((id: number) => trackMap.get(id))
    .filter(Boolean);
});

const getOriginalIndex = (track: any) =>
  currentTracks.value.findIndex((t: any) => t.id === track.id);

const initPlayer = async () => {
  await nextTick();
  if (!playerRef.value) return;
  const APlayer = (await import("aplayer")).default;

  aplayer = new APlayer({
    container: playerRef.value,
    theme: "#4fcaf0",
    repeat: "all",
    order: "list",
    preload: "auto",
    volume: 0.4,
    mutex: true,
    listFolded: true,
    autoplay: false,
  });
};

const buildAudioList = (tracks: any[]) =>
  tracks.map((track) => ({
    name: track.name,
    artist: track.author?.replace(/&\s*$/, "") || "Unknown",
    url: `https://r2.assets.elin-modding.net/Sound/BGM/${track.path}`,
    cover: "/community-icon.png",
  }));

const playTrack = async (filteredIndex: number) => {
  if (!aplayer) return;
  const track = filteredTracks.value[filteredIndex];
  const originalIndex = getOriginalIndex(track);

  const newList = buildAudioList(currentTracks.value);
  if (JSON.stringify(newList) !== JSON.stringify(currentAudioList.value)) {
    currentAudioList.value = newList;
    aplayer.list.clear();
    aplayer.list.add(newList);
  }

  await nextTick();
  aplayer.list.switch(originalIndex);
  aplayer.play();
};

const isCurrentTrack = (track: any) => {
  if (!aplayer?.list?.audios?.length) return false;
  const current = aplayer.list.audios[aplayer.list.index];
  return current?.name === track.name;
};

const switchToAll = () => {
  currentView.value = "all";
  currentPlaylist.value = null;
  searchQuery.value = "";
};

const switchPlaylist = (playlist: any) => {
  currentView.value = playlist.name;
  currentPlaylist.value = playlist;
  searchQuery.value = "";
};

onMounted(async () => {
  await initPlayer();
  switchToAll();
});

onUnmounted(() => {
  aplayer?.destroy();
  aplayer = null;
});
</script>

<style>
.aplayer-title {
  color: blueviolet !important;
}
</style>
