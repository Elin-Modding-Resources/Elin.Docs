<template>
  <!-- 外观照游戏 Main Dark 皮肤的窗口（old bg dark）：石板灰底、金色细边、小圆角 -->
  <div class="bgm-player bgm-window flex flex-col h-160 overflow-hidden">
    <!-- 主体区域 -->
    <div class="flex-1 min-h-0 overflow-hidden">
      <div class="player-body-viewport h-full">
        <!-- 左列 -->
        <div class="player-sidebar bgm-sidebar flex flex-col min-h-0">
          <div class="px-4 md:px-5 pt-4 md:pt-5 shrink-0">
            <div class="bgm-heading mb-2">
              {{ t("library") }}
            </div>

            <button
              type="button"
              @click="switchToAll"
              class="bgm-item nav-item flex items-center gap-3 px-3 py-2.5 mb-1"
              :class="{ active: currentView === 'all' }"
              :aria-pressed="currentView === 'all'"
            >
              <span class="text-lg shrink-0" aria-hidden="true">♪</span>
              <span
                class="font-medium"
                :class="[
                  isMobile
                    ? 'whitespace-nowrap'
                    : 'whitespace-normal break-words',
                ]"
              >
                {{ t("allTracks") }} ({{ bgmItems.length }})
              </span>
            </button>
          </div>

          <div class="flex-1 flex flex-col min-h-0 px-4 md:px-5 pt-4">
            <div class="bgm-heading mb-2 shrink-0">
              {{ t("playlists") }}
            </div>

            <div
              class="flex-1 overflow-y-auto overflow-x-hidden custom-scroll space-y-1 pr-2 min-h-0"
            >
              <button
                v-for="playlist in playlists"
                :key="playlist.name"
                type="button"
                @click="switchPlaylist(playlist)"
                class="bgm-item nav-item flex items-center gap-3 px-3 py-2.5 text-sm"
                :class="{ active: currentPlaylist?.name === playlist.name }"
                :aria-pressed="currentPlaylist?.name === playlist.name"
              >
                <span
                  class="font-medium min-w-0"
                  :class="[
                    isMobile
                      ? 'whitespace-nowrap'
                      : 'whitespace-normal break-words',
                  ]"
                >
                  {{ playlist.name }}
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- 右列 -->
        <div class="player-main bgm-main flex flex-col min-h-0">
          <!-- 顶部信息区：标题一行，搜索/数量下一行 -->
          <div class="bgm-toolbar px-4 py-3 shrink-0">
            <div
              class="bgm-title text-base leading-6 text-left"
              :class="[
                isMobile
                  ? 'whitespace-nowrap'
                  : 'whitespace-normal break-words',
              ]"
            >
              {{ currentTitle }}
            </div>

            <div class="mt-3 flex flex-wrap items-center gap-2 justify-start">
              <div class="relative w-full sm:w-72 md:w-80 max-w-full">
                <div
                  class="bgm-muted absolute left-3 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
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
                  :aria-label="t('searchPlaceholder')"
                  class="bgm-search w-full pl-9 pr-9 py-2 text-sm"
                />
                <button
                  v-if="searchQuery"
                  type="button"
                  @click="searchQuery = ''"
                  :aria-label="t('clear')"
                  class="bgm-muted absolute right-3 top-1/2 -translate-y-1/2 text-xl leading-none"
                >
                  ×
                </button>
              </div>

              <div class="bgm-count text-xs px-2.5 py-1.5 whitespace-nowrap">
                {{ filteredTracks.length }} {{ t("tracks") }}
              </div>
            </div>
          </div>

          <!-- 列表区 -->
          <div
            class="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-0.5 custom-scroll min-h-0"
          >
            <button
              v-for="(track, index) in filteredTracks"
              :key="track.id"
              type="button"
              @click="playTrack(index)"
              class="bgm-track group flex items-center gap-4 px-3 md:px-4 py-3"
              :class="{ current: isCurrentTrack(track) }"
            >
              <div class="bgm-index w-8 shrink-0 text-right text-sm">
                {{ (getOriginalIndex(track) + 1).toString().padStart(2, "0") }}
              </div>

              <div class="flex-1 min-w-0">
                <div
                  class="bgm-track-name text-sm font-medium"
                  :class="[
                    isMobile
                      ? 'whitespace-nowrap'
                      : 'whitespace-normal break-words',
                  ]"
                >
                  {{ track.name }}
                </div>
                <div
                  class="bgm-muted text-xs"
                  :class="[
                    isMobile
                      ? 'whitespace-nowrap'
                      : 'whitespace-normal break-words',
                  ]"
                >
                  #{{ track.id }}
                  {{ track.author?.replace(/&\s*$/, "") || "Unknown" }}
                </div>
              </div>

              <div
                v-if="isCurrentTrack(track)"
                class="bgm-playing flex items-center gap-2 shrink-0"
              >
                <div class="bgm-playing-dot w-2 h-2 rounded-full"></div>
                <span class="text-xs font-medium whitespace-nowrap">{{
                  t("playing")
                }}</span>
              </div>
            </button>

            <div
              v-if="filteredTracks.length === 0"
              class="bgm-muted text-center py-12"
            >
              {{ t("empty") }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部播放器 -->
    <div class="player-footer bgm-footer shrink-0 flex items-center">
      <ClientOnly>
        <div ref="playerRef" class="flex-1 min-w-0"></div>
      </ClientOnly>

      <div class="shrink-0"></div>
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
    searchPlaceholder: "搜索曲名、作者或编号",
    clear: "清除搜索",
    playing: "播放中",
    empty: "没有匹配的曲目",
  },
  en: {
    library: "Library",
    allTracks: "All tracks",
    playlists: "Playlists",
    tracks: "tracks",
    searchPlaceholder: "Search by title, artist or ID",
    clear: "Clear search",
    playing: "Playing",
    empty: "No matching tracks",
  },
  ja: {
    library: "音楽ライブラリ",
    allTracks: "全曲",
    playlists: "プレイリスト",
    tracks: "曲",
    searchPlaceholder: "曲名・作者・番号で検索",
    clear: "検索をクリア",
    playing: "再生中",
    empty: "該当する曲がありません",
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
const currentlyPlayingId = ref<number | null>(null);

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
    // 白色播放图标压在这个色上要 ≥ 3:1，#bda068（金）只有 2.5:1，取同色相更深的一档
    theme: "#8a6c33",
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
  if (!track) return;
  const originalIndex = getOriginalIndex(track);
  const newList = buildAudioList(currentTracks.value);

  if (JSON.stringify(newList) !== JSON.stringify(currentAudioList.value)) {
    currentAudioList.value = newList;
    aplayer.list.clear();
    aplayer.list.add(newList);
  }
  currentlyPlayingId.value = track.id;

  await nextTick();
  aplayer.list.switch(originalIndex);
  aplayer.play();
};

