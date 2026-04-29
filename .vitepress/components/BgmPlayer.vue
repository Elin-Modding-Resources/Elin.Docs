<template>
  <div
    class="bgm-player flex flex-col h-160 bg-zinc-950 dark:bg-neutral-900 rounded-3xl overflow-hidden border border-zinc-800 dark:border-neutral-700 shadow-2xl"
  >
    <!-- 主体区域 -->
    <div class="flex-1 min-h-0 overflow-hidden">
      <div class="player-body-viewport h-full">
        <!-- 左列 -->
        <div
          class="player-sidebar bg-zinc-900 dark:bg-neutral-950 flex flex-col border-r border-zinc-800 dark:border-neutral-700 min-h-0"
        >
          <div class="px-4 md:px-6 pt-4 md:pt-6 shrink-0">
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
              <span class="text-xl shrink-0">♪</span>
              <span
                class="font-medium"
                :class="[
                  isMobile ? 'whitespace-nowrap' : 'whitespace-normal break-words'
                ]"
              >
                {{ t("allTracks") }} ({{ bgmItems.length }})
              </span>
            </div>
          </div>

          <div class="flex-1 flex flex-col min-h-0 px-4 md:px-6 pt-4 md:pt-5">
            <div
              class="text-xs font-semibold tracking-widest text-zinc-500 dark:text-neutral-400 mb-3 shrink-0"
            >
              {{ t("playlists") }}
            </div>

            <div class="flex-1 overflow-y-auto overflow-x-hidden custom-scroll space-y-1 pr-2 min-h-0">
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
                <span class="text-xl shrink-0">📁</span>
                <span
                  class="font-medium min-w-0"
                  :class="[
                    isMobile ? 'whitespace-nowrap' : 'whitespace-normal break-words'
                  ]"
                >
                  {{ playlist.name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右列 -->
        <div class="player-main flex flex-col bg-zinc-950 dark:bg-neutral-900 min-h-0">
          <!-- 顶部信息区：标题一行，搜索/数量下一行 -->
          <div
            class="border-b border-zinc-800 dark:border-neutral-700 bg-zinc-900/70 dark:bg-neutral-900/70 px-4 py-3 shrink-0"
          >
            <div
              class="font-semibold text-zinc-100 dark:text-neutral-100 text-base leading-6 text-left"
              :class="[
                isMobile ? 'whitespace-nowrap' : 'whitespace-normal break-words'
              ]"
            >
              {{ currentTitle }}
            </div>

            <div class="mt-3 flex flex-wrap items-center gap-2 justify-start">
              <div class="relative w-full sm:w-72 md:w-80 max-w-full">
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
                  class="w-full bg-zinc-800 border border-zinc-700 rounded-2xl pl-9 pr-9 py-2 text-sm text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
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
                class="text-xs px-3 py-2 rounded-full bg-zinc-800 dark:bg-neutral-800 text-zinc-400 whitespace-nowrap"
              >
                {{ filteredTracks.length }} {{ t("tracks") }}
              </div>
            </div>
          </div>

          <!-- 列表区 -->
          <div class="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scroll min-h-0">
            <div
              v-for="(track, index) in filteredTracks"
              :key="track.id"
              @click="playTrack(index)"
              class="group flex items-center gap-4 px-4 md:px-5 py-3.5 rounded-2xl cursor-pointer transition-all hover:bg-zinc-900 dark:hover:bg-neutral-800"
              :class="{
                'bg-violet-500/10 dark:bg-violet-500/15': isCurrentTrack(track),
              }"
            >
              <div
                class="w-8 shrink-0 text-right font-mono text-sm text-zinc-500 dark:text-neutral-500 group-hover:text-violet-400 transition-colors"
                :class="{ 'text-violet-400': isCurrentTrack(track) }"
              >
                {{ (getOriginalIndex(track) + 1).toString().padStart(2, "0") }}
              </div>

              <div class="flex-1 min-w-0">
                <div
                  class="text-sm font-medium text-zinc-200 dark:text-neutral-200"
                  :class="[
                    isCurrentTrack(track)
                      ? 'text-violet-300 dark:text-violet-400'
                      : '',
                    isMobile ? 'whitespace-nowrap' : 'whitespace-normal break-words'
                  ]"
                >
                  {{ track.name }}
                </div>
                <div
                  class="text-xs text-zinc-500 dark:text-neutral-500"
                  :class="[
                    isMobile ? 'whitespace-nowrap' : 'whitespace-normal break-words'
                  ]"
                >
                  #{{ track.id }}
                  {{ track.author?.replace(/&\s*$/, "") || "Unknown" }}
                </div>
              </div>

              <div
                v-if="isCurrentTrack(track)"
                class="flex items-center gap-2 text-violet-400 shrink-0"
              >
                <div
                  class="w-2 h-2 rounded-full bg-violet-400 animate-pulse"
                ></div>
                <span class="text-xs font-medium whitespace-nowrap">PLAYING</span>
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
    </div>

    <!-- 底部播放器 -->
    <div
      class="player-footer shrink-0 border-t border-zinc-800 dark:border-neutral-700 bg-zinc-900 dark:bg-neutral-950"
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
    allTracks: "全曲",
    playlists: "プレイリスト",
    tracks: "曲",
    searchPlaceholder: "曲を検索...",
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
const isMobile = ref(false);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

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
    theme: "#8b5cf6",
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
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
  await initPlayer();
  switchToAll();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
  aplayer?.destroy();
  aplayer = null;
});
</script>

