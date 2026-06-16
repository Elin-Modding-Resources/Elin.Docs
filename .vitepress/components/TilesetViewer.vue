<template>
  <div ref="containerRef" class="tileset-viewer">
    <div class="canvas-wrapper">
      <canvas
        ref="canvasRef"
        class="block max-w-full h-auto border border-gray-200 dark:border-gray-700 rounded-lg"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
      ></canvas>
    </div>

    <Teleport to="body">
      <div
        v-if="currentTile"
        class="tileset-tooltip fixed pointer-events-none z-9999"
        :style="previewPosition"
      >
        <div
          class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl p-2"
        >
          <div
            class="text-xs font-mono font-semibold text-center mb-1.5 text-gray-600 dark:text-gray-300 select-none"
          >
            ID: {{ currentTile.id }}
          </div>
          <div
            class="rounded-sm border border-gray-400 dark:border-gray-500"
            :style="magnifiedStyle"
          ></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = withDefaults(
  defineProps<{
    src: string;
    tileSize?: number;
    magnifyScale?: number;
  }>(),
  {
    tileSize: 48,
    magnifyScale: 4,
  },
);

interface TileInfo {
  id: number;
  col: number;
  row: number;
  x: number;
  y: number;
}

const containerRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const img = ref<HTMLImageElement | null>(null);
const naturalSize = ref({ width: 0, height: 0 });
const cols = ref(0);
const rows = ref(0);
const currentTile = ref<TileInfo | null>(null);
const mouseClientX = ref(0);
const mouseClientY = ref(0);

const tileSize = props.tileSize;
const magScale = props.magnifyScale;

const loadImage = (): Promise<void> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      img.value = image;
      naturalSize.value = {
        width: image.naturalWidth,
        height: image.naturalHeight,
      };
      cols.value = Math.floor(image.naturalWidth / tileSize);
      rows.value = Math.floor(image.naturalHeight / tileSize);
      resolve();
    };
    image.src = props.src;
  });
};

const computeDisplaySize = (): void => {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  if (!canvas || !container || !img.value) return;

  const maxWidth = container.clientWidth;
  const natW = naturalSize.value.width;
  const natH = naturalSize.value.height;

  if (natW <= maxWidth) {
    canvas.style.width = `${natW}px`;
    canvas.style.height = `${natH}px`;
  } else {
    const scale = maxWidth / natW;
    canvas.style.width = `${maxWidth}px`;
    canvas.style.height = `${natH * scale}px`;
  }
};

const draw = (): void => {
  const canvas = canvasRef.value;
  if (!canvas || !img.value) return;

  canvas.width = naturalSize.value.width;
  canvas.height = naturalSize.value.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img.value, 0, 0);

  if (currentTile.value) {
    const { col, row } = currentTile.value;
    const x = col * tileSize;
    const y = row * tileSize;

    ctx.strokeStyle = "rgba(99, 102, 241, 0.85)";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, tileSize, tileSize);

    ctx.fillStyle = "rgba(99, 102, 241, 0.15)";
    ctx.fillRect(x, y, tileSize, tileSize);
  }
};

const getCanvasCoords = (e: MouseEvent): { x: number; y: number } => {
  const canvas = canvasRef.value;
  if (!canvas) return { x: 0, y: 0 };

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
};

const onMouseMove = (e: MouseEvent): void => {
  mouseClientX.value = e.clientX;
  mouseClientY.value = e.clientY;

  const { x, y } = getCanvasCoords(e);
  const col = Math.floor(x / tileSize);
  const row = Math.floor(y / tileSize);

  if (col >= 0 && col < cols.value && row >= 0 && row < rows.value) {
    currentTile.value = {
      id: row * cols.value + col,
      col,
      row,
      x: col * tileSize,
      y: row * tileSize,
    };
  } else {
    currentTile.value = null;
  }

  draw();
};

const onMouseLeave = (): void => {
  currentTile.value = null;
  draw();
};

const magnifiedStyle = computed(() => {
  if (!currentTile.value) return {};

  const { col, row } = currentTile.value;
  const bgSizeW = naturalSize.value.width * magScale;
  const bgSizeH = naturalSize.value.height * magScale;
  const bgPosX = -col * tileSize * magScale;
  const bgPosY = -row * tileSize * magScale;

  return {
    width: `${tileSize * magScale}px`,
    height: `${tileSize * magScale}px`,
    backgroundImage: `url(${props.src})`,
    backgroundSize: `${bgSizeW}px ${bgSizeH}px`,
    backgroundPosition: `${bgPosX}px ${bgPosY}px`,
    imageRendering: "pixelated" as const,
  };
});

const previewPosition = computed(() => {
  const previewW = tileSize * magScale + 18; // content + padding + border
  const previewH = tileSize * magScale + 40; // content + label + padding + border

  let left = mouseClientX.value + 14;
  let top = mouseClientY.value + 14;

  if (left + previewW > window.innerWidth) {
    left = mouseClientX.value - previewW - 8;
  }
  if (left < 0) left = 8;

  if (top + previewH > window.innerHeight) {
    top = mouseClientY.value - previewH - 8;
  }
  if (top < 0) top = 8;

  return {
    left: `${left}px`,
    top: `${top}px`,
  };
});

let resizeObserver: ResizeObserver | null = null;

onMounted(async () => {
  await loadImage();
  computeDisplaySize();
  draw();

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      computeDisplaySize();
      draw();
    });
    resizeObserver.observe(containerRef.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>