const isCurrentTrack = (track: any) => {
  return track.id === currentlyPlayingId.value;
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
  if (aplayer) {
    const updatePlayingState = () => {
      if (!aplayer.list?.audios?.length || !currentTracks.value.length) {
        currentlyPlayingId.value = null;
        return;
      }

      const currentAudio = aplayer.list.audios[aplayer.list.index];
      if (!currentAudio) return;
      const track = currentTracks.value.find(
        (t: any) => t.name === currentAudio.name,
      );

      currentlyPlayingId.value = track?.id ?? null;
    };

    aplayer.on("play", updatePlayingState);
    aplayer.on("listswitch", updatePlayingState);
    aplayer.on("ended", updatePlayingState);
  }

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
  color: #ddbe87 !important;
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

/* ── 窗口外观：游戏 Main Dark 皮肤 ────────────────────────────────────────
   不跟随页面明暗：游戏里的深色窗口本来就会叠在羊皮纸界面上。 */
.bgm-window {
  --bgm-frame: #474a4a; /* old bg dark 的底色 */
  --bgm-side: #3c3f42;
  --bgm-main: #2f3134;
  --bgm-bar: #35383b;
  --bgm-rim: #bda068;
  --bgm-rim-soft: rgb(189 160 104 / 0.3);
  --bgm-ink: #ddd6c9;
  --bgm-ink-2: #b4aa9f;
  --bgm-ink-3: #a39a8d;
  --bgm-gold: #ddbe87;

  background-color: var(--bgm-frame);
  border: 2px solid var(--bgm-rim);
  border-radius: 6px;
  box-shadow:
    inset 0 0 0 3px var(--bgm-frame),
    var(--vp-shadow-3);
  color: var(--bgm-ink);
}

.bgm-sidebar {
  background-color: var(--bgm-side);
  border-right: 1px solid var(--bgm-rim-soft);
}

.bgm-main {
  background-color: var(--bgm-main);
}

.bgm-toolbar {
  background-color: var(--bgm-bar);
  border-bottom: 1px solid var(--bgm-rim-soft);
}

.bgm-heading,
.bgm-title {
  font-family: var(--elin-font-display);
  font-weight: 500;
  color: var(--bgm-gold);
}

.bgm-heading {
  font-size: 14px;
}

.bgm-muted {
  color: var(--bgm-ink-3);
}

/* 列表项：选中项照游戏里按钮的选中态 —— 金色描边，而不是整块填色 */
.bgm-item,
.bgm-track {
  width: 100%;
  text-align: left;
  color: var(--bgm-ink-2);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.bgm-item:hover,
.bgm-track:hover {
  background-color: rgb(255 255 255 / 0.05);
  color: var(--bgm-ink);
}

.bgm-item.active {
  color: #f0e2c0;
  background-color: rgb(189 160 104 / 0.16);
  box-shadow: inset 0 0 0 1px var(--bgm-rim);
}

.bgm-track.current {
  background-color: rgb(189 160 104 / 0.1);
}

.bgm-track-name {
  color: var(--bgm-ink);
}

.bgm-track.current .bgm-track-name,
.bgm-track.current .bgm-index,
.bgm-track:hover .bgm-index {
  color: var(--bgm-gold);
}

.bgm-index {
  color: var(--bgm-ink-3);
  font-variant-numeric: tabular-nums;
}

.bgm-playing {
  color: var(--bgm-gold);
}

.bgm-playing-dot {
  background-color: var(--bgm-gold);
}

.bgm-search {
  color: var(--bgm-ink);
  background-color: #26282b;
  border: 1px solid var(--bgm-rim-soft);
  border-radius: 4px;
}

.bgm-search::placeholder {
  color: var(--bgm-ink-3);
}

.bgm-search:focus {
  outline: none;
  border-color: var(--bgm-rim);
}

.bgm-count {
  color: var(--bgm-ink-2);
  background-color: #26282b;
  border-radius: 4px;
}

.bgm-footer {
  background-color: var(--bgm-side);
  border-top: 1px solid var(--bgm-rim-soft);
}

.bgm-window :focus-visible {
  outline: 2px solid #a9c6e4;
  outline-offset: -2px;
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
  background: rgb(189 160 104 / 0.35);
  border-radius: 9999px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover,
.player-body-viewport::-webkit-scrollbar-thumb:hover {
  background: rgb(189 160 104 / 0.6);
}

/* 让 APlayer 贴合底部风格。
   这个 <style> 不是 scoped，:deep() 在这里不生效 —— 以前 APlayer 因此保留了自带的纯白底，
   在深色播放器里是一整条白块。改用普通后代选择器。 */
.player-footer .aplayer {
  margin: 0;
  border-radius: 0;
  border: none;
  box-shadow: none;
  background: transparent;
}

.player-footer .aplayer .aplayer-info,
.player-footer .aplayer .aplayer-lrc {
  color: #ddd6c9;
}

.player-footer .aplayer .aplayer-info .aplayer-music .aplayer-author,
.player-footer .aplayer .aplayer-info .aplayer-controller .aplayer-time {
  color: #c2b9ad;
}

.player-footer .aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon path {
  fill: #c2b9ad;
}

.player-footer .aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon:hover path {
  fill: #f4f4f5;
}
</style>