<style>
.aplayer-title {
  color: blueviolet !important;
}

/**
 *《《设计思路》》
 *桌面端
 *  文字折行，让左右两列合成的区域，避免横向滚动
 *手机端 / 窄屏
 *  文字不折行，优先让左右两列合成的区域，可以横向滚动
 *
 *共有样式：手机与桌面双端
 *
 *  左右两列并排
 *  左列自己纵向滚动，右列自己纵向滚动。
 *  左右两列合成区域下，底部播放器固定在最下面，形状适配底部
 *  
 */ 

/* 双列合并区域 */
.player-body-viewport {
  display: flex;
  overflow-x: auto;
  width: max-content;
  max-width: 100%;
  min-width: 100%;
  box-sizing: border-box;
}

.player-body-viewport > div:first-child {
  flex-shrink: 0;
}

/* 整个主体高度必须能在播放器上方正确分配 */
.player-sidebar,
.player-main {
  min-height: 0;
  box-sizing: border-box;
}

/* 桌面端：两列铺满，不要横向滚动，文字允许折行 */
.player-sidebar {
  width: 260px;
}

.player-main {
  flex: 1 1 auto;
  min-width: 0;
}

@media (min-width: 768px) {
  .player-body-viewport {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow-x: hidden;
  }

  .player-sidebar {
    width: 260px;
    min-width: 260px;
    max-width: 260px;
  }

  .player-main {
    min-width: 0;
    width: 0;
    flex: 1 1 auto;
  }
}

/* 手机端 / 窄屏：左右整体允许横向滚动，文字不折行 */
@media (max-width: 767px) {
  .player-body-viewport {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .player-sidebar {
    width: 240px;
    min-width: 240px;
    max-width: 240px;
  }

  .player-main {
    width: 320px;
    min-width: 320px;
    flex: 0 0 auto;
  }
}

/* 滚动条美化 */
.custom-scroll::-webkit-scrollbar,
.player-body-viewport::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scroll::-webkit-scrollbar-track,
.player-body-viewport::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb,
.player-body-viewport::-webkit-scrollbar-thumb {
  background: rgba(161, 161, 170, 0.35);
  border-radius: 9999px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover,
.player-body-viewport::-webkit-scrollbar-thumb:hover {
  background: rgba(161, 161, 170, 0.55);
}

/* 让 APlayer 贴合底部风格 */
.player-footer :deep(.aplayer) {
  margin: 0;
  border-radius: 0;
  border: none;
  box-shadow: none;
  background: transparent;
}

.player-footer :deep(.aplayer-info),
.player-footer :deep(.aplayer-lrc) {
  color: inherit;
}
</style>
